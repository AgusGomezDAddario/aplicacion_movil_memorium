import React from 'react';
import { View, Image, ScrollView,Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import Colors from '../constants/Color';
import { imagePathsTuto } from "../constants/ImagesTutoAbecedarium";
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Fonts from '../constants/Fonts';

type Props = NativeStackScreenProps<RootStackParamList, "Tutorial1">;
const TutorialAbecedarium: React.FC<Props> = ({ navigation: { navigate } }: Props) => {
    return (
            <Onboarding
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[0]}
                        style={{width: 300, height: 350}}/>,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Se te presentara una palabra ("Juego") y deberas completar en cada casillero la siguiente letra correspondiente a cada letra de la palabra inicial.</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[1]}
                        style={{width: 300, height: 350}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Cuando lo intentes podes equivocarte, no te desanimes! Se te mostrara este cartel indicandote el casillero donde te equiovocaste. Podes volver a intentarlo!</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[2]}
                        style={{width: 300, height: 350}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>De esta manera se te muestra donde te equivocaste! Podes tocar en la letra y volver a intentarlo las veces que quieras!</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[3]}
                        style={{width: 300, height: 350}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Recordá cada vez que vuelvas a intentarlo tocar en "Corroborar" para ver el resultado.</Text></View></ScrollView>,
                        subtitle: "",
                    }
                ]}
                bottomBarColor={Colors.onPrimary}
                showPagination
                skipLabel={'Omitir'}
                onSkip={() => navigate('InstruccionesJuegoOrderium') }
                nextLabel={'Siguiente'}
                onDone={() => navigate('InstruccionesJuegoOrderium')}
                flatlistProps 
                bottomBarHeight={50}
                transitionAnimationDuration={200}
                containerStyles={{marginTop: 20}}
                //titleStyles={{marginTop: -50, fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}
                //subTitleStyles={{fontSize: FontSize.large, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center", marginBottom: 30}}
            />
    );
};

export default TutorialAbecedarium;
