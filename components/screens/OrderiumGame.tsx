import React, { useEffect, useState, useRef } from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    Dimensions,
    ToastAndroid,
    Alert,
    Animated
} from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Color";
import Fonts from "../constants/Fonts";
import Toast from 'react-native-root-toast';
import ModalOrderium from "./ModalOrderium";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useContext } from "react";
import { ScoreContext } from "./../context/ScoreContext";
import orderiumData from './../Similar/orderiumData.json';

const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "OrderiumGame">;

const dataJSON = {
    "Ordenar las palabras alfabeticamente": [
        { "Pala": 3, "Auto": 1, "Trompeta": 4, "Casa": 2 },
        { "Boleto": 1, "Pedal": 4, "Faro": 3, "Caja": 2 }
    ],
    "Ordenar la fecha en orden cronologico": [
        { "12/12/2021": 1, "12/12/2024": 2, "12/12/2025": 3 },
        { "12/12/2019": 2, "12/12/2017": 1, "12/12/2020": 3 }
    ]
};

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const OrderiumGame: React.FC<Props> = ({ navigation }) => {
    const [data, setData] = useState<any[]>([]);
    const [correctOrder, setCorrectOrder] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [facilitationCount, setFacilitationCount] = useState(0);
    const [title, setTitle] = useState("Ordena las palabras");
    const { updateOrderiumScore, setScore, score, updateScore } = useContext(ScoreContext);
    const [startTime, setStartTime] = useState(Date.now());
    const [attemptsCount, setAttemptsCount] = useState(0);
    const [borderColor, setBorderColor] = useState('transparent');
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        loadRandomTask();
    }, []);

    const loadRandomTask = () => {
        const categories = Object.keys(orderiumData);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        setTitle(randomCategory);  // Cambia el título basado en la categoría seleccionada
        
        const task = orderiumData[randomCategory][Math.floor(Math.random() * orderiumData[randomCategory].length)];
        const taskArray = Object.entries(task); 
        const correct = taskArray.slice().sort((a, b) => Number(a[1]) - Number(b[1])); 
        setCorrectOrder(correct);
    
        const shuffled = shuffleArray(taskArray.slice()); 
        const formattedData = shuffled.map((item, index) => ({
            key: index.toString(),
            label: item[0],
            correctPosition: Number(item[1]),
            locked: false, 
        }));
        setData(formattedData);
    };

    const handleFacilitation = () => {
        const unlockedItems = data.filter(item => !item.locked);

        // Si quedan solo 2 elementos sin acomodar, no permitir más facilitaciones
        if (unlockedItems.length > 2) {
            const nextCorrectItem = unlockedItems.find(item => item.correctPosition === facilitationCount + 1);

            if (nextCorrectItem) {
                const updatedData = data.map(item => {
                    if (item.key === nextCorrectItem.key) {
                        return { ...item, locked: true };
                    }
                    return item;
                }).sort((a, b) => {
                    // Los elementos bloqueados deben mantenerse en su posición correcta
                    if (a.locked && b.locked) return a.correctPosition - b.correctPosition;
                    // Los desbloqueados mantienen su orden
                    if (!a.locked && !b.locked) return 0;
                    // Los bloqueados van antes que los desbloqueados
                    return a.locked ? -1 : 1;
                });

                setData(updatedData);
                setFacilitationCount(facilitationCount + 1);
            }
        } else {
            // Alertar al usuario que ya no puede usar la facilitación
            Alert.alert("Facilitación bloqueada", "Solo quedan 2 elementos por ordenar, no se puede usar más la facilitación.");
        }
    };


    const handleSubmit = () => {
        setAttemptsCount(prevCount => prevCount + 1);

        const isCorrect = data.every(
            (item, index) => item.label === correctOrder[index][0]
        );

        if (isCorrect) {
            const timeSpent = (Date.now() - startTime) / 1000;
            updateOrderiumScore(attemptsCount + 1, facilitationCount, timeSpent);
            setScore(prevScore => ({
                ...prevScore,
                correct: prevScore.correct + 1,
            }));
            
            if (score.correct + 1 >= 50) {
                if (score.achievements.indexOf("50Total") === -1) {
                  score.achievements.push("50Total");
                }
                if (score.correct + 1 >= 150){
                  if (score.achievements.indexOf("150Total") === -1) {
                    score.achievements.push("150Total");
                  }
                  if (score.correct + 1 >= 500){
                    if (score.achievements.indexOf("500Total") === -1) {
                      score.achievements.push("500Total");
                    }
                    if (score.correct + 1 >= 1000){
                      if (score.achievements.indexOf("1000Total") === -1) {
                        score.achievements.push("1000Total");
                      }
                    }
                  }
                }
              }
        
              switch (score.scoreToday + 1) {
                case 1:
                  if (score.achievements.indexOf("1stToday") === -1) {
                    score.achievements.push("1stToday");
                  }
                  break;
                case 10:
                  if (score.achievements.indexOf("10thToday") === -1) {
                    score.achievements.push("10thToday");
                  }
                  break;
                case 25:
                  if (score.achievements.indexOf("25thToday") === -1) {
                    score.achievements.push("25thToday");
                  }
                  break;
                case 50:
                  if (score.achievements.indexOf("50thToday") === -1) {
                    score.achievements.push("50thToday");
                  }
                  break;
                default:
                  break;
              }

              setScore(prevScore => ({
                ...prevScore,
                correct: score.correct + 1,
                scoreToday: score.scoreToday+1, // Actualizar el array en el estado
              }));

            updateScore(score.correct + 1, score.incorrect, score.achievements, score.scoreToday+1, null, null);

            showToastCorrect();
            handleModalVisible();
        } else {
            handleIncorrectAnswer(); // Llama a la función para mostrar la animación
        }
    };

    const handleModalVisible = () => {
        setModalVisible(!modalVisible);
    };

    const handleIncorrectAnswer = () => {
        setBorderColor('red');

        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => setBorderColor('transparent'), 1000);
        showToastInCorrect();
    };

    const showToastCorrect = () => {
        Toast.show('¡Respuesta correcta!', {
            duration: Toast.durations.LONG,
            animation: true,
            backgroundColor: Colors.primary,
            textColor: Colors.onPrimary,
            hideOnPress: true,
            shadow: true,
        });
    };

    const showToastInCorrect = () => {
        Toast.show('Respuesta incorrecta, vuelve a intentarlo!', {
            duration: Toast.durations.LONG,
            animation: true,
            backgroundColor: Colors.primary,
            textColor: Colors.onPrimary,
            hideOnPress: true,
            shadow: true,
        });
    };

    const renderItem = ({ item, drag, isActive }) => {
        return (
            <ScaleDecorator>
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                    <View style={[styles.item, { backgroundColor: item.locked ? "#90EE90" : "#D3D3D3", borderColor: borderColor, borderWidth: 2 }]}>
                        <Text style={styles.itemText}>
                            {item.label}
                        </Text>
                        {!item.locked && (
                            <TouchableOpacity onPressIn={drag} style={styles.dragHandle}>
                                <Text style={styles.dragHandleText}>≡</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </Animated.View>
            </ScaleDecorator>
        );
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>

                <DraggableFlatList
                    data={data}
                    onDragEnd={({ data }) => setData(data)}
                    keyExtractor={(item) => item.key}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Hecho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleFacilitation}
                        disabled={data.filter(item => !item.locked).length <= 2}  // Deshabilitar si quedan 2 o menos elementos desbloqueados
                    >
                        <Text style={[styles.buttonText, { color: data.filter(item => !item.locked).length <= 2 ? 'gray' : Colors.onPrimary }]}>
                            Facilitación
                        </Text>
                    </TouchableOpacity>
                </View>

                <ModalOrderium isVisible={modalVisible} navigation={navigation} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: FontSize.xLarge,
        color: Colors.primary,
        fontFamily: Fonts["poppins-bold"],
        textAlign: "left",
        marginBottom: Spacing * 2,
    },
    item: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemText: {
        fontSize: 18,
    },
    dragHandle: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    dragHandleText: {
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    submitButton: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
    },
    submitButtonText: {
        color: Colors.onPrimary,
        fontSize: FontSize.medium,
        textAlign: "center",
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: Colors.primary,
        fontSize: FontSize.medium,
        textAlign: "center",
    }
});

export default OrderiumGame;
