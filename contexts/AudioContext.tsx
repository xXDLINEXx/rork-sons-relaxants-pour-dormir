import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Audio } from "expo-av";
import { useNavigation } from "expo-router";

interface AudioContextType {
  sound: Audio.Sound | null;
  isPlaying: boolean;
  currentTitle: string | null;
  playSound: (uri: string, title: string) => Promise<void>;
  pauseSound: () => Promise<void>;
  stopSound: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);

  const navigation = useNavigation();

  /* ------------------------------------------------------
     STOP SOUND - CLEANUP GLOBAL
  ------------------------------------------------------ */
  const stopSound = useCallback(async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    } catch (e) {
      console.log("stop error:", e);
    }

    setSound(null);
    setIsPlaying(false);
    setCurrentTitle(null);
  }, [sound]);

  /* ------------------------------------------------------
     PAUSE SOUND
  ------------------------------------------------------ */
  const pauseSound = useCallback(async () => {
    if (!sound) return;
    try {
      await sound.pauseAsync();
      setIsPlaying(false);
    } catch (e) {
      console.log("pause error:", e);
    }
  }, [sound]);

  /* ------------------------------------------------------
     PLAY SOUND - ALWAYS STOPS OLD SOUND
  ------------------------------------------------------ */
  const playSound = useCallback(
    async (uri: string, title: string) => {
      try {
        if (!uri) return;

        // Stop previous audio instance
        await stopSound();

        const { sound: newSound } = await Audio.Sound.createAsync({
          uri,
        });

        setSound(newSound);
        setCurrentTitle(title);

        await newSound.playAsync();
        setIsPlaying(true);

        // Auto cleanup when sound finishes
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) return;
          if (status.didJustFinish) {
            stopSound();
          }
        });
      } catch (e) {
        console.log("play error:", e);
      }
    },
    [stopSound]
  );

  /* ------------------------------------------------------
     AUTO-STOP WHEN NAVIGATING AWAY
     (Retour arrière, changement d’écran, etc.)
  ------------------------------------------------------ */
  useEffect(() => {
    const unsub = navigation.addListener("beforeRemove", () => {
      stopSound();
    });
    return unsub;
  }, [navigation, stopSound]);

  /* ------------------------------------------------------
     CLEANUP ON UNMOUNT
  ------------------------------------------------------ */
  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        sound,
        isPlaying,
        currentTitle,
        playSound,
        pauseSound,
        stopSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used inside <AudioProvider>");
  }
  return ctx;
};
