import React, { useEffect, useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Octicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../types";
import { SoundComponent } from "../logic/audioInstructions";
type Props = NativeStackScreenProps<
  RootStackParamList,
  "InstruccionesJuegoOrderium"
>;
const InstruccionesJuegoOrderiumScreen: React.FC<Props> = ({
  navigation: { navigate },
}: Props) => {
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
            Organiza palabras correctamente usando una bomba que elimina
            respuestas incorrectas en caso de duda. Ejercita tu capacidad de
            ordenación y memoria.
          </Text>
          <View style={styles.buttonContainer_Boton}>
            <SoundComponent juego={"orderium"} />
            <TouchableOpacity onPress={() => navigate("InformationJuego4")}>
              <Octicons
                name="info"
                size={38}
                color="blue"
                style={styles.infomration}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigate("OrderiumGame")}
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
export default InstruccionesJuegoOrderiumScreen;
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

