import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Linking,
  Image,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { Octicons } from "@expo/vector-icons";
import { SoundComponent } from "../logic/audioInstructions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "InformationJuego5">;
const InformationScreen: React.FC<Props> = ({
  navigation: { navigate },
}: Props) => {
  return (
    <ScrollView>
      <View>
        <Text
          style={{
            fontSize: FontSize.xLarge,
            color: Colors.background,
            fontFamily: Fonts["poppins-bold"],
            textAlign: "center",
            paddingTop: Spacing * 2,
            paddingBottom: Spacing * 2,
            backgroundColor: Colors.active,
          }}
        >
          Conozca Abecedarium
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontFamily: Fonts["poppins-bold"],
            color: Colors.primary,
            borderRadius: Spacing,
            textAlign: "center",
            padding: Spacing * 2,
            marginLeft: Spacing * 1.5,
            marginRight: Spacing * 1.5,
          }}
        >
          Este juego está diseñado para mejorar su agilidad mental y memoria
          secuencial. Al completar la siguiente letra de cada casilla en una
          palabra, entrena su capacidad para procesar y recordar secuencias
          alfabéticas.
        </Text>

        <View
          style={{
            paddingBottom: Spacing * 2,
          }}
        >
          <SoundComponent juego={"informacion_abecedarium"} />
        </View>

        <Text
          style={{
            fontSize: 18,
            fontFamily: Fonts["poppins-bold"],
            color: Colors.primary,
            borderRadius: Spacing,
            textAlign: "center",
            padding: Spacing * 2,
            marginLeft: Spacing * 1.5,
            marginRight: Spacing * 1.5,
          }}
        >
          Esta habilidad fortalece su precisión y rapidez en tareas lingüísticas
          y fomenta una mayor fluidez mental, beneficiando la concentración y la
          habilidad de responder rápidamente en actividades de lógica y
          lenguaje.
        </Text>
      </View>
    </ScrollView>
  );
};

export default InformationScreen;
