import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  TextInput,
  StyleSheet,
  Dimensions
} from "react-native";
import Toast from 'react-native-root-toast';
import wordsData from './../Similar/wordsData.json';

const { height, width } = Dimensions.get("window");

const AbecedarioGame: React.FC = () => {
    const [currentWord, setCurrentWord] = useState<string>('');
    const [userInput, setUserInput] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<string[]>([]);
    const [attempts, setAttempts] = useState<number>(0);
    const [errorsPerLetter, setErrorsPerLetter] = useState<number[]>([]);
    const [startTime, setStartTime] = useState<number | null>(null);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
      loadNewWord();
    }, []);

    const loadNewWord = () => {
      const randomWord = wordsData.words[Math.floor(Math.random() * wordsData.words.length)].word;
      setCurrentWord(randomWord);
      setUserInput(Array(randomWord.length).fill(''));
      setFeedback(Array(randomWord.length).fill(''));
      setErrorsPerLetter(Array(randomWord.length).fill(0)); // Inicializamos los errores por letra
      setAttempts(0); // Reiniciamos los intentos
      setStartTime(Date.now()); // Iniciamos el temporizador
    };

    const getNextLetter = (letter: string): string => {
      const nextCharCode = letter.charCodeAt(0) + 1;
      return nextCharCode > 90 ? 'A' : String.fromCharCode(nextCharCode);
    };

    const checkAnswer = () => {
      const correctAnswer = currentWord.split('').map(getNextLetter);
      const feedbackArray = userInput.map((input, index) =>
        input.toUpperCase() === correctAnswer[index] ? '✅' : '❌'
      );
      setFeedback(feedbackArray);

      // Incrementar errores por letra donde sea incorrecta
      const updatedErrors = [...errorsPerLetter];
      feedbackArray.forEach((fb, index) => {
        if (fb === '❌') updatedErrors[index]++;
      });
      setErrorsPerLetter(updatedErrors);

      setAttempts(prevAttempts => prevAttempts + 1); // Incrementar intentos

      if (feedbackArray.every(fb => fb === '✅')) {
        const endTime = Date.now();
        const totalTime = Math.floor((endTime - (startTime ?? 0)) / 1000); // Tiempo total en segundos
        Alert.alert(
          '¡Correcto!',
          `Has completado la palabra.\nTiempo: ${totalTime} segundos\nIntentos: ${attempts + 1}\nErrores por letra: ${JSON.stringify(errorsPerLetter)}`
        );
        loadNewWord(); // Cargar nueva palabra para jugar de nuevo
      } else {
        Alert.alert('Inténtalo de nuevo', 'Algunas letras no son correctas.');
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
      {currentWord.split('').map((letter, index) => (
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

  <TouchableOpacity style={styles.button} onPress={checkAnswer}>
    <Text style={styles.buttonText}>Comprobar</Text>
  </TouchableOpacity>
</View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 20,
    letterSpacing: 1.2,
  },
  word: {
    fontSize: 20,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
  },
  inputBox: {
    alignItems: 'center',
    marginHorizontal: 8,
    paddingVertical: 5,
  },
  input: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  inputScrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
 
  feedback: {
    marginTop: 8,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AbecedarioGame;
