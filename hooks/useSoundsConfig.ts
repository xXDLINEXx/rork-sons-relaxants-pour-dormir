import { useQuery } from '@tanstack/react-query';
import { SoundsConfig } from '@/types/soundsConfig';

const SOUNDS_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/xXDLINEXx/serenity/soundsConfig.ts';

async function fetchSoundsConfig(): Promise<SoundsConfig> {
  console.log('[useSoundsConfig] Fetching from CDN:', SOUNDS_CONFIG_URL);
  
  try {
    const response = await fetch(SOUNDS_CONFIG_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('[useSoundsConfig] Raw response length:', text.length);
    
    const exportMatch = text.match(/export\s+(?:const|default)\s+\w+\s*[:=]\s*(\[[\s\S]*\])/);
    
    if (!exportMatch) {
      console.error('[useSoundsConfig] Could not parse config from:', text.substring(0, 500));
      throw new Error('Invalid soundsConfig format');
    }
    
    const jsonString = exportMatch[1]
      .replace(/\/\/[^\n]*/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/(\w+):/g, '"$1":')
      .replace(/'/g, '"')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');
    
    const config = JSON.parse(jsonString) as SoundsConfig;
    console.log('[useSoundsConfig] Loaded', config.length, 'sounds');
    
    return config;
  } catch (error) {
    console.error('[useSoundsConfig] Error fetching config:', error);
    throw error;
  }
}

export function useSoundsConfig() {
  return useQuery({
    queryKey: ['soundsConfig'],
    queryFn: fetchSoundsConfig,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}
