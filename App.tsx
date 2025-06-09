import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./app/components/config/fonts";
import { LoginProvider } from "./app/components/context/LoginContext";
import { RootSiblingParent } from 'react-native-root-siblings';

import AppRouter from "./app/components/navigation/AppRouter";
import { ScoreProvider } from "./app/components/context/ScoreContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <RootSiblingParent>
    <LoginProvider>
      <ScoreProvider>
        <SafeAreaProvider>
          <AppRouter />
          <StatusBar />
        </SafeAreaProvider>
      </ScoreProvider>
    </LoginProvider>
    </RootSiblingParent>
    </GestureHandlerRootView>
  );
}