import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
// ⚠️ Chemin relatif depuis /app vers /utils
import { getVideoSource } from '../utils/tryRequire';

export default function FullscreenPlayerScreen() {
  const params = useLocalSearchParams<{ mediaId?: string }>();
  const mediaId = params.mediaId || 'bruit-blanc'; // valeur par défaut de secours

  return (
    <View style={styles.container}>
      <Video
        source={getVideoSource(String(mediaId))}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  video: { flex: 1 },
});
