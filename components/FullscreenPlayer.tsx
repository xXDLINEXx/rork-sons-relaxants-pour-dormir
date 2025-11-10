import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av'; // expo-av reste valide ici
import { getVideoSource } from '../utils/tryRequire'; // bon chemin pour ton projet

type FullScreenPlayerProps = {
  initialMediaId: string;
};

export default function FullScreenPlayer({ initialMediaId }: FullScreenPlayerProps) {
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    // Nettoyage lors du retour arrière ou du démontage du composant
    return () => {
      if (videoRef.current) {
        videoRef.current.stopAsync?.().catch(() => {});
        videoRef.current.unloadAsync?.().catch(() => {});
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={getVideoSource(initialMediaId)} // lien dynamique vers ton utilitaire
        shouldPlay
        isLooping
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        style={styles.video}
        useNativeControls
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
});
