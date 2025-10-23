import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import * as Tone from 'tone';

interface AudioContextValue {
  isPlaying: boolean;
  currentTrack: string | null;
  currentTitle: string | null;
  duration: number;
  position: number;
  isLoading: boolean;
  timer: number | null;
  playSound: (url: string, title: string) => Promise<void>;
  pauseSound: () => Promise<void>;
  stopSound: () => Promise<void>;
  setTimer: (minutes: number | null) => void;
}

async function generateTone(frequency: number): Promise<string> {
  await Tone.start();
  const synth = new Tone.Oscillator(frequency, 'sine').toDestination();
  const recorder = new Tone.Recorder();
  synth.connect(recorder);
  synth.start();
  recorder.start();
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const recording = await recorder.stop();
  synth.stop();
  synth.dispose();
  
  return URL.createObjectURL(recording);
}

async function generateWhiteNoise(): Promise<string> {
  await Tone.start();
  const noise = new Tone.Noise('white').toDestination();
  const recorder = new Tone.Recorder();
  noise.connect(recorder);
  noise.start();
  recorder.start();
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const recording = await recorder.stop();
  noise.stop();
  noise.dispose();
  
  return URL.createObjectURL(recording);
}

export const [AudioProvider, useAudio] = createContextHook<AudioContextValue>(() => {
  const [sound, setSound] = useState<Sound | HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimerState] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const setupAudio = async () => {
      if (Platform.OS !== 'web') {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });
      }
    };

    setupAudio();
  }, []);

  useEffect(() => {
    return () => {
      if (sound) {
        if (Platform.OS === 'web' && sound instanceof HTMLAudioElement) {
          sound.pause();
          sound.src = '';
        } else if (sound && 'unloadAsync' in sound) {
          sound.unloadAsync();
        }
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, [sound]);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish && !status.isLooping) {
        setPosition(0);
      }
    }
  }, []);

  const playSound = useCallback(
    async (url: string, title: string) => {
      try {
        setIsLoading(true);
        console.log('[Audio] Starting playback:', url);

        if (sound) {
          if (Platform.OS === 'web' && sound instanceof HTMLAudioElement) {
            sound.pause();
            sound.src = '';
            if (blobUrlRef.current) {
              URL.revokeObjectURL(blobUrlRef.current);
              blobUrlRef.current = null;
            }
          } else if (sound && 'unloadAsync' in sound) {
            await sound.unloadAsync();
          }
        }

        if (Platform.OS === 'web') {
          const audio = new window.Audio();
          audio.loop = true;
          audio.preload = 'auto';
          audio.crossOrigin = 'anonymous';

          audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration * 1000);
          });

          audio.addEventListener('timeupdate', () => {
            setPosition(audio.currentTime * 1000);
          });

          audio.addEventListener('play', () => {
            console.log('[Audio] Playing');
            setIsPlaying(true);
          });
          
          audio.addEventListener('pause', () => {
            console.log('[Audio] Paused');
            setIsPlaying(false);
          });
          
          audio.addEventListener('error', (e) => {
            console.error('[Audio] Error event:', e);
          });

          let blobUrl: string | null = null;
          
          if (url.startsWith('generated:')) {
            const type = url.split(':')[1];
            console.log('[Audio] Generating sound:', type);
            
            if (type === 'whitenoise') {
              blobUrl = await generateWhiteNoise();
            } else {
              const freq = parseInt(type, 10);
              blobUrl = await generateTone(freq);
            }
            
            audio.src = blobUrl;
            await audio.play();
            blobUrlRef.current = blobUrl;
            console.log('[Audio] Generated sound playing');
          } else {
            try {
              const response = await fetch(url);
              if (!response.ok) throw new Error('Fetch failed');
              const blob = await response.blob();
              blobUrl = URL.createObjectURL(blob);
              audio.src = blobUrl;
              await audio.play();
              blobUrlRef.current = blobUrl;
              console.log('[Audio] External sound playing');
            } catch (err) {
              console.error('[Audio] Failed to load:', err);
              setIsLoading(false);
              return;
            }
          }

          setSound(audio);
          setCurrentTrack(url);
          setCurrentTitle(title);
          setIsPlaying(true);

          if (timer) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              audio.pause();
              audio.src = '';
              if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
                blobUrlRef.current = null;
              }
              setIsPlaying(false);
              setCurrentTrack(null);
              setCurrentTitle(null);
            }, timer * 60 * 1000);
          }
        } else {
          if (url.startsWith('generated:')) {
            console.log('[Audio] Generated sounds not supported on native');
            setIsLoading(false);
            return;
          }
          
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true, isLooping: true },
            onPlaybackStatusUpdate
          );

          setSound(newSound);
          setCurrentTrack(url);
          setCurrentTitle(title);
          setIsPlaying(true);

          if (timer) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(async () => {
              await newSound.stopAsync();
              await newSound.unloadAsync();
              setIsPlaying(false);
              setCurrentTrack(null);
              setCurrentTitle(null);
            }, timer * 60 * 1000);
          }
        }
      } catch (error) {
        console.error('[Audio] Playback error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [sound, timer, onPlaybackStatusUpdate]
  );

  const pauseSound = useCallback(async () => {
    if (sound) {
      if (Platform.OS === 'web' && sound instanceof HTMLAudioElement) {
        sound.pause();
        setIsPlaying(false);
      } else if (sound && 'pauseAsync' in sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    }
  }, [sound]);

  const stopSound = useCallback(async () => {
    if (sound) {
      if (Platform.OS === 'web' && sound instanceof HTMLAudioElement) {
        sound.pause();
        sound.currentTime = 0;
        sound.src = '';
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
          blobUrlRef.current = null;
        }
        setSound(null);
        setIsPlaying(false);
        setCurrentTrack(null);
        setCurrentTitle(null);
        setPosition(0);
      } else if (sound && 'stopAsync' in sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        setCurrentTrack(null);
        setCurrentTitle(null);
        setPosition(0);
      }
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [sound]);

  const setTimer = useCallback((minutes: number | null) => {
    setTimerState(minutes);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    isPlaying,
    currentTrack,
    currentTitle,
    duration,
    position,
    isLoading,
    timer,
    playSound,
    pauseSound,
    stopSound,
    setTimer,
  };
});
