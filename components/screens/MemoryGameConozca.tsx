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

type Props = NativeStackScreenProps<RootStackParamList, "InformationJuego1">;
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
          Conozca Memory Game
        </Text>

        <Image
          source={require("../../assets/images/log-PhotoRoom.png-PhotoRoom.png")}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />

        <Text
          style={{
            fontSize: 18,
            backgroundColor: Colors.primary,
            fontFamily: Fonts["Roboto-Bold"],
            color: Colors.onPrimary,
            borderRadius: Spacing,
            textAlign: "center",
            padding: Spacing * 2,
            marginLeft: Spacing * 1.5,
            marginRight: Spacing * 1.5,
          }}
        >
          Este juego está diseñado para fortalecer su memoria visual a corto
          plazo. Al comparar imágenes, usted ejercita la capacidad de su cerebro
          para retener y procesar información visual.
        </Text>
        
        <View
            style={{
                paddingBottom: Spacing * 2,
            }}
        >
        <SoundComponent juego={"informacion_memory_game"}/>
        </View>

        <Text
          style={{
            fontSize: 18,
            backgroundColor: Colors.primary,
            fontFamily: Fonts["Roboto-Bold"],
            color: Colors.onPrimary,
            borderRadius: Spacing,
            textAlign: "center",
            padding: Spacing * 2,
            marginLeft: Spacing * 1.5,
            marginRight: Spacing * 1.5,
          }}
        >
          Esto puede mejorar su
          habilidad para recordar detalles visuales en la vida cotidiana, como
          dónde dejó sus llaves o reconocer caras. Además, este ejercicio
          estimula áreas del cerebro relacionadas con la atención y la
          concentración, beneficiando su agudeza mental general
        </Text>
        </View>
    </ScrollView>
  );
};

export default InformationScreen;
