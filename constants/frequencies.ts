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
  { id: '174-pure', frequency: 174, title: '174 Hz – Soulagement (Pur)', description: 'Fréquence pure en boucle', color: palette[0], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/174hz_pure.mp3' },
  { id: '174-ambient', frequency: 174, title: '174 Hz – Soulagement (Ambiant)', description: 'Version ambiante douce', color: palette[1], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/174hz_ambient.mp3' },
  { id: '285-pure', frequency: 285, title: '285 Hz – Régénération (Pur)', description: 'Fréquence pure en boucle', color: palette[2], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/285hz_pure.mp3' },
  { id: '285-ambient', frequency: 285, title: '285 Hz – Régénération (Ambiant)', description: 'Version ambiante douce', color: palette[3], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/285hz_ambient.mp3' },
  { id: '396-pure', frequency: 396, title: '396 Hz – Libération (Pur)', description: 'Fréquence pure en boucle', color: palette[4], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/396hz_pure.mp3' },
  { id: '396-ambient', frequency: 396, title: '396 Hz – Libération (Ambiant)', description: 'Version ambiante douce', color: palette[5], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/396hz_ambient.mp3' },
  { id: '417-pure', frequency: 417, title: '417 Hz – Transformation (Pur)', description: 'Fréquence pure en boucle', color: palette[6], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/417hz_pure.mp3' },
  { id: '417-ambient', frequency: 417, title: '417 Hz – Transformation (Ambiant)', description: 'Version ambiante douce', color: palette[7], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/417hz_ambient.mp3' },
  { id: '432-pure', frequency: 432, title: '432 Hz – Harmonie (Pur)', description: 'Fréquence pure en boucle', color: palette[8], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/432hz_pure.mp3' },
  { id: '432-ambient', frequency: 432, title: '432 Hz – Harmonie (Ambiant)', description: 'Version ambiante douce', color: palette[9], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/432hz_ambient.mp3' },
  { id: '528-pure', frequency: 528, title: '528 Hz – Guérison (Pur)', description: 'Fréquence pure en boucle', color: palette[0], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/528hz_pure.mp3' },
  { id: '528-ambient', frequency: 528, title: '528 Hz – Guérison (Ambiant)', description: 'Version ambiante douce', color: palette[1], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/528hz_ambient.mp3' },
  { id: '639-pure', frequency: 639, title: '639 Hz – Relations (Pur)', description: 'Fréquence pure en boucle', color: palette[2], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/639hz_pure.mp3' },
  { id: '639-ambient', frequency: 639, title: '639 Hz – Relations (Ambiant)', description: 'Version ambiante douce', color: palette[3], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/639hz_ambient.mp3' },
  { id: '741-pure', frequency: 741, title: '741 Hz – Intuition (Pur)', description: 'Fréquence pure en boucle', color: palette[4], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/741hz_pure.mp3' },
  { id: '741-ambient', frequency: 741, title: '741 Hz – Intuition (Ambiant)', description: 'Version ambiante douce', color: palette[5], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/741hz_ambient.mp3' },
  { id: '852-pure', frequency: 852, title: '852 Hz – Éveil (Pur)', description: 'Fréquence pure en boucle', color: palette[6], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/852hz_pure.mp3' },
  { id: '852-ambient', frequency: 852, title: '852 Hz – Éveil (Ambiant)', description: 'Version ambiante douce', color: palette[7], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/852hz_ambient.mp3' },
  { id: '963-pure', frequency: 963, title: '963 Hz – Connexion cosmique (Pur)', description: 'Fréquence pure en boucle', color: palette[8], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/963hz_pure.mp3' },
  { id: '963-ambient', frequency: 963, title: '963 Hz – Connexion cosmique (Ambiant)', description: 'Version ambiante douce', color: palette[9], audioUrl: 'https://cdn.jsdelivr.net/gh/naptha/audio-examples@main/healing/963hz_ambient.mp3' },
];
