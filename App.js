import React, { useRef, useState } from "react";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { Video } from "expo-av";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const DEVICE_WIDTH = Dimensions.get("window").width;
const Tab = createMaterialTopTabNavigator();

const CARD = {
  backgroundColor: "#252047",
  borderRadius: 16,
  margin: 12,
  padding: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.2,
  shadowRadius: 12,
  elevation: 8,
  borderWidth: 1,
  borderColor: "#59d7f8",
};
const TITRE = { color: "#59d7f8", fontWeight: "bold", fontSize: 22 };
const SUBTITRE = { color: "#fecb6e", fontWeight: "bold", fontSize: 18 };

// Mapping sons + vidéos fusionnées (loop)
const soundVideoMap = [
  {
    label: "Pluie",
    audio:
      "https://drive.google.com/uc?export=download&id=1jo-vmLHvV7xpqou6cyHH9L0Kx-zCOzOg",
    video:
      "https://drive.google.com/uc?export=download&id=1aERgTV5KxBezLYTQO15dFY0mtGzkVHu0",
  },
  {
    label: "son vague",
    audio:
      "https://drive.google.com/uc?export=download&id=1Km4fMTU-JalnNqz4YDjiiJRu-_My_vjw",
    video:
      "https://drive.google.com/uc?export=download&id=1ZNT4mCTBYwNp1XtGhjeLEaJCTqDX17hM",
  },
  {
    label: "Nuit d'été",
    audio:
      "https://drive.google.com/uc?export=download&id=16Nt272zusQyhif1ZW6mfZLCO5YtDXeJ5",
    video:
      "https://drive.google.com/uc?export=download&id=1hzcKntamDo7dQr-gErVvgFgi7qGSwSoX",
  },
  {
    label: "Son avec lac",
    audio:
      "https://drive.google.com/uc?export=download&id=1ajDj94TgIiuhr_RBZjTwC6VALJwy6FKB",
    video:
      "https://drive.google.com/uc?export=download&id=1ricML_bqX-Ylrx6oAx5G8ugHjDfTYJbH",
  },
  {
    label: "feu",
    audio:
      "https://drive.google.com/uc?export=download&id=1jBWHB97Y3IEt0QG8RP_E7gNhB-Zycc0g",
    video:
      "https://drive.google.com/uc?export=download&id=1cUJDop9e0iKzX-dj5XnqOlTFZFRWmaNv",
  },
  {
    label: "Orage",
    audio:
      "https://drive.google.com/uc?export=download&id=1sqCw0npEZ9n9jx9t39FH0rJXh5pcnxPV",
    video:
      "https://drive.google.com/uc?export=download&id=1wBYWs-jPcMHlaPY8FayGrJ0ajl8woChB",
  },
  {
    label: "Calming Song",
    audio:
      "https://drive.google.com/uc?export=download&id=1XDcJIVTehsXvlmh98y0-bcqTTH1DmaRO",
    video:
      "https://drive.google.com/uc?export=download&id=1BaIOJrLqFVXvQvYMnQDXm3s6lpoxQYgO",
  },
  {
    label: "Bruit Blanc",
    audio:
      "https://drive.google.com/uc?export=download&id=1nubvhisU6cJMnUGhkuDfOTHdjHIHGon1",
    video:
      "https://drive.google.com/uc?export=download&id=1Q1fxpadNtlMgKg2SldN_XR5gATitnImN",
  },
];

