import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
// ⚠️ Chemin relatif depuis /app vers /constants
import { sleepSounds } from '../constants/sleepSounds';

export default function CDNPlayerScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sons (CDN)</Text>
      <FlatList
        data={sleepSounds}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push({ pathname: '/player', params: { id: item.id, type: 'sound' } })}
          >
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowDesc} numberOfLines={1}>{item.description}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b0b0f' },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 12 },
  row: { backgroundColor: '#111827', padding: 14, borderRadius: 12 },
  rowTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  rowDesc: { color: 'rgba(255,255,255,0.65)', fontSize: 12 },
});
