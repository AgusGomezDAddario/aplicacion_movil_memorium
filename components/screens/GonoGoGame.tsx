import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import ModalGoNoGo from "./ModalGoNoGo"; // Asegurate que este sea compatible o adaptalo si no
import palabras from "./../Similar/gonogo.json";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { ScoreContext } from "../context/ScoreContext";

type Props = NativeStackScreenProps<RootStackParamList, "GonoGoGame">;

const GonoGoGame: React.FC<Props> = ({ navigation }) => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [facilitationsUsed, setFacilitationsUsed] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [facilitationsLeft, setFacilitationsLeft] = useState<number>(3);
  const [modalVisible, setModalVisible] = useState(false);
  const { score, setScore, updateScore } = useContext(ScoreContext);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    selectRandomWord();
    setStartTime(Date.now());
  }, []);

  const selectRandomWord = () => {
    const keys = Object.keys(palabras);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setCurrentWord(randomKey);
    const optionKeys = Object.keys(palabras[randomKey]);
    setOptions(shuffleArray(optionKeys));
    setFacilitationsLeft(3);
    setAttempts(0);
    setFacilitationsUsed(0);
  };

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handlePress = (key: string) => {
    setAttempts((prev) => prev + 1);

    if (!palabras[currentWord][key]) {
      showIncorrect();
    } else {
      // Agregar logros
      const newAchievements = [...score.achievements];
      const totalCorrect = score.correct + 1;

      if (totalCorrect >= 50 && !newAchievements.includes("50Total"))
        newAchievements.push("50Total");
      if (totalCorrect >= 150 && !newAchievements.includes("150Total"))
        newAchievements.push("150Total");
      if (totalCorrect >= 500 && !newAchievements.includes("500Total"))
        newAchievements.push("500Total");
      if (totalCorrect >= 1000 && !newAchievements.includes("1000Total"))
        newAchievements.push("1000Total");

      switch (score.scoreToday + 1) {
        case 1:
          !newAchievements.includes("1stToday") && newAchievements.push("1stToday");
          break;
        case 10:
          !newAchievements.includes("10thToday") && newAchievements.push("10thToday");
          break;
        case 25:
          !newAchievements.includes("25thToday") && newAchievements.push("25thToday");
          break;
        case 50:
          !newAchievements.includes("50thToday") && newAchievements.push("50thToday");
          break;
      }

      showCorrect();
      handleRoundEnd(newAchievements);
    }
  };

  const handleFacilitate = () => {
    if (facilitationsLeft > 0 && options.length > 2) {
      const incorrectOptions = options.filter(option => !palabras[currentWord][option]);
      if (incorrectOptions.length > 0) {
        const optionToRemove = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
        setOptions(prev => prev.filter(option => option !== optionToRemove));
        setFacilitationsLeft(prev => prev - 1);
        setFacilitationsUsed(prev => prev + 1);
      }
    }
  };

  const handleRoundEnd = (newAchievements: string[]) => {
    const endTime = Date.now();
    const totalTime = Math.floor((endTime - (startTime ?? 0)) / 1000);

    const newEntry = {
      attempts: attempts + 1,
      facilitations: facilitationsUsed,
      time: totalTime,
    };

    const updatedGonoGo = [...score.gonoGo, newEntry];

    setScore(prev => ({
      ...prev,
      correct: prev.correct + 1,
      scoreToday: prev.scoreToday + 1,
      achievements: newAchievements,
      gonoGo: updatedGonoGo
    }));

    updateScore(
      score.correct + 1,
      score.incorrect,
      newAchievements,
      score.scoreToday + 1,
      newEntry.attempts,
      newEntry.facilitations,
      newEntry.time
    );

    setModalVisible(true);
  };

  const showCorrect = () => {
    Platform.OS === "web"
      ? alert("✅ Respuesta correcta!")
      : console.log("Respuesta correcta!"); // Puedes usar un toast móvil si querés
  };

  const showIncorrect = () => {
    Platform.OS === "web"
      ? alert("❌ Respuesta incorrecta. Intenta de nuevo!")
      : console.log("Respuesta incorrecta.");
  };

  return (
    <ScrollView>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: Spacing * 3,
        paddingTop: Spacing * 3,
      }}>
        <Text style={{
          fontSize: FontSize.xLarge,
          color: Colors.primary,
          fontFamily: Fonts["poppins-bold"],
          textAlign: "left",
        }}>
          {currentWord}
        </Text>

        <TouchableOpacity
          style={{
            padding: Spacing,
            backgroundColor: facilitationsLeft > 0 ? Colors.primary : Colors.gray,
            borderRadius: Spacing / 2,
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
          }}
          onPress={handleFacilitate}
          disabled={facilitationsLeft <= 0 || options.length <= 2}
        >
          <Text style={{ color: "white", fontSize: 12 }}>💣</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        marginVertical: Spacing,
        padding: Spacing * 2,
      }}>
        {options.map((key) => (
          <TouchableOpacity
            key={key}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 1.5,
              borderRadius: Spacing,
            }}
            onPress={() => handlePress(key)}
          >
            <Text style={{
              fontFamily: Fonts["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}>
              {key}
            </Text>
          </TouchableOpacity>
        ))}

        <ModalGoNoGo
          isVisible={modalVisible}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default GonoGoGame;