// Fréquences + chaque vidéo ambiance
const frequencies = [
  {
    label: "8-to-12-hz",
    url: "https://drive.google.com/uc?export=download&id=165ZSFfznIaISSZ0bdU0h429HpjHGi6-b",
    video:
      "https://drive.google.com/uc?export=download&id=1wBYWs-jPcMHlaPY8FayGrJ0ajl8woChB",
  },
  {
    label: "396/417/639 Hz",
    url: "https://drive.google.com/uc?export=download&id=1m6XR8Ldir2YqNm27EFj8nauoKJNs7iaG",
    video:
      "https://drive.google.com/uc?export=download&id=1BaIOJrLqFVXvQvYMnQDXm3s6lpoxQYgO",
  },
  {
    label: "66 Hz",
    url: "https://drive.google.com/uc?export=download&id=1L6_hFYZssckZYJSk2CJxCVLg-WBzFZGD",
    video:
      "https://drive.google.com/uc?export=download&id=1hzcKntamDo7dQr-gErVvgFgi7qGSwSoX",
  },
  {
    label: "1441 Hz",
    url: "https://drive.google.com/uc?export=download&id=1K2XgzxsDE7_UiTJ-oD4zhR2ZonZIfCFl",
    video:
      "https://drive.google.com/uc?export=download&id=1ZNT4mCTBYwNp1XtGhjeLEaJCTqDX17hM",
  },
  {
    label: "417 Hz",
    url: "https://drive.google.com/uc?export=download&id=1pLwz5EKfIQ-HBxgIsdTGXNvL88MZ-vqf",
    video:
      "https://drive.google.com/uc?export=download&id=1aERgTV5KxBezLYTQO15dFY0mtGzkVHu0",
  },
  {
    label: "10 Hz",
    url: "https://drive.google.com/uc?export=download&id=1AifsvOp4dPdwKKgdNvSjklIWh4_N_cVT",
    video:
      "https://drive.google.com/uc?export=download&id=1ricML_bqX-Ylrx6oAx5G8ugHjDfTYJbH",
  },
  {
    label: "2772 Hz",
    url: "https://drive.google.com/uc?export=download&id=1B6cjAt8CMB4BQw7erwkML5HS5bYLHyZ9",
    video:
      "https://drive.google.com/uc?export=download&id=1Q1fxpadNtlMgKg2SldN_XR5gATitnImN",
  },
  {
    label: "852 Hz",
    url: "https://drive.google.com/uc?export=download&id=1WMr5N0hIr9AYpXCi0d2EHVvJkn5c29Tf",
    video:
      "https://drive.google.com/uc?export=download&id=1cUJDop9e0iKzX-dj5XnqOlTFZFRWmaNv",
  },
  {
    label: "33 Hz",
    url: "https://drive.google.com/uc?export=download&id=1UpVc_aGRN4QS1KgAilxgFOrmZbdqmvDd",
    video:
      "https://drive.google.com/uc?export=download&id=1Q1fxpadNtlMgKg2SldN_XR5gATitnImN",
  },
  {
    label: "4-7 Hz + 417/639",
    url: "https://drive.google.com/uc?export=download&id=1AjLjCEJwlrC2tUf1_YkOGWzBW7qglqX4",
    video:
      "https://drive.google.com/uc?export=download&id=1wBYWs-jPcMHlaPY8FayGrJ0ajl8woChB",
  },
  {
    label: "fréquence",
    url: "https://drive.google.com/uc?export=download&id=1RbxI41JdIXv2D75XvQ585Gk01F0nXk9p",
    video:
      "https://drive.google.com/uc?export=download&id=1nndFEg5PA0n01TReleklKZTZQAQWw5ix",
  },
];

// Feedback/flush
function showToast(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}
async function flushSounds(soundRef, videoRef) {
  if (soundRef.current) {
    await soundRef.current.unloadAsync();
    soundRef.current = null;
  }
  if (videoRef.current) {
    if (videoRef.current.stopAsync) videoRef.current.stopAsync();
    videoRef.current = null;
  }
}

