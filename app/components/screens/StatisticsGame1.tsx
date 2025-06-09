import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { ScoreContext } from "../context/ScoreContext";
import {
  LineChart,
} from "react-native-chart-kit";


type Props = NativeStackScreenProps<RootStackParamList, "EstadisticasJuego1">;
const EstadisticasJuego1Screen: React.FC<Props> = ({ navigation: { navigate } }: Props) => {

  const { score, currentScore, setCurrentScore } = useContext(ScoreContext);

  const labels = score.correctAnswers ? Array.from({ length: score.correctAnswers.length }, (_, i) => (i + 1).toString()) : [];

  return (
    <View>
      <Text
        style={{
          fontFamily: Fonts["Roboto-Bold"],
          fontSize: FontSize.large,
          textAlign: "center",
          margin: Spacing * 2,
          marginBottom: 0,
        }}
      >
        Tus aciertos!
      </Text>
        <View
          style={{
            alignContent: "center",
          }}
        >
          <LineChart
            data={{
              labels: [],
              datasets: [
                {
                  data: currentScore,
                }
              ]
            }}
            width={Dimensions.get("window").width - Spacing * 2} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#1F41BB",
              backgroundGradientFrom: "#1F41BB",
              backgroundGradientTo: "#1F41BB",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              marginBottom: 8,
              borderRadius: 16,
              padding: Spacing * 2,

            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigate("Main");
            setCurrentScore([0]);}}
          style={{
            backgroundColor: Colors.primary,
            margin: Spacing * 2,
            paddingVertical: Spacing * 1.5,
            paddingHorizontal: Spacing * 2,
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
            Volver al Menu Principal
          </Text>
        </TouchableOpacity>
    </View>
  );
};


export default EstadisticasJuego1Screen;