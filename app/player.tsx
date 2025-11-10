import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Play,
  Pause,
  X,
  Clock,
  CloudRain,
  Waves,
  Trees,
  Wind,
  Flame,
  Radio,
  Zap,
} from 'lucide-react-native';
import { useAudio } from '@/contexts/AudioContext';
import { sleepSounds, SleepSound } from '@/constants/sleepSounds';
import { healingFrequencies, HealingFrequency } from '@/constants/frequencies';
import { getAudioSource } from '../utils/tryRequire';

const { width, height } = Dimensions.get('window');

// [Ici le même visualConfig que tu as déjà, inchangé]

export default function PlayerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const audio = useAudio();

  const soundId = params.id as string;
  const type = params.type as 'sound' | 'frequency';

  const item: SleepSound | HealingFrequency | undefined = type === 'sound' 
    ? sleepSounds.find(s => s.id === soundId)
    : healingFrequencies.find(f => f.id === soundId);

  const config = visualConfig[soundId] || visualConfig.frequency;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
    ]).start();

    const rotateLoop = Animated.loop(
      Animated.timing(rotateAnim, { toValue: 1, duration: 20000, easing: Easing.linear, useNativeDriver: true })
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );

    rotateLoop.start();
    pulseLoop.start();

    return () => {
      rotateLoop.stop();
      pulseLoop.stop();
    };
  }, []);

  const handleBack = async () => {
    await audio.stopSound();
    router.back();
  };

  const handlePlayPause = async () => {
    if (!item) return;
    let url = '';

    if ('audioUrl' in item && item.audioUrl) {
      try {
        const source = getAudioSource(item.audioUrl);
        url = source.default || source;
      } catch {
        url = item.audioUrl;  // fallback si pas trouvé
      }
    }

    const title = item.title || '';

    if (audio.currentTrack === url && audio.isPlaying) {
      await audio.pauseSound();
    } else {
      await audio.playSound(url, title);
    }
  };

  const rotate = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Son non trouvé</Text>
      </View>
    );
  }

  const Icon = config.icon;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={config.colors as [string, string, ...string[]]} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} testID="back-button">
            <ArrowLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lecture en cours</Text>
          <View style={styles.placeholder} />
        </View>

        <Animated.View style={[styles.visualContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <AnimatedBackground config={config} pulseAnim={pulseAnim} rotateAnim={rotate} />
          <Animated.View style={[styles.iconCircle, { transform: [{ rotate }, { scale: pulseAnim }] }]}>
            <Icon size={80} color="#FFFFFF" strokeWidth={1.5} />
          </Animated.View>
        </Animated.View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {'frequency' in item && (
            <View style={styles.frequencyBadge}>
              <Text style={styles.frequencyText}>{item.frequency} Hz</Text>
            </View>
          )}
        </View>

        <View style={[styles.controls, { paddingBottom: insets.bottom + 24 }]}>
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlButton} onPress={handlePlayPause} testID="play-pause-button">
              {audio.isPlaying ? <Pause size={48} color="#FFFFFF" fill="#FFFFFF" /> : <Play size={48} color="#FFFFFF" fill="#FFFFFF" />}
            </TouchableOpacity>

            <TouchableOpacity style={styles.stopButton} onPress={handleBack} testID="stop-button">
              <X size={32} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {audio.timer && (
          <View style={styles.timerIndicator}>
            <Clock size={16} color="#FFFFFF" />
            <Text style={styles.timerText}>{audio.timer} min</Text>
          </View>
        )}

      </LinearGradient>
    </View>
  );
}

// Implémente AnimatedBackground et styles ici ou dans un autre fichier, comme dans ta version actuelle

const styles = StyleSheet.create({
  // Ta définition des styles, inchangée ou adaptée
});
