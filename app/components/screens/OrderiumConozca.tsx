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

type Props = NativeStackScreenProps<RootStackParamList, "InformationJuego4">;
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
          Conozca Orderium
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
          Este juego fortalece su memoria secuencial y habilidad organizativa.
          Al ordenar palabras en el orden correcto, estimula la memoria de
          trabajo y mejora la habilidad para organizar información, útil en la
          resolución de problemas y planificación.
        </Text>

        <View
          style={{
            paddingBottom: Spacing * 2,
          }}
        >
          <SoundComponent juego={"informacion_orderium"} />
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
          Además, al emplear una bomba que elimina opciones incorrectas,
          potencia su precisión y control, beneficiando su rapidez y seguridad
          en tareas que requieren jerarquizar datos.
        </Text>
      </View>
    </ScrollView>
  );
};

export default InformationScreen;