// Favoris section
function FavoriteSoundsScreen({ favoriteIdxs }) {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 20,
          color: "#fecb6e",
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        ✨ Favoris
      </Text>
      {favoriteIdxs.length === 0 ? (
        <Text>Aucun favori défini pour le moment</Text>
      ) : (
        favoriteIdxs.map((idx) => (
          <View style={CARD} key={idx}>
            <Text style={TITRE}>{soundVideoMap[idx].label}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

// Player Sons+Vidéo
function SoundVideoPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [audioVolume, setAudioVolume] = useState(1);
  const [videoVolume, setVideoVolume] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [favoriteIdxs, setFavoriteIdxs] = useState([]);
  const soundRef = useRef(null);
  const videoRef = useRef(null);
  const current = soundVideoMap[currentIdx];

  async function playLooped(idx = currentIdx) {
    setIsPaused(false);
    if (soundRef.current) await soundRef.current.unloadAsync();
    const { sound } = await Audio.Sound.createAsync(
      { uri: soundVideoMap[idx].audio },
      { shouldPlay: true, isLooping: true, volume: audioVolume }
    );
    soundRef.current = sound;
    if (videoRef.current) {
      videoRef.current.seek(0);
      videoRef.current.setIsLooping && videoRef.current.setIsLooping(true);
      if (videoRef.current.setVolumeAsync)
        videoRef.current.setVolumeAsync(videoVolume);
      videoRef.current.playAsync && videoRef.current.playAsync();
    }
    showToast("Lecture : " + current.label);
  }
  async function stopAll() {
    setIsPaused(false);
    if (soundRef.current) await soundRef.current.stopAsync();
    if (videoRef.current && videoRef.current.pauseAsync)
      videoRef.current.pauseAsync();
    flushSounds(soundRef, videoRef);
    showToast("Arrêté.");
  }
  async function pauseAll() {
    setIsPaused(true);
    if (soundRef.current) await soundRef.current.pauseAsync();
    if (videoRef.current && videoRef.current.pauseAsync)
      videoRef.current.pauseAsync();
    showToast("Pause.");
  }
  async function resumeAll() {
    setIsPaused(false);
    if (soundRef.current) await soundRef.current.playAsync();
    if (videoRef.current && videoRef.current.playAsync)
      videoRef.current.playAsync();
    showToast("Reprise.");
  }
  async function playNext() {
    let nextIdx = (currentIdx + 1) % soundVideoMap.length;
    setCurrentIdx(nextIdx);
    await stopAll();
    setTimeout(() => playLooped(nextIdx), 50);
  }
  async function playPrev() {
    let prevIdx =
      (currentIdx - 1 + soundVideoMap.length) % soundVideoMap.length;
    setCurrentIdx(prevIdx);
    await stopAll();
    setTimeout(() => playLooped(prevIdx), 50);
  }
  async function setAudioVol(val) {
    setAudioVolume(val);
    if (soundRef.current) soundRef.current.setVolumeAsync(val);
  }
  async function setVideoVol(val) {
    setVideoVolume(val);
    if (videoRef.current && videoRef.current.setVolumeAsync)
      videoRef.current.setVolumeAsync(val);
  }
  function toggleFavorite() {
    if (favoriteIdxs.includes(currentIdx)) {
      setFavoriteIdxs(favoriteIdxs.filter((idx) => idx !== currentIdx));
    } else {
      setFavoriteIdxs([...favoriteIdxs, currentIdx]);
    }
  }
  return (
    <ScrollView>
      <View style={CARD}>
        <Text style={TITRE}>
          {current.label} ({currentIdx + 1}/{soundVideoMap.length})
        </Text>
        {favoriteIdxs.includes(currentIdx) && (
          <Text style={SUBTITRE}>❤️ Favori</Text>
        )}
        <View
          style={{
            flexDirection: "row",
            marginVertical: 8,
            justifyContent: "space-between",
          }}
        >
          <Button title="⏮" onPress={playPrev} />
          <Button
            title={isPaused ? "▶" : "▶ Jouer"}
            onPress={isPaused ? resumeAll : () => playLooped()}
          />
          <Button title="⏸" color="#fa0" onPress={pauseAll} />
          <Button title="⏹" color="#f44" onPress={stopAll} />
          <Button title="⏭" color="#44f" onPress={playNext} />
        </View>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={{ marginVertical: 8, alignSelf: "center" }}
        >
          <Text
            style={{
              fontSize: 18,
              color: favoriteIdxs.includes(currentIdx) ? "#fecb6e" : "#ccc",
            }}
          >
            {favoriteIdxs.includes(currentIdx)
              ? "Retirer des favoris"
              : "Ajouter aux favoris"}
          </Text>
        </TouchableOpacity>
        <Text>Volume Audio</Text>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={audioVolume}
          onValueChange={setAudioVol}
          step={0.01}
          style={{ width: DEVICE_WIDTH * 0.7, height: 40 }}
        />
        <Text>Volume Vidéo</Text>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={videoVolume}
          onValueChange={setVideoVol}
          step={0.01}
          style={{ width: DEVICE_WIDTH * 0.7, height: 40 }}
        />
        <Video
          ref={videoRef}
          source={{ uri: current.video }}
          rate={1.0}
          volume={videoVolume}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={true}
          style={{
            width: DEVICE_WIDTH * 0.9,
            height: 220,
            marginVertical: 16,
            borderRadius: 20,
          }}
        />
      </View>
    </ScrollView>
  );
}

// Fréquences régénérantes + vidéo ambiance
function FrequencyScreen() {
  const freqSound = useRef(null);
  const videoRef = useRef(null);
  const [freqVolume, setFreqVolume] = useState(1);
  const [nowPlayingIdx, setNowPlayingIdx] = useState(null);

  async function playFreq(idx) {
    const freq = frequencies[idx];
    setNowPlayingIdx(idx);
    if (freqSound.current) await freqSound.current.unloadAsync();
    const { sound } = await Audio.Sound.createAsync(
      { uri: freq.url },
      { shouldPlay: true, isLooping: true, volume: freqVolume }
    );
    freqSound.current = sound;
    if (videoRef.current) {
      videoRef.current.seek(0);
      videoRef.current.setIsLooping && videoRef.current.setIsLooping(true);
      videoRef.current.playAsync && videoRef.current.playAsync();
    }
    showToast("Lecture : " + freq.label);
  }
  async function stopFreq() {
    setNowPlayingIdx(null);
    if (freqSound.current) await freqSound.current.stopAsync();
    if (videoRef.current && videoRef.current.pauseAsync)
      videoRef.current.pauseAsync();
  }
  async function setFreqVol(val) {
    setFreqVolume(val);
    if (freqSound.current) freqSound.current.setVolumeAsync(val);
  }

  const freq = nowPlayingIdx !== null ? frequencies[nowPlayingIdx] : null;
  return (
    <ScrollView>
      <View style={CARD}>
        <Text style={SUBTITRE}>Fréquences régénérantes</Text>
        {frequencies.map((freq, idx) => (
          <Button
            key={freq.label}
            title={
              nowPlayingIdx === idx ? `[Lecture] ${freq.label}` : freq.label
            }
            onPress={() => playFreq(idx)}
            color={nowPlayingIdx === idx ? "#59d7f8" : undefined}
          />
        ))}
        <Button title="Arrêter" color="#f44" onPress={stopFreq} />
        <Text>Volume</Text>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={freqVolume}
          onValueChange={setFreqVol}
          step={0.01}
          style={{ width: DEVICE_WIDTH * 0.7, height: 40 }}
        />
        {freq && nowPlayingIdx !== null && (
          <Video
            ref={videoRef}
            source={{ uri: freq.video }}
            rate={1.0}
            volume={freqVolume}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={true}
            isLooping={true}
            style={{
              width: DEVICE_WIDTH * 0.9,
              height: 220,
              marginVertical: 16,
              borderRadius: 20,
            }}
          />
        )}
        {nowPlayingIdx !== null && (
          <Text style={{ color: "#6c0", marginTop: 10 }}>
            ⏸ Fréquence : {freq.label}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [favoriteIdxs, setFavoriteIdxs] = useState([]);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#59d7f8",
          tabBarStyle: { backgroundColor: "#252047", borderBottomWidth: 0 },
        }}
      >
        <Tab.Screen name="Sons" component={SoundVideoPlayer} />
        <Tab.Screen name="Fréquences" component={FrequencyScreen} />
        <Tab.Screen name="Favoris">
          {() => <FavoriteSoundsScreen favoriteIdxs={favoriteIdxs} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
