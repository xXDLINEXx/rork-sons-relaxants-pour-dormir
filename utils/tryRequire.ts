const CDN_BASE = 'https://cdn.jsdelivr.net/gh/xXDLINEXx/serenity';

export function tryRequire(localPath: string): any {
  console.log(`[tryRequire] Attempting to load: ${localPath}`);
  
  try {
    if (localPath.includes('/audio/')) {
      const filename = localPath.split('/audio/')[1].replace('.mp3', '');
      console.log(`[tryRequire] Loading audio: ${filename}`);
      
      try {
        switch (filename) {
          case 'pluie-douce':
            return require('../media/audio/pluie-douce.mp3');
          case 'vague-de-locean':
            return require('../media/audio/vague-de-locean.mp3');
          case 'feu-de-camp':
            return require('../media/audio/feu-de-camp.mp3');
          case 'foret-paisible':
            return require('../media/audio/foret-paisible.mp3');
          case 'vent-leger':
            return require('../media/audio/vent-leger.mp3');
          case 'orage-apaisant':
            return require('../media/audio/orage-apaisant.mp3');
          case 'riviere-calme':
            return require('../media/audio/riviere-calme.mp3');
          case 'bruit-blanc':
            return require('../media/audio/bruit-blanc.mp3');
          default:
            throw new Error(`Audio file not in switch: ${filename}`);
        }
      } catch (requireError) {
        const cdnUrl = `${CDN_BASE}/media/audio/${filename}.mp3`;
        console.log(`[tryRequire] Local audio failed, using CDN: ${cdnUrl}`);
        return { uri: cdnUrl };
      }
    } else if (localPath.includes('/video/')) {
      const filename = localPath.split('/video/')[1].replace('.mp4', '');
      console.log(`[tryRequire] Loading video: ${filename}`);
      
      try {
        switch (filename) {
          case 'pluie-douce':
            return require('../media/video/pluie-douce.mp4');
          case 'vague-de-locean':
            return require('../media/video/vague-de-locean.mp4');
          case 'feu-de-camp':
            return require('../media/video/feu-de-camp.mp4');
          case 'foret-paisible':
            return require('../media/video/foret-paisible.mp4');
          case 'vent-leger':
            return require('../media/video/vent-leger.mp4');
          case 'orage-apaisant':
            return require('../media/video/orage-apaisant.mp4');
          case 'riviere-calme':
            return require('../media/video/riviere-calme.mp4');
          case 'bruit-blanc':
            return require('../media/video/bruit-blanc.mp4');
          case 'frequence':
            return require('../media/video/frequence.mp4');
          default:
            throw new Error(`Video file not in switch: ${filename}`);
        }
      } catch (requireError) {
        const cdnUrl = `${CDN_BASE}/media/video/${filename}.mp4`;
        console.log(`[tryRequire] Local video failed, using CDN: ${cdnUrl}`);
        return { uri: cdnUrl };
      }
    } else if (localPath.includes('/frequency/')) {
      const filename = localPath.split('/frequency/')[1].replace('.mp3', '');
      console.log(`[tryRequire] Loading frequency: ${filename}`);
      
      try {
        switch (filename) {
          case '4-7hz-with-417hz-639hz':
            return require('../media/frequency/4-7hz-with-417hz-639hz.mp3');
          case '8-to-12-hz':
            return require('../media/frequency/8-to-12-hz.mp3');
          case '10hz':
            return require('../media/frequency/10hz.mp3');
          case '33hz':
            return require('../media/frequency/33hz.mp3');
          case '66hz':
            return require('../media/frequency/66hz.mp3');
          case '396-hz-417-hz-639hz':
            return require('../media/frequency/396-hz-417-hz-639hz.mp3');
          case '417hz':
            return require('../media/frequency/417hz.mp3');
          case '852hz':
            return require('../media/frequency/852hz.mp3');
          case '1441hz':
            return require('../media/frequency/1441hz.mp3');
          case '2772hz':
            return require('../media/frequency/2772hz.mp3');
          default:
            throw new Error(`Frequency file not in switch: ${filename}`);
        }
      } catch (requireError) {
        const cdnUrl = `${CDN_BASE}/media/frequency/${filename}.mp3`;
        console.log(`[tryRequire] Local frequency failed, using CDN: ${cdnUrl}`);
        return { uri: cdnUrl };
      }
    }

    console.warn(`[tryRequire] Invalid path format: ${localPath}`);
    return { uri: `${CDN_BASE}${localPath.replace('..', '')}` };
  } catch (error) {
    console.error(`[tryRequire] Fatal error loading ${localPath}:`, error);
    return { uri: `${CDN_BASE}${localPath.replace('..', '')}` };
  }
}
