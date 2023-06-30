import React, { useEffect, useState, useContext } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  ImageBackground,
  Platform,
  Vibration,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useIsFocused } from "@react-navigation/native";
import { ScoreContext } from "../context/ScoreContext";
import { imagePaths1 } from "../constants/Images1";
import { imagePaths2 } from "../constants/Images2";
import { imagePaths3 } from "../constants/images3";
import { imagePaths4 } from "../constants/images4";
import {Button, StatusBar} from 'react-native';
import { bandera } from "./Categories";
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "MemoryGame">;
const Separator = () => {
  return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};
const MemoryGame: React.FC = ({ navigation: { navigate } }: Props) => {
  const showToastCorrect = () => {
    ToastAndroid.show('Respuesta correcta!', ToastAndroid.SHORT);
  };
  const showToastIncorrect = () => {
    ToastAndroid.show('Respuesta incorrecta!', ToastAndroid.SHORT);
  };
  const [currentImage, setCurrentImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const isFocused = useIsFocused();
  const { score, setScore } = useContext(ScoreContext);
  const ONE_SECOND_IN_MS = 1000;
  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];
  useEffect(() => {
    if (bandera == 1) {
      setPreviousImage(null);
      const randomImageIndex = Math.floor(Math.random() * imagePaths1.length);
      const randomImagePath = imagePaths1[randomImageIndex];
      setCurrentImage(randomImagePath);

      const timer = setTimeout(() => {
        setCurrentImage(null);
        setPreviousImage(null);
      }, 3000);

      setCurrentImage(randomImagePath);
      const timer1 = setTimeout(() => {
        const newrandomImageIndex = Math.floor(Math.random() * imagePaths1.length);
        const newrandomImagePath = imagePaths1[newrandomImageIndex];
        timer;
        setPreviousImage(randomImagePath);
        setCurrentImage(newrandomImagePath);
      }, 6000);

      return () => clearTimeout(timer1);
    }

    if (bandera == 2) {
      setPreviousImage(null);
      const randomImageIndex = Math.floor(Math.random() * imagePaths2.length);
      const randomImagePath = imagePaths2[randomImageIndex];
      setCurrentImage(randomImagePath);

      const timer = setTimeout(() => {
        setCurrentImage(null);
        setPreviousImage(null);
      }, 3000);

      setCurrentImage(randomImagePath);
      const timer1 = setTimeout(() => {
        const newrandomImageIndex = Math.floor(Math.random() * imagePaths2.length);
        const newrandomImagePath = imagePaths2[newrandomImageIndex];
        timer;
        setPreviousImage(randomImagePath);
        setCurrentImage(newrandomImagePath);
      }, 6000);

      return () => clearTimeout(timer);
    }

    if (bandera == 3) {
      setPreviousImage(null);
      const randomImageIndex = Math.floor(Math.random() * imagePaths3.length);
      const randomImagePath = imagePaths3[randomImageIndex];
      setCurrentImage(randomImagePath);

      const timer = setTimeout(() => {
        setCurrentImage(null);
        setPreviousImage(null);
      }, 3000);

      setCurrentImage(randomImagePath);
      const timer1 = setTimeout(() => {
        const newrandomImageIndex = Math.floor(Math.random() * imagePaths3.length);
        const newrandomImagePath = imagePaths3[newrandomImageIndex];
        timer;
        setPreviousImage(randomImagePath);
        setCurrentImage(newrandomImagePath);
      }, 6000);

      return () => clearTimeout(timer);
    }

    if (bandera == 4) {
      setPreviousImage(null);
      const randomImageIndex = Math.floor(Math.random() * imagePaths4.length);
      const randomImagePath = imagePaths4[randomImageIndex];
      setCurrentImage(randomImagePath);

      const timer = setTimeout(() => {
        setCurrentImage(null);
        setPreviousImage(null);
      }, 3000);

      setCurrentImage(randomImagePath);
      const timer1 = setTimeout(() => {
        const newrandomImageIndex = Math.floor(Math.random() * imagePaths4.length);
        const newrandomImagePath = imagePaths4[newrandomImageIndex];
        timer;
        setPreviousImage(randomImagePath);
        setCurrentImage(newrandomImagePath);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  const handleOptionSelected = (isSameImage: boolean) => {
    if (isSameImage) {
      console.log("Bien es lo correcto");
     // showToastCorrect();
     Vibration.vibrate(0.5 * ONE_SECOND_IN_MS)
      setScore({
        correct: score.correct + 1,
        incorrect: score.incorrect,
      });
    } else {
      console.log("Te equivocaste, no es lo correcto");
     // showToastIncorrect();
     Vibration.vibrate(0.5 * ONE_SECOND_IN_MS)
      setScore({
        correct: score.correct,
        incorrect: score.incorrect + 1,
      });
    }
    navigate("Again");
  };

  const PATTERN_DESC =
    Platform.OS === 'android'
      ? 'wait 1s, vibrate 2s, wait 3s'
      : 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';
  return (
    <SafeAreaView>
      <View>
        {previousImage === null ? (
          <View
            style={{
              paddingHorizontal: Spacing * 4,
              paddingTop: Spacing * 4,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xxLarge,
                color: Colors.primary,
                fontFamily: Fonts["poppins-bold"],
                textAlign: "center",
              }}
            >
              Recuerda esta imagen!
            </Text>
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: Spacing * 4,
              paddingTop: Spacing * 4,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xxLarge,
                color: Colors.primary,
                fontFamily: Fonts["poppins-bold"],
                textAlign: "center",
              }}
            >
              ¿Es la misma imagen?
            </Text>
          </View>
        )}
        <ImageBackground
          style={{
            height: height / 2.5,
            marginTop: Spacing * 4,
          }}
          resizeMode="contain"
          source={currentImage}
        />
        <Text
          style={{
            fontSize: FontSize.large,
            color: Colors.primary,
            fontFamily: Fonts["poppins-bold"],
            textAlign: "center",
          }}
        >
          Puntaje actual: {score.correct}
        </Text>
        {previousImage !== null && (
          <View
            style={{
              paddingHorizontal: Spacing * 2,
              paddingTop: Spacing * 6,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => handleOptionSelected(currentImage === previousImage)}
              style={{
                backgroundColor: Colors.primary,
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
                borderRadius: Spacing,
                shadowColor: Colors.primary,
                shadowOffset: {
                  width: 0,
                  height: Spacing,
                },
                shadowOpacity: 0.3,
                shadowRadius: Spacing,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts["poppins-bold"],
                  color: Colors.onPrimary,
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Es la misma
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleOptionSelected(currentImage !== previousImage)}
              style={{
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
                borderRadius: Spacing,
                shadowOffset: {
                  width: 0,
                  height: Spacing,
                },
                shadowOpacity: 0.3,
                shadowRadius: Spacing,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts["poppins-bold"],
                  color: Colors.text,
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Es diferente
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#888888',
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default MemoryGame;
