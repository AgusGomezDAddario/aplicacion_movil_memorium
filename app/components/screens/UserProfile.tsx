// UserProfile.tsx

import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import AppTextInput from "../AppTextInput";
import { LoginContext } from "../context/LoginContext";
import { ScoreContext } from "../context/ScoreContext";
import Color from "../constants/Color";
import image1 from "../../../assets/images/achievements/puntosDiarios/1stToday.png";
import image2 from "../../../assets/images/achievements/puntosDiarios/10thToday.png";
import image3 from "../../../assets/images/achievements/puntosDiarios/25thToday.png";
import image4 from "../../../assets/images/achievements/puntosDiarios/50thToday.png";
import image5 from "../../../assets/images/achievements/puntosTotales/50Total.png";
import image6 from "../../../assets/images/achievements/puntosTotales/150Total.png";
import image7 from "../../../assets/images/achievements/puntosTotales/500Total.png";
import image8 from "../../../assets/images/achievements/puntosTotales/1000Total.png";
import placeHolder from "../../../assets/images/achievements/placeHolder.png";

const { height, width } = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "UserProfile">;

function UserProfileScreen({ navigation: { navigate } }: Props) {
  const { logout, user } = useContext(LoginContext);
  const { score } = useContext(ScoreContext);
  const [modalVisible, setModalVisible] = useState(false);

  if (!score || !score.achievements) {
    console.log(score);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Cargando información...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={{
            height: height / 5,
            width: height / 5, 
            marginVertical: Spacing * 2.3,
            marginBottom: Spacing,
            alignSelf: "center", 
          }}
          resizeMode="contain"
          source={require("../../../assets/images/user.png")}
        />

        <View style={styles.content}>
          <Text
            style={{
              fontFamily: Fonts["Roboto-Light"],
              color: Colors.darkText,
              textAlign: "center",
              fontSize: FontSize.large,
              marginTop: Spacing,
            }}
          >
            {score.name || "Nombre no disponible"} {/* Manejar caso de name indefinido */}
          </Text>

          <View style={{ marginTop: Spacing * 2 }}>
            <Text style={styles.header}>Resultados</Text>
            <View style={styles.itemContainer}>
              {/* <View style={styles.item}>
                <Text>Acertadas</Text>
                <Text>{score.correct}</Text>
              </View> */}
              <View style={styles.item}>
                <Text>Racha de días Jugados:</Text>
                <Text>{score.racha}</Text>
              </View>
              <View style={styles.item}>
                <Text>Juega desde:</Text>
                <Text>
                  {user.creacion
                    ? `${new Date(user.creacion).toLocaleDateString()}`
                    : "Fecha no disponible"} {/* Manejar caso de creacion indefinida */}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.logrosTitulo}>Tus Logros</Text>
          <Text style={styles.logrosSubtitulo}>Puntos Diarios</Text>
          <View style={styles.logrosContainer}>
            <Image
              style={{ width: 100, height: 100 }}
              source={
                score.achievements.includes("1stToday") ? image1 : placeHolder
              }
            />
            <Image
              style={{ width: 100, height: 100 }}
              source={
                score.achievements.includes("10thToday") ? image2 : placeHolder
              }
            />
            <Image
              style={{ width: 100, height: 100 }}
              source={
                score.achievements.includes("25thToday") ? image3 : placeHolder
              }
            />
            <Image
              style={{ width: 100, height: 100 }}
              source={
                score.achievements.includes("50thToday") ? image4 : placeHolder
              }
            />
          </View>
          <Text style={styles.logrosSubtitulo}>Puntos Totales</Text>
          <View style={styles.logrosContainer}>
            <Image
              style={{ width: 100, height: 100 }}
              source={
                score.achievements.includes("50Total") ? image5 : placeHolder
              }
            />
            <Image
              style={{ width: 100, height: 100 }}
              source={
                score.achievements.includes("150Total") ? image6 : placeHolder
              }
            />
            <Image
              style={{ width: 100, height: 100 }}
              source={
                score.achievements.includes("500Total") ? image7 : placeHolder
              }
            />
            <Image
              style={{ width: 100, height: 100 }}
              source={
                score.achievements.includes("1000Total") ? image8 : placeHolder
              }
            />
          </View>

          <View style={styles.buttonContainer_Boton}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.logoutButton}
            >
              <Ionicons
                name="log-out"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {}}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    ¿Desea cerrar la sesión actual?
                  </Text>
                  <View style={styles.buttonContainer_Modal}>
                    <View style={styles.buttonWrapper}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={logout}
                      >
                        <Text style={styles.textStyle}>Salir</Text>
                      </Pressable>
                    </View>
                    <View style={styles.buttonWrapper}>
                      <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle_2}>Cancelar</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContent: {
    backgroundColor: Color.onPrimary,
    borderRadius: 5,
    width: width - Spacing * 10,
  },
  modalView: {
    backgroundColor: Color.onPrimary,
    borderRadius: 7,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    alignItems: "center",
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
    color: Color.onPrimary,
  },
  buttonOpen: {
    backgroundColor: Color.primary,
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
    color: "white",
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
  logrosTitulo: {
    textAlign: "center",
    marginVertical: Spacing * 3,
    textDecorationLine: "underline",
    fontFamily: Fonts["Roboto-Bold"],
    fontSize: 20,
  },
  logrosSubtitulo: {
    marginVertical: Spacing,
    fontFamily: Fonts["Roboto-Bold"],
  },
  logrosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    borderWidth: 3,
    borderColor: Color.primary,
    borderRadius: 10,
  },
  loadingText: {
    fontSize: FontSize.large,
    color: Colors.text,
    textAlign: "center",
    marginTop: Spacing * 2,
    fontFamily: Fonts["Roboto-Regular"],
  },
});

export default UserProfileScreen;