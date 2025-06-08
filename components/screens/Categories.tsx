import React, { useEffect, useState, useContext } from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ToastAndroid,
    ImageBackground,
    ScrollView
} from "react-native";
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

type Props = NativeStackScreenProps<RootStackParamList, "Categories">;
const CategoriesScreen: React.FC<Props> = ({ navigation: { navigate } }: Props) => {

    if (dropdownValue1 == "Facil") {
        var nombresCatTotales: string[] = Object.keys(nivelesCat.Facil)
    }
    else if ( dropdownValue1 == "Intermedio") {
        var nombresCatTotales: string [] = Object.keys(nivelesCat.Intermedio)
    }
    else if (dropdownValue1 == "Dificil") { 
        var nombresCatTotales: string [] = Object.keys(nivelesCat.Dificil)
    }

    const nombresCategorias: string[] = ["Entrenamiento", "Banderas", "Paisajes", "Peliculas", "Personas", "Camisetas de Futbol", "Oficios", "Figuras Geométricas", "Lugares", "Frutas"];
    
    return (
        <ScrollView>
            <View
                style={{
                    padding: Spacing * 2,
                }}
            >
                <View
                    style={{
                        marginVertical: Spacing * 3,
                        alignSelf: "center", 
                        width: "70%",
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
                        Seleccione una categoría
                    </Text>
                    {
                        nombresCatTotales.length > 0 ? (nombresCatTotales.map((nombreCategoria, index) => (
                            <TouchableOpacity key={index}
                                onPress={() => {
                                    navigate("MemoryGame")
                                    bandera = nombreCategoria
                                }}
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
                                    {nombreCategoria}
                                </Text>
                            </TouchableOpacity>
                        )))
                            : (
                                <Text>No hay nombres para mostrar.</Text>
                            )
                    }
                </View>
            </View>
        </ScrollView>
    );
};


export default CategoriesScreen;


