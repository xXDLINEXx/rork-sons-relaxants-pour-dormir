import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Audio } from 'expo-audio';
import { VideoView, ResizeMode } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SoundConfig } from '@/types/soundsConfig';

interface SoundPlayerProps {
  sound: SoundConfig;
  onClose: () => void;
}

export default function SoundPlayer({ sound, onClose }: SoundPlayerProps) {
  const [audioSound, setAudioSound] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<any>(null);

  const audioUri = sound.audio || sound.frequency || null;
  const videoUri = sound.video || null;

  useEffect(() => {
    loadAndPlay();
    return () => cleanup();
  }, [sound]);

  const loadAndPlay = async () => {
    if (!audioUri) return;
    setIsLoading(true);

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true, isLooping: true, volume }
      );

      setAudioSound(newSound);
      setIsPlaying(true);
    } catch (e) {
      console.error('Audio load error:', e);
    }
    setIsLoading(false);
  };

  const cleanup = async () => {
    if (audioSound) await audioSound.unloadAsync();
  };

  const togglePlayPause = async () => {
    if (!audioSound) return;
    isPlaying ? await audioSound.pauseAsync() : await audioSound.playAsync();
    setIsPlaying(!isPlaying);
  };

  const stopAudio = async () => {
    if (!audioSound) return;
    await audioSound.stopAsync();
    setIsPlaying(false);
  };

  const changeVolume = async (v: number) => {
    setVolume(v);
    if (audioSound) await audioSound.setVolumeAsync(v);
  };

  const toggleMute = async () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    if (audioSound) await audioSound.setVolumeAsync(newMute ? 0 : volume);
  };

  return (
    <View style={styles.container}>
      {videoUri && (
        <VideoView
          ref={videoRef}
          source={{ uri: videoUri }}
          resizeMode={ResizeMode.COVER}
          style={styles.video}
          isLooping
          shouldPlay
          muted
        />
      )}

      <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.overlay}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>{sound.title}</Text>

        {isLoading && <ActivityIndicator size="large" color="#fff" />}

        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={42} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={stopAudio} style={styles.stopButton}>
            <Ionicons name="stop" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.volumeControls}>
          <TouchableOpacity onPress={toggleMute}>
            <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={26} color="#fff" />
          </TouchableOpacity>

          <View style={styles.volumeDots}>
            {[0.2, 0.4, 0.6, 0.8, 1].map(v => (
              <TouchableOpacity
                key={v}
                style={[styles.dot, volume >= v && !isMuted ? styles.dotActive : null]}
                onPress={() => changeVolume(v)}
              />
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  video: { width, height },
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    padding: 20, justifyContent: 'space-between'
  },
  closeButton: { alignSelf: 'flex-end', padding: 10 },
  title: { fontSize: 28, color: '#fff', textAlign: 'center', marginVertical: 15 },
  controls: { flexDirection: 'row', justifyContent: 'center', gap: 30 },
  playButton: { padding: 20 },
  stopButton: { padding: 20 },
  volumeControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
  volumeDots: { flexDirection: 'row', gap: 6 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { backgroundColor: '#fff' },
});
