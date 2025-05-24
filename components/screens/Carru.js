import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Animated,
} from "react-native";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import Spacing from "../constants/Spacing";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const ANCHO_CONTENEDOR = width * 0.7;

export default function Carru(props) {
  const { param1 } = props;

  const scale = new Animated.Value(1);

  const onZoomEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true }
  );

  const onZoomStateChangeFunction = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <PinchGestureHandler
          onGestureEvent={onZoomEvent}
          onHandlerStateChange={onZoomStateChangeFunction}
        >
          <Animated.Image
            source={param1}
            style={[styles.posterImage, { transform: [{ scale: scale }] }]}
            resizeMode="contain"
          />
        </PinchGestureHandler>
        <Text style={styles.imageText}>Tu primera imagen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing * 2,
  },
  posterImage: {
    width: "30%",
    height: ANCHO_CONTENEDOR / 5,
    borderRadius: 24,
  },
  imageText: {
    fontSize: FontSize.large,
    color: Colors.primary,
    fontFamily: Fonts["Roboto-Bold"],
    marginTop: Spacing * 2,
    textAlign: "center",
  },
});
