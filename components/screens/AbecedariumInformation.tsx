import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { SoundComponent } from "../logic/audioInstructions";
import Octicons from "@expo/vector-icons/Octicons";

type Props = NativeStackScreenProps<RootStackParamList, "InstruccionesJuego5">;
const InstruccionesJuego5Screen = ({ navigation: { navigate } }) => {
  return (
    <ScrollView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            marginVertical: Spacing * 1,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.large,
              color: Colors.primary,
              fontFamily: Fonts["poppins-bold"],
              textAlign: "center",
              paddingTop: Spacing * 2,
            }}
          >
            Completa cada casilla con la siguiente letra del abecedario
            correspondiente a cada letra de una palabra dada. Mejora tu agilidad
            mental y precisión.
          </Text>
          <View style={styles.buttonContainer_Boton}>
            <SoundComponent juego={"abecedarium"} />
            <TouchableOpacity onPress={() => navigate("InformationJuego5")}>
              <Octicons
                name="info"
                size={38}
                color="blue"
                style={styles.infomration}
              />
            </TouchableOpacity>
          </View>
          <View>
        </View>
          <TouchableOpacity
            onPress={() => navigate("AbecedarioGame")}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 2,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
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
              Comenzar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default InstruccionesJuego5Screen;

const styles = StyleSheet.create({
  buttonContainer_Boton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  infomration: {
    marginTop: 32,
  },
});
