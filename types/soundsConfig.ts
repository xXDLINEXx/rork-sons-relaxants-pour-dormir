export interface SoundConfig {
  title: string;
  audio?: string | null;
  video?: string | null;
  frequency?: string | null;
  description?: string;
  benefits?: string;
}

export type SoundsConfig = SoundConfig[];
