import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ScoreContext } from "./../context/ScoreContext";
import Toast from "react-native-root-toast";
import wordsData from "./../Similar/wordsData.json";
import ModalAbecedarium from "./ModalAbecedarium";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import Colors from "./../constants/Color";
import { showErrorCSS } from "react-native-svg/lib/typescript/deprecated";
import FontSize from "../constants/FontSize";

type Props = NativeStackScreenProps<RootStackParamList, "AbecedarioGame">;

const { height, width } = Dimensions.get("window");

const AbecedarioGame: React.FC<Props> = ({ navigation }) => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [userInput, setUserInput] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [errorsPerLetter, setErrorsPerLetter] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const { updateAbecedariumScore, setScore, score, updateScore } =
    useContext(ScoreContext);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const randomWord =
      wordsData.words[Math.floor(Math.random() * wordsData.words.length)].word;
    setCurrentWord(randomWord);
    setUserInput(Array(randomWord.length).fill(""));
    setFeedback(Array(randomWord.length).fill(""));
    setErrorsPerLetter(Array(randomWord.length).fill(0)); // Inicializamos los errores por letra
    setAttempts(0); // Reiniciamos los intentos
    setStartTime(Date.now()); // Iniciamos el temporizador
  };

  const getNextLetter = (letter: string): string => {
    const nextCharCode = letter.charCodeAt(0) + 1;
    return nextCharCode > 90 ? "A" : String.fromCharCode(nextCharCode);
  };

  const checkAnswer = () => {
    const correctAnswer = currentWord.split("").map(getNextLetter);
    const feedbackArray = userInput.map((input, index) =>
      input.toUpperCase() === correctAnswer[index] ? "✅" : "❌"
    );
    setFeedback(feedbackArray);

    // Incrementar errores por letra donde sea incorrecta
    const updatedErrors = [...errorsPerLetter];
    feedbackArray.forEach((fb, index) => {
      if (fb === "❌") updatedErrors[index]++;
    });
    setErrorsPerLetter(updatedErrors);

    setAttempts((prevAttempts) => prevAttempts + 1); // Incrementar intentos

    if (feedbackArray.every((fb) => fb === "✅")) {
      handleModalVisible();
      const endTime = Date.now();
      const totalTime = Math.floor((endTime - (startTime ?? 0)) / 1000); // Tiempo total en segundos

      if (score.correct + 1 >= 50) {
        if (score.achievements.indexOf("50Total") === -1) {
          score.achievements.push("50Total");
        }
        if (score.correct + 1 >= 150) {
          if (score.achievements.indexOf("150Total") === -1) {
            score.achievements.push("150Total");
          }
          if (score.correct + 1 >= 500) {
            if (score.achievements.indexOf("500Total") === -1) {
              score.achievements.push("500Total");
            }
            if (score.correct + 1 >= 1000) {
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

      setScore((prevScore) => ({
        ...prevScore,
        correct: score.correct + 1,
        scoreToday: score.scoreToday + 1, // Actualizar el array en el estado
      }));

      updateAbecedariumScore(
        currentWord,
        totalTime,
        attempts + 1,
        errorsPerLetter
      );
      updateScore(
        score.correct + 1,
        score.incorrect,
        score.achievements,
        score.scoreToday + 1,
        null,
        null
      );
      showToastCorrect();
    } else {
      Alert.alert("Inténtalo de nuevo", "Algunas letras no son correctas.");
      showToastInCorrect();
    }
  };

  const handleInputChange = (text: string, index: number) => {
    const newUserInput = [...userInput];
    newUserInput[index] = text.toUpperCase();
    setUserInput(newUserInput);

    // Mover el foco al siguiente input automáticamente
    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const showToastCorrect = () => {
    Toast.show("¡Respuesta correcta!", {
      duration: Toast.durations.LONG,
      animation: true,
      backgroundColor: Colors.primary,
      textColor: Colors.onPrimary,
      hideOnPress: true,
      shadow: true,
    });
  };

  const showToastInCorrect = () => {
    Toast.show("Respuesta incorrecta, vuelve a intentarlo!", {
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
      <View style={styles.container}>
        <Text style={styles.title}>Abecedarium</Text>
        <Text style={styles.word}>Palabra: {currentWord}</Text>

        <ScrollView
          horizontal
          contentContainerStyle={styles.inputScrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.inputContainer}>
            {currentWord.split("").map((letter, index) => (
              <View key={index} style={styles.inputBox}>
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.input}
                  maxLength={1}
                  value={userInput[index]}
                  onChangeText={(text) => handleInputChange(text, index)}
                />
                <Text style={styles.feedback}>{feedback[index]}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* <TouchableOpacity style={styles.button} onPress={checkAnswer}>
    <Text style={styles.buttonText}>Comprobar</Text>
  </TouchableOpacity> */}

        <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
          <Text style={styles.submitButtonText}>Comprobar</Text>
        </TouchableOpacity>
      </View>

      <View>
        <ModalAbecedarium
          isVisible={modalVisible}
          navigation={navigation}
          onPlayAgain={() => {
            setModalVisible(false);
            loadNewWord(); // Ejecutar cuando el modal se cierra
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 20,
    letterSpacing: 1.2,
  },
  word: {
    fontSize: 20,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 30,
    justifyContent: "center",
  },
  inputBox: {
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 5,
  },
  input: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  inputScrollContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },

  feedback: {
    marginTop: 8,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
},
submitButtonText: {
    color: Colors.onPrimary,
    fontSize: FontSize.medium,
    textAlign: "center",
},
});

export default AbecedarioGame;
