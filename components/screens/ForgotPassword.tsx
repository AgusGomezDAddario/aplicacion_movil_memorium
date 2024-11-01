import { Dimensions } from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useIsFocused } from "@react-navigation/native";
import { ScoreContext } from "../context/ScoreContext";
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
export var bandera: string;
import { dropdownValue1 } from "./MemoryGameInformation";
import nivelesCat from "./../Similar/similar.json";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import AppTextInput from "../AppTextInput";
import Toast from 'react-native-root-toast';
import Color from "../constants/Color";
type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  var Bandera: Number;
  Bandera = 1; 
  console.log(Bandera)
  const [email, setEmail] = useState("");

  const changePassword = () => {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Se envió correctamente");
        return 1; // Retornar 1 para indicar que se envió correctamente
      })
      .catch((error) => {
        console.log("No existe una cuenta con ese Email asociado");
        return 0; // Retornar 0 para indicar que no se encontró la cuenta
      });
  };
  
  const showToast1 = () => {
    try{
      Toast.show('Ingrese un Email Valido', {
        duration: Toast.durations.LONG,
        animation: true,
        backgroundColor: Color.primary,
        textColor: Color.onPrimary,
        hideOnPress: true,
        shadow: true,
      });
    }
    catch(error){
      console.log(error)
    }
  }

  const showToast2 = () => {
    try{
      Toast.show('Email enviado exitosamente', {
        duration: Toast.durations.LONG,
        animation: true,
        backgroundColor: Color.primary,
        textColor: Color.onPrimary,
        hideOnPress: true,
        shadow: true,
      });
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: FontSize.large,
            color: Colors.primary,
            fontFamily: Fonts["Roboto-Bold"],
            textAlign: "center",
            marginTop: Spacing * 4,
          }}
        >
          Ingrese la dirección de Email de su cuenta para recibir un correro con las instrucciones para poder restablecer su contraseña
        </Text>
        <View style={{ marginVertical: Spacing * 2 }}>
          <AppTextInput
            placeholder="Email de su cuenta"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            changePassword()
            .then((result) => {
              if (result === 0) {
                showToast1()
                console.log("No se manda el correo");
              } else {
                console.log("Correo enviado correctamente");
                showToast2()
                navigate("Login");
              }
            })
            .catch((error) => {
              showToast1()
              console.error("Error al cambiar la contraseña:", error);
            });
          }
          }
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
          }}
        >
          <Text
            style={{
              fontFamily: Fonts["Roboto-Bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}>
            Recuperar Contraseña
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate("Login")}
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
            Volver a Iniciar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
const styles = StyleSheet.create({});