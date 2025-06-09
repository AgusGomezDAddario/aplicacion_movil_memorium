import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
const { height } = Dimensions.get("window");
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// ...

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [showImage, setShowImage] = useState(true);

  const position = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value }],
    };
  });

  // Cuando la imagen deba moverse

  useEffect(() => {
    const timer1 = setTimeout(() => {
      position.value = withTiming(-height / 3, { duration: 1000 }); // Ajusta la duración a tu gusto
    }, 2000);
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 3000); // Cambia el valor de 3000 a la cantidad de milisegundos que deseas mostrar la imagen sola
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer);
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showImage ? (
        <Animated.View
          style={[
            {
              height: height,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
            animatedStyle,
          ]}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: Spacing * 4,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: Spacing,
              }}
            >
              <Image
                source={require("../../../assets/images/log-PhotoRoom.png-PhotoRoom.png")}
                style={{
                  width: 400,
                  height: height / 2,
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>
        </Animated.View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: Spacing,
            }}
          >
            <Image
              source={require("../../../assets/images/log-PhotoRoom.png-PhotoRoom.png")}
              style={{
                width: 400,
                height: height / 2,
                resizeMode: "contain",
              }}
            />
          </View>

          <View
            style={{
              paddingHorizontal: Spacing * 4,
              paddingTop: Spacing * 4,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xxLarge,
                color: Colors.primary,
                fontFamily: Fonts["Roboto-Bold"],
                textAlign: "center",
              }}
            >
              Agiliza tu mente aquí
            </Text>

            <Text
              style={{
                fontSize: FontSize.small,
                color: Colors.text,
                fontFamily: Fonts["Roboto-Medium"],
                textAlign: "center",
                marginTop: Spacing * 2,
              }}
            >
              Explora los juegos que tenemos para ti y empieza con los mejores
              juegos de memoria
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: Spacing * 2,
              paddingTop: Spacing * 6,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%", // alineación adecuada en web
            }}
          >
            <TouchableOpacity
              onPress={() => navigate("Login")}
              style={{
                backgroundColor: Colors.primary,
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
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
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Iniciar Sesión
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigate("Register")}
              style={{
                backgroundColor: Colors.primary,
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
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
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
