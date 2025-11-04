import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Music, Radio } from 'lucide-react-native';
import soundsData from '../soundsConfig.json'; // ← Import local JSON
import { SoundConfig } from '@/types/soundsConfig';

interface SoundListProps {
  onSelectSound: (sound: SoundConfig, index: number) => void;
}

export function SoundList({ onSelectSound }: SoundListProps) {
  const sounds = soundsData as SoundConfig[];

  const frequencies = sounds.filter((s) => s.frequency);
  const regularSounds = sounds.filter((s) => s.audio && !s.frequency);

  if (!sounds || sounds.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Aucun son disponible</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {regularSounds.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Sons relaxants</Text>
          {regularSounds.map((sound, index) => (
            <SoundCard
              key={`sound-${index}`}
              sound={sound}
              onPress={() => onSelectSound(sound, index)}
              type="sound"
            />
          ))}
        </>
      )}

      {frequencies.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Fréquences régénérantes</Text>
          {frequencies.map((sound, index) => (
            <SoundCard
              key={`freq-${index}`}
              sound={sound}
              onPress={() => onSelectSound(sound, index + regularSounds.length)}
              type="frequency"
            />
          ))}
        </>
      )}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

interface SoundCardProps {
  sound: SoundConfig;
  onPress: () => void;
  type: 'sound' | 'frequency';
}

function SoundCard({ sound, onPress, type }: SoundCardProps) {
  const thumbnailMap: Record<string, string> = {
    'Pluie douce': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&q=80',
    'Vague de l\'océan': 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80',
    'Forêt paisible': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    'Vent léger': 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80',
    'Feu de camp': 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=800&q=80',
    'Rivière calme': 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    'Orage apaisant': 'https://images.unsplash.com/photo-1429552077091-836152271555?w=800&q=80',
    'Bruit blanc': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
  };

  const defaultThumb = 'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=800&q=80';

  const thumbnailUrl = type === 'frequency'
    ? defaultThumb
    : thumbnailMap[sound.title] || defaultThumb;

  const Icon = type === 'frequency' ? Radio : Music;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <ImageBackground
        source={{ uri: thumbnailUrl }}
        style={styles.cardImage}
        imageStyle={styles.cardImageStyle}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.85)']}
          style={styles.cardGradient}
        >
          <View style={styles.iconBadge}>
            <Icon size={20} color="#FFFFFF" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{sound.title}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyText: { fontSize: 16, color: '#9CA3AF', textAlign: 'center' },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginBottom: 16, marginTop: 16, marginLeft: 4 },
  card: { marginBottom: 16, borderRadius: 24, overflow: 'hidden', height: 280 },
  cardImage: { width: '100%', height: '100%' },
  cardImageStyle: { borderRadius: 24 },
  cardGradient: { flex: 1, justifyContent: 'flex-end' },
  iconBadge: {
    position: 'absolute', top: 16, right: 16,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center'
  },
  cardContent: { padding: 24, paddingBottom: 28 },
  cardTitle: { fontSize: 26, fontWeight: '700', color: '#FFFFFF', marginBottom: 6, letterSpacing: 0.3 },
  bottomSpacer: { height: 100 },
});
