import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import Toast from 'react-native-root-toast';
import ModalGoNoGo from "./ModalGoNoGo";
import palabras from "./../Similar/gonogo.json";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { ScoreContext } from "../context/ScoreContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = NativeStackScreenProps<RootStackParamList, "GonoGoGame">;

const { height, width } = Dimensions.get("window");

const GonoGoGame: React.FC<Props> = ({ navigation }) => {

  const [currentWord, setCurrentWord] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [facilitationsUsed, setFacilitationsUsed] = useState<number>(0); // Facilitaciones usadas en la ronda actual
  const [attempts, setAttempts] = useState<number>(0); // Intentos en la ronda actual
  const [facilitationsLeft, setFacilitationsLeft] = useState<number>(3); // Permite usar hasta 3 veces
  const [modalVisible, setModalVisible] = useState(false);
  const { score, setScore, updateScore } = useContext(ScoreContext);

  useEffect(() => {
    selectRandomWord();
  }, []);

  const selectRandomWord = () => {
    const keys = Object.keys(palabras);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setCurrentWord(randomKey);
    const optionKeys = Object.keys(palabras[randomKey]);
    setOptions(shuffleArray(optionKeys));
    setFacilitationsLeft(3); // Resetear el contador de facilitaciones
    setAttempts(0); // Resetear intentos de la ronda actual
    setFacilitationsUsed(0); // Resetear facilitaciones usadas
  };

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handlePress = (key: string) => {
    setAttempts(attempts + 1); // Incrementar intentos en la ronda actual

    if (!palabras[currentWord][key]) {
      showToastInCorrect();
    } else {

      if (score.correct + 1 >= 50) {
        if (score.achievements.indexOf("50Total") === -1) {
          score.achievements.push("50Total");
        }
        if (score.correct + 1 >= 150){
          if (score.achievements.indexOf("150Total") === -1) {
            score.achievements.push("150Total");
          }
          if (score.correct + 1 >= 500){
            if (score.achievements.indexOf("500Total") === -1) {
              score.achievements.push("500Total");
            }
            if (score.correct + 1 >= 1000){
              if (score.achievements.indexOf("1000Total") === -1) {
                score.achievements.push("1000Total");
              }
            }
          }
        }
      }

      switch (score.scoreToday + 1) {
        case 1:
          if (score.achievements.indexOf("1stToday") === -1) {
            score.achievements.push("1stToday");
          }
          break;
        case 10:
          if (score.achievements.indexOf("10thToday") === -1) {
            score.achievements.push("10thToday");
          }
          break;
        case 25:
          if (score.achievements.indexOf("25thToday") === -1) {
            score.achievements.push("25thToday");
          }
          break;
        case 50:
          if (score.achievements.indexOf("50thToday") === -1) {
            score.achievements.push("50thToday");
          }
          break;
        default:
          break;
      }
      showToastCorrect();
      handleRoundEnd(); // Terminar la ronda y almacenar los datos
    }
  };

  const handleFacilitate = () => {
    if (facilitationsLeft > 0 && options.length > 2) {
      const incorrectOptions = options.filter(option => !palabras[currentWord][option]);
      if (incorrectOptions.length > 0) {
        const optionToRemove = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
        setOptions(options.filter(option => option !== optionToRemove));
        setFacilitationsLeft(facilitationsLeft - 1);
        setFacilitationsUsed(facilitationsUsed + 1); // Incrementar facilitaciones usadas en la ronda actual
      }
    }
  };

  const handleRoundEnd = () => {
    // Agregar la entrada de intentos y facilitaciones al array de gonoGo
    const newGonoGoEntry = {
      attempts: attempts + 1, // Total de intentos
      facilitations: facilitationsUsed, // Total de facilitaciones usadas
    };

    const updatedGonoGo = [...score.gonoGo, newGonoGoEntry]; // Agregar la nueva entrada al array

    setScore(prevScore => ({
      ...prevScore,
      correct: score.correct + 1,
      scoreToday: score.scoreToday+1,
      gonoGo: updatedGonoGo // Actualizar el array en el estado
    }));

    // También actualizar en Firebase (si es necesario en este punto)
    updateScore(score.correct + 1, score.incorrect, score.achievements, score.scoreToday+1, newGonoGoEntry.attempts, newGonoGoEntry.facilitations);

    handleModalVisible();
  };

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const showToastCorrect = () => {
    Toast.show('Respuesta correcta!', {
      duration: Toast.durations.LONG,
      animation: true,
      backgroundColor: Colors.primary,
      textColor: Colors.onPrimary,
      hideOnPress: true,
      shadow: true,
    });
  };

  const showToastInCorrect = () => {
    Toast.show('Respuesta incorrecta, Vuelve a intentarlo!', {
      duration: Toast.durations.LONG,
      animation: true,
      backgroundColor: Colors.primary,
      textColor: Colors.onPrimary,
      hideOnPress: true,
      shadow: true,
    });
  };

  return (
    <ScrollView>
      <View style={{
        flexDirection: "row", // Colocar la palabra y el botón en la misma fila
        justifyContent: "space-between", // Separar la palabra y el botón
        alignItems: "center", // Alinear verticalmente en el centro
        marginHorizontal: Spacing * 3,
        paddingTop: Spacing * 3,
      }}>
        <Text
          style={{
            fontSize: FontSize.xLarge,
            color: Colors.primary,
            fontFamily: Fonts["poppins-bold"],
            textAlign: "left",
            
          }}>
          {currentWord}
        </Text>
        <TouchableOpacity
          style={{
            padding: Spacing * 1, // Reducir el tamaño del botón
            backgroundColor: facilitationsLeft > 1 ? Colors.primary : Colors.gray,
            borderRadius: Spacing / 2, // Botón más redondeado
            justifyContent: "center",
            alignItems: "center",
            width: 40, // Hacer el botón más angosto
            height: 40,
          }}
          onPress={handleFacilitate}
          disabled={facilitationsLeft <= 0 || options.length <= 2}
        >
          <FontAwesome name="bomb" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: Spacing,
          padding: Spacing * 2,
        }}>
        {options.map((key) => (
          <TouchableOpacity
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 1.5,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
            key={key}
            onPress={() => handlePress(key)}
          >
            <Text
              style={{
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
