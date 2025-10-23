export interface HealingFrequency {
  id: string;
  frequency: number;
  title: string;
  description: string;
  color: string;
  audioUrl: string;
}

const palette = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#E9D5FF', '#FAF5FF', '#FDF4FF', '#FCE7F3', '#FBCFE8', '#F9A8D4'];

export const healingFrequencies: HealingFrequency[] = [
  { id: '174-pure', frequency: 174, title: '174 Hz – Soulagement', description: 'Fréquence pure en boucle', color: palette[0], audioUrl: 'generated:174' },
  { id: '285-pure', frequency: 285, title: '285 Hz – Régénération', description: 'Fréquence pure en boucle', color: palette[2], audioUrl: 'generated:285' },
  { id: '396-pure', frequency: 396, title: '396 Hz – Libération', description: 'Fréquence pure en boucle', color: palette[4], audioUrl: 'generated:396' },
  { id: '417-pure', frequency: 417, title: '417 Hz – Transformation', description: 'Fréquence pure en boucle', color: palette[6], audioUrl: 'generated:417' },
  { id: '432-pure', frequency: 432, title: '432 Hz – Harmonie', description: 'Fréquence pure en boucle', color: palette[8], audioUrl: 'generated:432' },
  { id: '528-pure', frequency: 528, title: '528 Hz – Guérison', description: 'Fréquence pure en boucle', color: palette[0], audioUrl: 'generated:528' },
  { id: '639-pure', frequency: 639, title: '639 Hz – Relations', description: 'Fréquence pure en boucle', color: palette[2], audioUrl: 'generated:639' },
  { id: '741-pure', frequency: 741, title: '741 Hz – Intuition', description: 'Fréquence pure en boucle', color: palette[4], audioUrl: 'generated:741' },
  { id: '852-pure', frequency: 852, title: '852 Hz – Éveil', description: 'Fréquence pure en boucle', color: palette[6], audioUrl: 'generated:852' },
  { id: '963-pure', frequency: 963, title: '963 Hz – Connexion cosmique', description: 'Fréquence pure en boucle', color: palette[8], audioUrl: 'generated:963' },
];
