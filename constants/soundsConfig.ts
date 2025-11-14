import { SoundConfig } from "@/types/soundsConfig";

export const soundsConfig: SoundConfig[] = [
  {
    id: "vent-leger",
    title: "Vent léger",
    type: "sound",
    audio: require("../media/audio/vent-leger.mp3"),
    video: require("../media/video/vent-leger.mp4"),
  },
  {
    id: "vague-de-locean",
    title: "Vague de l'océan",
    type: "sound",
    audio: require("../media/audio/vague-de-locean.mp3"),
    video: require("../media/video/vague-de-locean.mp4"),
  },
  {
    id: "riviere-calme",
    title: "Rivière calme",
    type: "sound",
    audio: require("../media/audio/riviere-calme.mp3"),
    video: require("../media/video/riviere-calme.mp4"),
  },
  {
    id: "pluie-douce",
    title: "Pluie douce",
    type: "sound",
    audio: require("../media/audio/pluie-douce.mp3"),
    video: require("../media/video/pluie-douce.mp4"),
  },
  {
    id: "orage-apaisant",
    title: "Orage apaisant",
    type: "sound",
    audio: require("../media/audio/orage-apaisant.mp3"),
    video: require("../media/video/orage-apaisant.mp4"),
  },
  {
    id: "foret-paisible",
    title: "Forêt paisible",
    type: "sound",
    audio: require("../media/audio/foret-paisible.mp3"),
    video: require("../media/video/foret-paisible.mp4"),
  },
  {
    id: "feu-de-camp",
    title: "Feu de camp",
    type: "sound",
    audio: require("../media/audio/feu-de-camp.mp3"),
    video: require("../media/video/feu-de-camp.mp4"),
  },
  {
    id: "bruit-blanc",
    title: "Bruit blanc",
    type: "sound",
    audio: require("../media/audio/bruit-blanc.mp3"),
    video: require("../media/video/bruit-blanc.mp4"),
  },
  {
    id: "4-7hz-with-417hz-639hz",
    title: "4–7 Hz – Avec 417 & 639 Hz",
    type: "frequency",
    audio: require("../media/frequency/4-7hz-with-417hz-639hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  },
  {
    id: "8-to-12-hz",
    title: "8–12 Hz",
    type: "frequency",
    audio: require("../media/frequency/8-to-12-hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  },
  {
    id: "10hz",
    title: "10 Hz",
    type: "frequency",
    audio: require("../media/frequency/10hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  },
  {
    id: "33hz",
    title: "33 Hz",
    type: "frequency",
    audio: require("../media/frequency/33hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  },
  {
    id: "66hz",
    title: "66 Hz",
    type: "frequency",
    audio: require("../media/frequency/66hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  },
  {
    id: "396-hz-417-hz-639hz",
    title: "396 Hz – 417 Hz – 639 Hz",
    type: "frequency",
    audio: require("../media/frequency/396-hz-417-hz-639hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  },
  {
    id: "417hz",
    title: "417 Hz",
    type: "frequency",
    audio: require("../media/frequency/417hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  },
  {
    id: "852hz",
    title: "852 Hz",
    type: "frequency",
    audio: require("../media/frequency/852hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  },
  {
    id: "1441hz",
    title: "1441 Hz",
    type: "frequency",
    audio: require("../media/frequency/1441hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  },
  {
    id: "2772hz",
    title: "2772 Hz",
    type: "frequency",
    audio: require("../media/frequency/2772hz.mp3"),
    video: require("../media/video/frequence.mp4"),
  }
];

export const sounds = soundsConfig;

export type SoundEntry = SoundConfig;
