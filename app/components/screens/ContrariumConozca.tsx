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
import { SoundComponent } from "../logic/audioInstructions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";

type Props = NativeStackScreenProps<RootStackParamList, "InformationJuego3">;
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
          Conozca Contrarium
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
          Este juego trabaja su memoria semántica y su control inhibitorio. Al
          buscar antónimos, usted ejercita su capacidad para acceder y manipular
          su conocimiento del lenguaje, fortaleciendo las conexiones en áreas
          del cerebro relacionadas con el procesamiento del lenguaje.
        </Text>

        <View
          style={{
            paddingBottom: Spacing * 2,
          }}
        >
          <SoundComponent juego={"informacion_go_no_go"} />
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
          Además, al tener que inhibir respuestas incorrectas, usted mejora su
          control cognitivo. Esto puede ayudarle a mejorar su vocabulario, su
          capacidad de expresión y su habilidad para tomar decisiones rápidas y
          precisas en situaciones que requieren discernimiento.
        </Text>
      </View>
    </ScrollView>
  );
};

export default InformationScreen;
