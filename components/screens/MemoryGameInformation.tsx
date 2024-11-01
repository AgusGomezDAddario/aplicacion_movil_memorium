import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import DropdownComponent from "./Dropdown";
export var dropdownValue1: string;
export var dropdownTimeValue1: number;
import Onboarding from "react-native-onboarding-swiper";
import { Entypo } from "@expo/vector-icons";
export var dropdownTimeInicialValue1: number;
import ModalOpcionesMemorium from "./ModalOpcionesMemorium";
import { SoundComponent } from "../logic/audioInstructions";
import Color from "../constants/Color";
import Octicons from "@expo/vector-icons/Octicons";

type Props = NativeStackScreenProps<RootStackParamList, "InstruccionesJuego1">;
const InstruccionesJuego1Screen: React.FC<Props> = ({
  navigation: { navigate },
}: Props) => {
  //Dropdown Categories
  const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  const handleDropdownChange = (value: string | null) => {
    setDropdownValue(value);
    dropdownValue1 = value;
  };

  //Dropdown Time Inicial
  const [dropdownTimeInicialValue, setDropdownTimeInicialValue] =
    useState(4000);
  dropdownTimeInicialValue1 = dropdownTimeInicialValue; //para poder almacenar el valor por defecto
  const handleDropdownTimeInicialChange = (value: number) => {
    setDropdownTimeInicialValue(value);
    dropdownTimeInicialValue1 = value;
  };

  //Dropdown Time entre imagenes
  const [dropdownTimeValue, setDropdownTimeValue] = useState(2000);
  dropdownTimeValue1 = dropdownTimeValue; //para poder almacenar el valor por defecto
  const handleDropdownTimeChange = (value: number) => {
    setDropdownTimeValue(value);
    dropdownTimeValue1 = value;
  };

  //Modal opciones avanzadas
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            marginVertical: Spacing * 2,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.large,
              color: Colors.primary,
              fontFamily: Fonts["Roboto-Bold"],
              textAlign: "center",
            }}
          >
            Observa dos imágenes separadas por un distractor y decide si
            coinciden. Entrena tu memoria a corto plazo eligiendo entre diversas
            categorías de imágenes.
          </Text>

          <View style={styles.buttonContainer_Boton}>
            <SoundComponent juego={"memory_game"} />
            <TouchableOpacity onPress={() => navigate("InformationJuego1")}>
              <Octicons
                name="info"
                size={38}
                color="blue"
                style={styles.infomration}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: FontSize.large,
              color: Colors.primary,
              fontFamily: Fonts["poppins-bold"],
              textAlign: "center",
              paddingTop: Spacing * 2.5,
            }}
          >
            Selecciona la dificultad del juego
          </Text>

          <DropdownComponent onValueChange={handleDropdownChange} />

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={handleModalVisible}
              style={{
                paddingTop: Spacing * 2.5,
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.medium,
                  color: Colors.primary,
                  fontFamily: Fonts["poppins-bold"],
                  textAlign: "center",
                }}
              >
                Opciones avanzadas
              </Text>
            </TouchableOpacity>

            <ModalOpcionesMemorium
              isVisible={modalVisible}
              closeModal={handleModalVisible}
              dropdownTimeValue={dropdownTimeValue}
              dropdownTimeInicialValue={dropdownTimeInicialValue}
              onDropdownTimeChange={handleDropdownTimeChange}
              onDropdownTimeInicialChange={handleDropdownTimeInicialChange}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigate("Categories")}
            disabled={!dropdownValue}
            style={{
              padding: Spacing * 2,
              backgroundColor: !dropdownValue
                ? Colors.second_gray
                : Colors.primary,
              marginVertical: Spacing * 2,
              borderRadius: Spacing,
              shadowColor: !dropdownValue ? Colors.gray : Colors.primary,
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

export default InstruccionesJuego1Screen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  buttonContainer_Modal: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonContainer_Boton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
    marginHorizontal: Spacing * 2,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 90,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: Color.second_gray,
  },
  buttonClose: {
    backgroundColor: "#FF0000",
  },
  textStyle: {
    color: "white",
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
  textStyle_2: {
    color: Color.text,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: Color.primary,
    fontFamily: "Roboto-Bold",
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing * 4,
    justifyContent: "center",
    flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  infomration: {
    marginTop: 32,
  },
  item: {
    justifyContent: "center",
    backgroundColor: Color.gray,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    fontFamily: Fonts["Roboto-Bold"],
    fontSize: 12,
    textAlign: "center",
    flex: 1,
  },
  header: {
    fontSize: 18,
    backgroundColor: Color.primary,
    fontFamily: Fonts["Roboto-Bold"],
    color: Colors.onPrimary,
    borderRadius: Spacing,
    textAlign: "center",
    padding: Spacing * 2,
  },
  logoutButton: {
    marginVertical: Spacing * 2,
    padding: Spacing,
    backgroundColor: Colors.red,
    borderRadius: Spacing / 2,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
  },
});
