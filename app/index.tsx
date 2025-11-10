import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serenity</Text>
      <Text style={styles.subtitle}>Choisis un lecteur</Text>

      <Link href="/cdn-player" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Sons (CDN)</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/local-player" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Fréquences locales</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#0b0b0f' },
  title: { color: '#fff', fontSize: 28, fontWeight: '800' },
  subtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 12 },
  btn: { backgroundColor: '#1f2937', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
