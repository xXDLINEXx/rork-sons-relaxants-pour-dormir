export interface HealingFrequency {
  id: string;
  frequency: number;
  title: string;
  description: string;
  color: string;
  audioUrl: string;
}

export const healingFrequencies: HealingFrequency[] = [
  {
    id: '174',
    frequency: 174,
    title: 'Réduit le stress',
    description: 'Fréquence de base qui aide à réduire le stress et la tension',
    color: '#8B5CF6',
    audioUrl: 'https://cdn.pixabay.com/audio/2024/08/08/audio_0d1a6fa5f3.mp3',
  },
  {
    id: '285',
    frequency: 285,
    title: 'Favorise la guérison',
    description: 'Aide à régénérer les tissus et favorise la guérison naturelle',
    color: '#A78BFA',
    audioUrl: 'https://cdn.pixabay.com/audio/2024/08/08/audio_60b4483527.mp3',
  },
  {
    id: '396',
    frequency: 396,
    title: 'Libère les blocages cachés',
    description: 'Libère la culpabilité et les blocages émotionnels profonds',
    color: '#C4B5FD',
    audioUrl: 'https://cdn.pixabay.com/audio/2023/02/01/audio_06883b340b.mp3',
  },
  {
    id: '417',
    frequency: 417,
    title: 'Nettoie les traumatismes',
    description: 'Facilite le changement et nettoie les expériences traumatiques',
    color: '#DDD6FE',
    audioUrl: 'https://cdn.pixabay.com/audio/2023/02/01/audio_18b2715bc8.mp3',
  },
  {
    id: '432',
    frequency: 432,
    title: 'Harmonise le corps',
    description: 'Fréquence d\'harmonie naturelle avec l\'univers',
    color: '#E9D5FF',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/11/18/audio_56770860e5.mp3',
  },
  {
    id: '528',
    frequency: 528,
    title: 'Répare le corps',
    description: 'Fréquence miracle qui répare l\'ADN et apporte la transformation',
    color: '#FAF5FF',
    audioUrl: 'https://cdn.pixabay.com/audio/2023/02/01/audio_a8bb56f542.mp3',
  },
  {
    id: '639',
    frequency: 639,
    title: 'Améliore les relations',
    description: 'Renforce les connexions et améliore les relations interpersonnelles',
    color: '#FDF4FF',
    audioUrl: 'https://cdn.pixabay.com/audio/2023/02/01/audio_dcb9acf6dd.mp3',
  },
  {
    id: '741',
    frequency: 741,
    title: 'Stimule l\'intuition',
    description: 'Éveille l\'intuition et favorise l\'expression de soi',
    color: '#FCE7F3',
    audioUrl: 'https://cdn.pixabay.com/audio/2023/02/01/audio_15ef0a5fbe.mp3',
  },
  {
    id: '852',
    frequency: 852,
    title: 'Éveille la spiritualité',
    description: 'Renforce l\'intuition spirituelle et la connexion au divin',
    color: '#FBCFE8',
    audioUrl: 'https://cdn.pixabay.com/audio/2023/02/01/audio_2c87e7ed7f.mp3',
  },
  {
    id: '963',
    frequency: 963,
    title: 'Connexion à l\'univers',
    description: 'Fréquence de l\'unité et de la connexion avec l\'énergie universelle',
    color: '#F9A8D4',
    audioUrl: 'https://cdn.pixabay.com/audio/2024/10/18/audio_dc0bf1c7eb.mp3',
  },
];
