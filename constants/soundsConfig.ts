type SoundEntry = {
  title: string;
  audio?: number | string;
  video?: number | string;
  frequency?: number | string;
};

const FALLBACK_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const FALLBACK_VIDEO = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';

const tryLoadAudio = (path: string): number | string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(path);
  } catch {
    return FALLBACK_AUDIO;
  }
};

const tryLoadVideo = (path: string): number | string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(path);
  } catch {
    return FALLBACK_VIDEO;
  }
};

const sounds: SoundEntry[] = [
  { 
    title: "Vent léger", 
    audio: tryLoadAudio('../media/audio/vent-leger.mp3'),
    video: tryLoadVideo('../media/video/vent-leger.mp4')
  },
  { 
    title: "Vague de l'océan", 
    audio: tryLoadAudio('../media/audio/vague-de-locean.mp3'),
    video: tryLoadVideo('../media/video/vague-de-locean.mp4')
  },
  { 
    title: "Rivière calme", 
    audio: tryLoadAudio('../media/audio/riviere-calme.mp3'),
    video: tryLoadVideo('../media/video/riviere-calme.mp4')
  },
  { 
    title: "Pluie douce", 
    audio: tryLoadAudio('../media/audio/pluie-douce.mp3'),
    video: tryLoadVideo('../media/video/pluie-douce.mp4')
  },
  { 
    title: "Orage apaisant", 
    audio: tryLoadAudio('../media/audio/orage-apaisant.mp3'),
    video: tryLoadVideo('../media/video/orage-apaisant.mp4')
  },
  { 
    title: "Forêt paisible", 
    audio: tryLoadAudio('../media/audio/foret-paisible.mp3'),
    video: tryLoadVideo('../media/video/foret-paisible.mp4')
  },
  { 
    title: "Feu de camp", 
    audio: tryLoadAudio('../media/audio/feu-de-camp.mp3'),
    video: tryLoadVideo('../media/video/feu-de-camp.mp4')
  },
  { 
    title: "Bruit blanc", 
    audio: tryLoadAudio('../media/audio/bruit-blanc.mp3'),
    video: tryLoadVideo('../media/video/bruit-blanc.mp4')
  },

  { 
    title: "4–7 Hz – Avec 417 & 639 Hz",
    frequency: tryLoadAudio('../media/frequency/4-7hz-with-417hz-639hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
  { 
    title: "8–12 Hz",
    frequency: tryLoadAudio('../media/frequency/8-to-12-hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
  { 
    title: "10 Hz",
    frequency: tryLoadAudio('../media/frequency/10hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
  { 
    title: "33 Hz",
    frequency: tryLoadAudio('../media/frequency/33hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
  { 
    title: "66 Hz",
    frequency: tryLoadAudio('../media/frequency/66hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
  { 
    title: "396/417/639 Hz",
    frequency: tryLoadAudio('../media/frequency/396-hz-417-hz-639hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
  { 
    title: "417 Hz",
    frequency: tryLoadAudio('../media/frequency/417hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
  { 
    title: "852 Hz",
    frequency: tryLoadAudio('../media/frequency/852hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
  { 
    title: "1441 Hz",
    frequency: tryLoadAudio('../media/frequency/1441hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
  { 
    title: "2772 Hz",
    frequency: tryLoadAudio('../media/frequency/2772hz.mp3'),
    video: tryLoadVideo('../media/frequency/frequence.mp4')
  },
];

export default sounds;
export type { SoundEntry };
