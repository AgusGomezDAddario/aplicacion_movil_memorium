import React, { useContext, useEffect, useState } from "react";
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
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { LoginContext } from "../context/LoginContext";
import { ScoreContext } from "../context/ScoreContext";
import Carru from "./Carru";
import { ScrollView } from "react-native-gesture-handler";
import { confetti } from "./MemoryGame";
import ConfettiCannon from "react-native-confetti-cannon";

const { height } = Dimensions.get("window");

const { width } = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Again">;

const Again: React.FC<Props> = ({ navigation: { navigate }, route }) =>{
  const { logout, user } = useContext(LoginContext);
  const { score, updateScore, updateMemoryGameScore } = useContext(ScoreContext)
  const { param1, param2 } = route.params;

  const [shoot, setShoot] = useState(false);
  
  useEffect(() => {
    // Disparar el cañón cuando la variable sea true
    if (confetti) {
      setShoot(true); // Enciende el cañón
      setTimeout(() => {
        setShoot(false); // Apaga el cañón después de un tiempo (opcional)
      }, 5000); // El cañón se apaga después de 5 segundos (ajusta este valor según tus necesidades)
    }
  }, [confetti]); // Ejecutar el efecto cada vez que la variable cambie

  return (
    <ScrollView style={{backgroundColor:"white"}}>
      <View>
        <Carru param1={param1} param2={param2} />
      </View>
      <View >
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
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 4,
          }}
        >
          <Text
            style={{
              marginTop: Spacing*-4,
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              fontFamily: Fonts["Roboto-Bold"],
              textAlign: "center",
            }}
          >
            Deseas probar de nuevo?
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 4,
            flexDirection: "row",
            justifyContent: "space-between", // Agrega esta línea
          }}
        >
          {/* Botón "Si" */}
          <TouchableOpacity
            onPress={() => navigate("MemoryGame")}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "35%",
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
              Si
            </Text>
          </TouchableOpacity>

          {/* Botón "No" */}
          <TouchableOpacity
            onPress={() =>{ 
              updateScore(score.correct, score.incorrect, score.achievements, score.scoreToday, null, null)
              navigate("Main");}}
            style={{
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "35%",
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
                fontFamily: Fonts["Roboto-Bold"],
                color: Colors.text,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Again;
