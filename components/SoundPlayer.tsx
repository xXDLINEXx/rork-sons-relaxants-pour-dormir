import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Audio, AVPlaybackStatus, Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, X, Volume2, VolumeX, SkipBack } from 'lucide-react-native';
import { SoundConfig } from '@/types/soundsConfig';

interface SoundPlayerProps {
  sound: SoundConfig;
  onClose: () => void;
}

export function SoundPlayer({ sound, onClose }: SoundPlayerProps) {
  const [audioSound, setAudioSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<any>(null);

  // Local asset loading with require
  const audioSource = sound.audio ? require(sound.audio) : null;
  const videoSource = sound.video ? require(sound.video) : null;

  useEffect(() => {
    setupAudio();
    loadAndPlay();

    return () => {
      cleanup();
    };
  }, [sound]);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      console.error('[SoundPlayer] Error setting audio mode:', error);
    }
  };

  const cleanup = async () => {
    try {
      if (audioSound) {
        await audioSound.unloadAsync();
      }
      if (videoRef.current) {
        if (videoRef.current.stopAsync) {
          await videoRef.current.stopAsync();
        }
      }
    } catch (error) {
      console.error('[SoundPlayer] Cleanup error:', error);
    }
  };

  const loadAndPlay = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!audioSource) throw new Error('Aucun fichier audio trouvé !');

      const { sound: newSound } = await Audio.Sound.createAsync(
        audioSource,
        {
          shouldPlay: true,
          isLooping: true,
          volume: isMuted ? 0 : volume,
        },
        onPlaybackStatusUpdate
      );

      setAudioSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      console.error('[SoundPlayer] Error loading audio:', error);
      setError('Impossible de charger le son en local');
    } finally {
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E1B4B', '#312E81', '#4C1D95']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={28} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lecture</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{sound.title}</Text>

          {videoSource ? (
            <Video
              ref={videoRef}
              source={videoSource}
              style={styles.video}
              resizeMode={ResizeMode.COVER}
              shouldPlay
              isLooping
            />
          ) : (
            <Text style={styles.noVideo}>🎧 Aucun visuel pour ce son</Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B4B' },
  gradient: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 },
  closeButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  placeholder: { width: 44 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, color: 'white', marginBottom: 16 },
  video: { width: '100%', height: 300 },
  noVideo: { color: 'white', fontSize: 16, marginVertical: 20 },
});
