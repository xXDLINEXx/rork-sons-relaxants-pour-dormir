export interface SleepSound {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  audioUrl: string;
}

export const sleepSounds: SleepSound[] = [
  {
    id: 'rain',
    title: 'Pluie douce',
    description: 'Son apaisant de la pluie qui tombe',
    icon: 'cloud-rain',
    color: '#60A5FA',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/05/13/audio_2fe327e3d4.mp3',
  },
  {
    id: 'ocean',
    title: 'Vagues de l\'océan',
    description: 'Bruit des vagues qui se brisent sur la plage',
    icon: 'waves',
    color: '#3B82F6',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/06/07/audio_c6805ab3d7.mp3',
  },
  {
    id: 'forest',
    title: 'Forêt paisible',
    description: 'Sons apaisants de la nature en forêt',
    icon: 'trees',
    color: '#10B981',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/03/10/audio_4dedf2bf94.mp3',
  },
  {
    id: 'wind',
    title: 'Vent léger',
    description: 'Murmure doux du vent dans les arbres',
    icon: 'wind',
    color: '#8B5CF6',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c610232532.mp3',
  },
  {
    id: 'fire',
    title: 'Feu de camp',
    description: 'Crépitement relaxant d\'un feu de bois',
    icon: 'flame',
    color: '#F59E0B',
    audioUrl: 'https://cdn.pixabay.com/audio/2021/08/09/audio_d1718ab41b.mp3',
  },
  {
    id: 'whitenoise',
    title: 'Bruit blanc',
    description: 'Son constant pour masquer les bruits ambiants',
    icon: 'radio',
    color: '#6B7280',
    audioUrl: 'https://cdn.pixabay.com/audio/2023/10/30/audio_efa46c6e98.mp3',
  },
];
