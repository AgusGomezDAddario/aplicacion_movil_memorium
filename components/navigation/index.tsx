/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Color";
import LoginScreen from "../screens/signIn";
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import MainScreen from "../screens/Main";
import UserProfileScreen from "../screens/UserProfile";
import { RootStackParamList } from "../../types";
import CategoriesScreen from "../screens/Categories";
import InstruccionesJuego2Screen from "../screens/NumeriumInformation";
import InstruccionesJuego1Screen from "../screens/MemoryGameInformation";
import EstadisticasJuego1Screen from "../screens/StatisticsGame1";
import ForgotPasswordScreen from "../screens/ForgotPassword";
import InformationScreen from "../screens/Information";
import Tutorial1Screen from "../screens/Tutorial1";
import InformationJuego1 from "../screens/MemoryGameConozca";
import InformationJuego2 from "../screens/NumeriumConozca";
import InformationJuego3 from "../screens/ContrariumConozca";
import InformationJuego4 from "../screens/OrderiumConozca";
import InformationJuego5 from "../screens/AbecedariumConozca";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="InstruccionesJuego2" component={InstruccionesJuego2Screen} />
      <Stack.Screen name="InstruccionesJuego1" component={InstruccionesJuego1Screen} />
      <Stack.Screen name="EstadisticasJuego1" component={EstadisticasJuego1Screen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="Tutorial1" component={Tutorial1Screen} />
      <Stack.Screen name="InformationJuego1" component={InformationJuego1} />
      <Stack.Screen name="InformationJuego2" component={InformationJuego2} />
      <Stack.Screen name="InformationJuego3" component={InformationJuego3} />
      <Stack.Screen name="InformationJuego4" component={InformationJuego4} />
      <Stack.Screen name="InformationJuego5" component={InformationJuego5} />
    </Stack.Navigator>
  );
}