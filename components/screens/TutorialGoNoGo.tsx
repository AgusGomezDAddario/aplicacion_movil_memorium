import React from 'react';
import { View, Image, ScrollView,Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import Colors from '../constants/Color';
import { imagePathsTuto } from "../constants/imagesTutoGoNoGo";
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Fonts from '../constants/Fonts';

type Props = NativeStackScreenProps<RootStackParamList, "Tutorial1">;
const TutorialGoNoGo: React.FC<Props> = ({ navigation: { navigate } }: Props) => {
    return (
            <Onboarding
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[0]}
                        style={{width: 300, height: 450}}/>,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Tendras 4 palabras para elegir el ANTONIMO de la palabra que esta de titulo arriba</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[1]}
                        style={{width: 300, height: 450}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>En caso de tocar en una palabra que no es el antonimo podras volver a intentarlo las veces que quieras!</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[2]}
                        style={{width: 300, height: 390}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Si estas en duda con las opciones podras tocar en la bomba que te ayudara eliminando opciones!</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[3]}
                        style={{width: 270, height: 330}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:400}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Cuando queden solo dos opciones no podras usar mas la bomba</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[4]}
                        style={{width: 270, height: 330}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:400}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Cuando toques en la palabra correcta veras algo como esto! Suerte!!</Text></View></ScrollView>,
                        subtitle: "",
                    },
                ]}
                bottomBarColor={Colors.onPrimary}
                showPagination
                skipLabel={'Omitir'}
                onSkip={() => navigate('InstruccionesJuego3') }
                nextLabel={'Siguiente'}
                onDone={() => navigate('InstruccionesJuego3')}
                flatlistProps 
                bottomBarHeight={50}
                transitionAnimationDuration={200}
                containerStyles={{marginTop: 20}}
                //titleStyles={{marginTop: -50, fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}
                //subTitleStyles={{fontSize: FontSize.large, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center", marginBottom: 30}}
            />
    );
};

export default TutorialGoNoGo;
