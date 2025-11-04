export interface SoundConfig {
  title: string;
  type: string;
  audio?: number | null;
  video?: number | null;
  frequency?: string | null;
  description?: string | null;
  benefits?: string | null;
}

export type SoundsConfig = SoundConfig[];
