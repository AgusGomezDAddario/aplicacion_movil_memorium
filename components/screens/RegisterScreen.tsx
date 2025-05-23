// screens/RegisterScreen.tsx

import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import AppTextInput from "../AppTextInput";
import { LoginContext } from "./../context/LoginContext";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Por favor, ingresa un email válido")
    .required("El email es requerido"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "La contraseña debe tener una letra minúscula")
    .matches(/\w*[A-Z]\w*/, "La contraseña debe tener una letra mayúscula")
    .matches(/\d/, "La contraseña debe tener un número")
    .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
    .required("La contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma la contraseña es requerida"),
  name: yup.string().required("El nombre es requerido"),
  age: yup.number().required("La edad es requerida").positive().integer(),
  dni: yup
    .string()
    .required("El DNI es requerido")
    .length(8, "El DNI debe tener 8 caracteres"),
});

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const { register, googleLogin, facebookLogin } = useContext(LoginContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    dni: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    dni: "",
  });

  const clearError = (name: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleInputChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
    clearError(name);
  };

  const handleSubmit = async (Formvalues: any) => {
    try {
      // Convertir 'age' a número
      const processedValues = {
        ...Formvalues,
        age: Number(Formvalues.age),
      };
  
      await validationSchema.validate(processedValues, { abortEarly: false });
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        age: "",
        dni: "",
      });
      console.log("Form data:", processedValues);
      register(processedValues);
    } catch (error: any) {
      if (error.inner) {
        const newErrors: any = {};
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...newErrors,
        }));
      }
      console.error("Validation error:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: Spacing * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Fonts["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            Crea tu cuenta
          </Text>
          <Text
            style={{
              fontFamily: Fonts["poppins-regular"],
              fontSize: FontSize.small,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Crea una cuenta así puedes disfrutar de los mejores juegos
          </Text>
        </View>
        <View style={{ marginVertical: Spacing * 3 }}>
          <AppTextInput
            value={values.name}
            onChangeText={(text) => handleInputChange("name", text)}
            placeholder="Nombre"
          />
          {errors.name.length > 0 && (
            <Text style={{ color: "red" }}>{errors.name}</Text>
          )}

          <AppTextInput
            value={values.age}
            onChangeText={(text) => handleInputChange("age", text)}
            placeholder="Edad"
            keyboardType="numeric"
          />
          {errors.age.length > 0 && (
            <Text style={{ color: "red" }}>{errors.age}</Text>
          )}

          <AppTextInput
            value={values.dni}
            onChangeText={(text) => handleInputChange("dni", text)}
            placeholder="DNI"
          />
          {errors.dni.length > 0 && (
            <Text style={{ color: "red" }}>{errors.dni}</Text>
          )}

          <AppTextInput
            value={values.email}
            onChangeText={(text) => handleInputChange("email", text)}
            placeholder="Email"
            keyboardType="email-address"
          />
          {errors.email.length > 0 && (
            <Text
              style={{
                color: "red",
                fontFamily: Fonts["poppins-semiBold"],
                fontSize: FontSize.small,
                marginTop: 5,
              }}
            >
              {errors.email}
            </Text>
          )}

          <AppTextInput
            placeholder="Contraseña"
            secureTextEntry
            value={values.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          {errors.password.length > 0 && (
            <Text
              style={{
                color: "red",
                fontFamily: Fonts["poppins-semiBold"],
                fontSize: FontSize.small,
                marginTop: 5,
              }}
            >
              {errors.password}
            </Text>
          )}

          <AppTextInput
            placeholder="Confirmar Contraseña"
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
          {errors.confirmPassword.length > 0 && (
            <Text
              style={{
                color: "red",
                fontFamily: Fonts["poppins-semiBold"],
                fontSize: FontSize.small,
                marginTop: 5,
              }}
            >
              {errors.confirmPassword}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => handleSubmit(values)}
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
            Registrarse
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Login")}
          style={{ padding: Spacing }}
        >
          <Text
            style={{
              fontFamily: Fonts["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Ya tengo una cuenta
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default RegisterScreen;