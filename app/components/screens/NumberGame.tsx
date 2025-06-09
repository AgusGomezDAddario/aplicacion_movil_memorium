import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import AppTextInput from "../AppTextInput";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import Loader from "./Loader";
import { ScoreContext } from "../context/ScoreContext";
import Toast from 'react-native-root-toast';
import DogLoader from "./Loader2";
import NewLoader from "./Loader3";
import ConfettiCannon from "react-native-confetti-cannon";
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "NumberGame">;
const NumberGame: React.FC<Props> = ({ route, navigation: { navigate } }: Props) => {

  const {
    digitDisplayTime = 1000, // valor por defecto de 1000ms
    distractorTime = 2000,    // valor por defecto de 2000ms
    numberOfDigits = 3        // valor por defecto de 3 dígitos
  } = route.params || {};

  // Variables configurables
  const digitDisplay= digitDisplayTime; // Tiempo de visualización de cada dígito (en milisegundos)
  const distractor= distractorTime; // Tiempo del distractor (en milisegundos)
  const numberDigits = numberOfDigits; // Número de dígitos a mostrar

  const [number, setNumber] = useState(0);
  let arregloNumeros: number[] = [];
  const [miArreglo, setMiArreglo] = useState([]);
  const [number2, setNumber2] = useState<Number>(0);
  const [contadorFalldios, setContadorFallidos] = useState(0);
  const [loader, setLoader] = useState(false);
  const [ultimo, setUltimo] = useState(false);
  const [finalNumber, setFinalNumber] = useState(0);
  const [resultado, setResultado] = useState(false);
  const [valor, setValor] = useState(0);
  const [shoot, setShoot] = useState(false);
  const { score, updateScore, setScore, setCurrentScore, updateNumeriumScore } = useContext(ScoreContext)

  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    setStartTime(Date.now()); // Iniciamos el temporizador
    let randomNumber = Math.floor(Math.random() * 10);
    setNumber(randomNumber);
    arregloNumeros.push(randomNumber);
  
    for (let i = 1; i < numberOfDigits; i++) {
  
      setTimeout(() => {
        setLoader(true);
        randomNumber = Math.floor(Math.random() * 10);
        setNumber(randomNumber);
        arregloNumeros.push(randomNumber);
      }, i * digitDisplayTime + distractorTime * (i - 1));
  
      setTimeout(() => {
        setLoader(false);
      }, i * digitDisplayTime + distractorTime * i);
    }
  
    const finalTimeout = setTimeout(() => {
      setUltimo(true);
      setMiArreglo([...arregloNumeros]);
      console.log(arregloNumeros);
    }, (numberOfDigits - 1) * (digitDisplayTime + distractorTime) + digitDisplayTime); // Corrigiendo el último dígito
  
    return () => {
      clearTimeout(finalTimeout);
    };
  }, [valor, digitDisplayTime, distractorTime, numberOfDigits]);

  const handleInputChange = (text) => {
    setNumber2(parseInt(text));
  };

  const showToastCorrect = () => {
    try{
      Toast.show('Respuesta correcta!', {
        duration: Toast.durations.LONG,
        animation: true,
        backgroundColor: Colors.primary,
        textColor: Colors.onPrimary,
        hideOnPress: true,
        shadow: true,
      });
    }
    catch(error){
      console.log(error)
    }
  }

  const showToastInCorrect = () => {
    try{
      Toast.show('Respuesta incorrecta, Vuelve a intentarlo!', {
        duration: Toast.durations.LONG,
        animation: true,
        backgroundColor: Colors.primary,
        textColor: Colors.onPrimary,
        hideOnPress: true,
        shadow: true,
      });
    }
    catch(error){
      console.log(error)
    }
  }

  const handleProbar = () => {
    const concatenatedNumber = miArreglo.map(String).join("");
    if (number2 === parseInt(concatenatedNumber, 10)) {
      setResultado(true);
      const endTime = Date.now();
      const totalTime = Math.floor((endTime - (startTime ?? 0)) / 1000);
      updateNumeriumScore(numberOfDigits, totalTime, contadorFalldios+1, digitDisplayTime, distractorTime);

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

      setShoot(true); // Enciende el cañón
      setTimeout(() => {
        setShoot(false); // Apaga el cañón después de un tiempo (opcional)
      }, 5000); 

      showToastCorrect();
      setScore(prevScore => ({
        ...prevScore,
        correct: score.correct + 1,
        scoreToday: score.scoreToday + 1,
        incorrect: score.incorrect,
      }));
      setCurrentScore(prevArray => {
        return [...prevArray, prevArray[prevArray.length - 1] + 1];
      });
    } else {
      setResultado(false);
      showToastInCorrect();
      setScore(prevScore => ({
        ...prevScore,
        correct: score.correct,
        incorrect: score.incorrect + 1,
      }));
      setContadorFallidos(contadorFalldios + 1)
    }
    console.log("actualice")
  };

  const reiniciarComponente = () => {
    setNumber(0);
    setMiArreglo([]);
    setNumber2(0);
    setContadorFallidos(0);
    setLoader(false);
    setUltimo(false);
    setFinalNumber(0);
    setResultado(false);
    setValor(valor+1);
    setStartTime(Date.now());
  };

  function NumberDisplay({ numbers }) {
    const concatenatedNumber = miArreglo.map(String).join("");
    const finalNumber = parseInt(concatenatedNumber, 10);

    return (
      <View>
        {resultado && (
        <Text style={{
          fontSize: FontSize.xxLarge,
          color: Colors.primary,
          fontFamily: Fonts["Roboto-Bold"],
          textAlign: "center",
          marginTop: Spacing * 4,
        }}>
          El número era: {finalNumber}
        </Text>)}
      </View>
    );
  }

  function JugarDenuevo() {
    updateScore(score.correct, score.incorrect, score.achievements, score.scoreToday, null, null);
    return(
      <View
        style={{
          marginTop: Spacing*-2,
        }}>
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                reiniciarComponente();
              }}
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
                  fontFamily: Fonts["Roboto-Bold"],
                  color: Colors.onPrimary,
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Juegar de Nuevo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigate("Main");
              }}
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
                justifyContent: "center", 
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts["Roboto-Bold"],
                  color: Colors.text,
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Salir
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
      <View
        style={{
          position: "absolute",
          height: "100%",
          top: 0,
          left: 0,
        }}
        >
          {shoot && (
            <ConfettiCannon
              count={200}
              origin={{ x:width/2, y: 0 }}
              explosionSpeed={1000}
              fallSpeed={2000}
              fadeOut={true}
            />
          )}
        </View>
        {
          loader === true ? (<View>
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
                  fontFamily: Fonts["Roboto-Bold"],
                  textAlign: "center",
                }}
              >
                No te olvides el número!
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: Spacing * 4,
                paddingTop: Spacing * 5,
              }}>
              <NewLoader/>
            </View>
          </View>
          ) :
            (
              <View>
                {ultimo === false ? (
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
                        fontFamily: Fonts["Roboto-Bold"],
                        textAlign: "center",
                      }}
                    >
                      Recuerda este Número!
                    </Text>
                    <View
                      style={{
                        paddingHorizontal: Spacing * 4,
                        paddingTop: Spacing,
                      }}>
                      <Text
                        style={{
                          color: Colors.primary,
                          fontSize: FontSize.xxLarge*5,
                          marginTop: Spacing * 4,
                          alignSelf: "center",
                        }}
                      >
                        {number}
                      </Text>
                    </View>
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
                        fontFamily: Fonts["Roboto-Bold"],
                        textAlign: "center",
                      }}
                    >
                      ¿Cual es el número?
                    </Text>
                    <NumberDisplay numbers={arregloNumeros} />
                    <View
                      style={{
                        marginVertical: Spacing * 3,
                        alignSelf: "center", 
                        width: "70%",
                      }}
                    >
                      {!resultado && (
                      <AppTextInput
                        editable={!resultado}
                        placeholder="Numero"
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange(text)}
                      />)}
                      <TouchableOpacity 
                        onPress={handleProbar}
                        disabled={resultado}
                        style={{
                          padding: Spacing * 2,
                          backgroundColor: resultado ? Colors.second_gray : Colors.primary,
                          marginVertical: Spacing * 3,
                          borderRadius: Spacing,
                          shadowColor: resultado ? Colors.gray : Colors.primary,
                          shadowOffset: {
                            width: 0,
                            height: Spacing,
                          },
                          shadowOpacity: 0.3,
                          shadowRadius: Spacing,
                          alignSelf: "center", 
                          width: "70%",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Fonts["poppins-bold"],
                            color: Colors.onPrimary,
                            textAlign: "center",
                            fontSize: FontSize.large,
                          }}
                        >
                          Probar
                        </Text>
                      </TouchableOpacity>
                      {contadorFalldios > 4 &&(
                        <TouchableOpacity 
                        onPress={reiniciarComponente}
                        disabled={resultado}
                        style={{
                          padding: Spacing * 2,
                          backgroundColor: resultado ? Colors.second_gray : Colors.primary,
                          marginVertical: Spacing * 2,
                          borderRadius: Spacing,
                          shadowColor: resultado ? Colors.gray : Colors.primary,
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
                            textAlign: "center",
                            fontSize: FontSize.large,
                          }}
                        >
                          Probar con otro número
                        </Text>
                      </TouchableOpacity>
                      )}
                    </View>
                    {resultado && (
                      <JugarDenuevo />)}
                  </View>
                )}
              </View>
            )}
      </View>
    </ScrollView>
  );
};


export default NumberGame;