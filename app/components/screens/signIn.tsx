import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Color";
  import Fonts from "../constants/Fonts";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../../../types";
  import AppTextInput from "../AppTextInput";
  import { LoginContext } from '../context/LoginContext'
  import { useContext, useState } from 'react'
  
  type Props = NativeStackScreenProps<RootStackParamList, "Login">;
  
  const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {

    const { login, googleLogin, facebookLogin, logueo} = useContext(LoginContext)

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

  const handleInputChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    // Realizar validaciones si es necesario
    console.log(values)
    login(values);
  };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            padding: Spacing * 2,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xLarge,
                color: Colors.primary,
                fontFamily: Fonts["poppins-bold"],
                marginVertical: Spacing * 3,
              }}
            >
              Inicie Sesión
            </Text>
            <Text
              style={{
                fontFamily: Fonts["poppins-regular"],
                fontSize: FontSize.small,
                maxWidth: "80%",
                textAlign: "center",
              }}
            >
              Bienvenido, te extrañabamos!
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          >
            <AppTextInput
              value={values.email}
              onChangeText={(text) => handleInputChange("email", text)} 
              placeholder="Email" />
            <AppTextInput 
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={(text) => handleInputChange("password", text)} />
              {!logueo && <Text style={{ color: "red", fontFamily: Fonts["Roboto-Light"], fontSize: FontSize.small, marginTop: 5 }}>
              Las credenciales no coinciden. Prueba de nuevo!
            </Text>}
          </View>
  
          <View>
            <Text
              style={{
                fontFamily: Fonts["Roboto-Light"],
                fontSize: FontSize.small,
                color: Colors.primary,
                alignSelf: "flex-end",
              }}
              onPress={() => navigate("ForgotPassword")}
            >
              Olvidaste tu contraseña?
            </Text>
          </View>
  
          <TouchableOpacity
          onPress={handleSubmit}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 3,
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
              Iniciar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Register")}
            style={{
              padding: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts["poppins-semiBold"],
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Crear nueva cuenta
            </Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});