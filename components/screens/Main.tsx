import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import AppTextInput from "../AppTextInput";
import { Entypo } from "@expo/vector-icons";
import Color from "../constants/Color";
import Toast from "react-native-root-toast";

type Props = NativeStackScreenProps<RootStackParamList, "Main">;

const showToast1 = () => {
  try {
    Toast.show("El juego estará disponible proximamente", {
      duration: Toast.durations.LONG,
      animation: true,
      backgroundColor: Color.primary,
      textColor: Color.onPrimary,
      hideOnPress: true,
      shadow: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const MainScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <ScrollView>
      <View
        style={{
          padding: Spacing,
        }}
      >
        <View
          style={{
            marginVertical: Spacing * 0.1,
          }}
        >
          <TouchableOpacity
            onPress={() => navigate("InstruccionesJuego1")}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 1.4,
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
                fontFamily: Fonts["Roboto-Bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Memory Game
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate("InstruccionesJuego2")}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 1.4,
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
                fontFamily: Fonts["Roboto-Bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Numerium
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate("InstruccionesJuego3")}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 1.4,
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
                fontFamily: Fonts["Roboto-Bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Contrarium
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate("InstruccionesJuegoOrderium")}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 1.4,
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
                fontFamily: Fonts["Roboto-Bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Orderium
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate("InstruccionesJuego5")}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 1.4,
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
                fontFamily: Fonts["Roboto-Bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Abecedarium
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer_Boton}>
            <TouchableOpacity onPress={() => navigate("Informacion")}>
              <Entypo name="info-with-circle" size={24} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MainScreen;

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
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 20,
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
