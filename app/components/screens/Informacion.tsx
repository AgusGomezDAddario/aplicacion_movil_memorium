import * as React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Linking
} from 'react-native';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Color';
import Fonts from '../constants/Fonts';
import { FontAwesome } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Informacion">;
const InformationScreen: React.FC<Props> = ({ navigation: { navigate } }: Props) => {
    const openYouTubeVideo = () => {
        const youtubeVideoURL = 'https://youtu.be/TbeNCyrhYMM';

        Linking.openURL(youtubeVideoURL)
            .catch((err) => console.error('Error al abrir el enlace: ', err));
    };
    const openPaper = () => {
        const paperURL = 'https://drive.google.com/file/d/1bRSpxDZUDBlZM8W7LrvTtr3RnCXEOtOX/view?usp=sharing';

        Linking.openURL(paperURL)
            .catch((err) => console.error('Error al abrir el enlace: ', err));
    };
    return (
        <ScrollView>
            <View
                style={{
                    padding: Spacing * 2,
                }}
            >
                <View
                    style={{
                        marginVertical: Spacing * 2,
                    }}
                >

                    <Text
                        style={{
                            fontSize: FontSize.large,
                            color: Colors.primary,
                            fontFamily: Fonts["poppins-bold"],
                            textAlign: "center",
                        }}
                    >
                        ¿Qué es la memoria del trabajo?
                    </Text>
                    <Text
                        style={{
                            fontSize: FontSize.large,
                            color: Colors.primary,
                            fontFamily: Fonts["poppins-light"],
                            textAlign: "left",
                        }}
                    >
                        Es la capacidad del cerebro de almacenar y manipular temporalmente información para el desempeño de tareas complejas. Funciona como una almacén temporal que mantiene información para actividades como resolver problemas, tomar decisiones o comprender situaciones complejas.
                    </Text>
                    <View style={{ alignContent: 'center', alignSelf: 'center' }}>
                    </View>
                    <TouchableOpacity
                        onPress={() => openYouTubeVideo()}
                        style={{
                            padding: Spacing * 2,
                            backgroundColor: Colors.primary,
                            marginVertical: Spacing * 4,
                            borderRadius: Spacing,
                            shadowColor: Colors.gray,
                            shadowOffset: {
                                width: 0,
                                height: Spacing,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: Spacing,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Octicons name="video" size={Spacing * 4} color={Colors.onPrimary} style={{ textAlign: "justify" }} />
                        <Text
                            style={{
                                fontFamily: Fonts["Roboto-Bold"],
                                color: Colors.onPrimary,
                                textAlign: "center",
                                fontSize: FontSize.large,
                                paddingLeft: Spacing * 6,
                            }}
                        >
                            Mirar video Informativo
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: FontSize.large,
                            color: Colors.primary,
                            fontFamily: Fonts["poppins-bold"],
                            textAlign: "center",
                        }}
                    >
                        ¿Por qué importa la memoria del trabajo?
                    </Text>
                    <Text
                        style={{
                            fontSize: FontSize.large,
                            color: Colors.primary,
                            fontFamily: Fonts["poppins-light"],
                            textAlign: "left",
                        }}
                    >
                        {'Porque gracias a ella, podemos desarrollar tareas como:\n'}
                        {'- Seguir el hilo de una conversación\n'}
                        {'- Nos permite aprender algo y asociarlo con lo que ya sabemos\n'}
                        {'- Mantener en la mente cierta información necesaria para el desarrollo de una tarea\n'}
                        {'La memoria del trabajo es esencial en tareas como seguir los pasos de una receta o recordar lo que tenemos que comprar en el supermercado'}
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPaper()}
                        style={{
                            padding: Spacing * 2,
                            backgroundColor: Colors.primary,
                            marginVertical: Spacing * 4,
                            borderRadius: Spacing,
                            shadowColor: Colors.gray,
                            shadowOffset: {
                                width: 0,
                                height: Spacing,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: Spacing,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <FontAwesome name="newspaper-o" size={Spacing * 4} color={Colors.onPrimary} style={{ textAlign: "justify" }} />
                        <Text
                            style={{
                                fontFamily: Fonts["Roboto-Bold"],
                                color: Colors.onPrimary,
                                textAlign: "center",
                                fontSize: FontSize.large,
                                paddingLeft: Spacing * 6,
                            }}
                        >
                            Leer el paper Informativo
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};


export default InformationScreen;