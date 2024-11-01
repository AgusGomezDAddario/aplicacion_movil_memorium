import { Audio } from "expo-av";
import { TouchableOpacity, View } from "react-native";
import Spacing from "../constants/Spacing";
import React, { useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

export const SoundComponent: React.FC<{ juego: string }> = ({ juego }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const playPauseSound = async () => {
    if (soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } else {
      let sound;
      switch (juego) {
        case "memory_game":
          sound = require("../../assets/audio/memory_game_intro.mp3");
          break;
        case "numerium":
          sound = require("../../assets/audio/numerium_intro.mp3");
          break;
        case "go_no_go":
          sound = require("../../assets/audio/contrarium_intro.mp3");
          break;
        case "orderium":
          sound = require("../../assets/audio/orderium_intro.mp3");
          break;
        case "abecedarium":
          sound = require("../../assets/audio/abecedarium_intro.mp3");
          break;
        case "informacion_memory_game":
          sound = require("../../assets/audio/memory_game_conozca.mp3");
          break;
        case "informacion_numerium":
          sound = require("../../assets/audio/numerium_conozca.mp3");
          break;
        case "informacion_go_no_go":
          sound = require("../../assets/audio/contrarium_conozca.mp3");
          break;
        case "informacion_orderium":
          sound = require("../../assets/audio/orderium_conozca.mp3");
          break;
        case "informacion_abecedarium":
          sound = require("../../assets/audio/abecedarium_conozca.mp3");
          break;
        default:
          throw new Error("Juego no soportado");
      }

      const { sound: loadedSound } = await Audio.Sound.createAsync(sound);
      soundRef.current = loadedSound;
      await loadedSound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Spacing * 2.5,
      }}
    >
      <TouchableOpacity onPress={playPauseSound}>
        <AntDesign name="sound" size={50} color="blue" />
      </TouchableOpacity>
    </View>
  );
};