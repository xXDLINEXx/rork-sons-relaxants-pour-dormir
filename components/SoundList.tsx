import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { soundsConfig } from '@/constants/soundsConfig';
import { SoundConfig } from '@/types/soundsConfig';

interface SoundListProps {
  onSelectSound: (sound: SoundConfig) => void;
}

export function SoundList({ onSelectSound }: SoundListProps) {
  const sounds = soundsConfig.filter(s => s.type === 'sound');
  const frequencies = soundsConfig.filter(s => s.type === 'frequency');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎵 Sons relaxants</Text>
        {sounds.map((sound, index) => (
          <SoundCard key={index} sound={sound} onPress={() => onSelectSound(sound)} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Fréquences de guérison</Text>
        {frequencies.map((frequency, index) => (
          <SoundCard key={index} sound={frequency} onPress={() => onSelectSound(frequency)} />
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

function SoundCard({ sound, onPress }: { sound: SoundConfig; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
      testID={`sound-${sound.title}`}
    >
      <LinearGradient
        colors={sound.type === 'frequency' ? ['#581C87', '#7C3AED'] : ['#1E3A8A', '#3B82F6']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{sound.title}</Text>
            {sound.description && (
              <Text style={styles.cardDescription}>{sound.description}</Text>
            )}
            {sound.benefits && (
              <Text style={styles.cardBenefits}>{sound.benefits}</Text>
            )}
            {sound.frequency && (
              <View style={styles.frequencyBadge}>
                <Text style={styles.frequencyText}>{sound.frequency}</Text>
              </View>
            )}
          </View>
          <View style={styles.playButton}>
            <Play size={28} color="#FFFFFF" fill="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 4,
  },
  cardBenefits: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 18,
    fontStyle: 'italic' as const,
  },
  frequencyBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  frequencyText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSpacer: {
    height: 40,
  },
});