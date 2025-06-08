import React from 'react';
import { View, Image, ScrollView,Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import Colors from '../constants/Color';
import { imagePathsTuto } from "../constants/imagesTutoOrderium";
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Fonts from '../constants/Fonts';

type Props = NativeStackScreenProps<RootStackParamList, "Tutorial1">;
const TutorialOrderium: React.FC<Props> = ({ navigation: { navigate } }: Props) => {
    return (
            <Onboarding
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[0]}
                        style={{width: 300, height: 450}}/>,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Se te presentara un enunciado como titulo que debes leer</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[0]}
                        style={{width: 300, height: 350}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Ahora que leiste el enunciado comenza a ordenar las opciones tocando en las tres lineas y desplazandolas</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[1]}
                        style={{width: 300, height: 390}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Si estas en duda con las opciones podras tocar en el boton "Facilitacion" que te dara una ayuda acomodandote la que sea la primer opcion</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[3]}
                        style={{width: 270, height: 330}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:400}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Cuando creas que esta listo toca el boton "Hecho" y si te pasa como en la imagen, no te desanime segui intentandolo (debes corregir algo)</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[2]}
                        style={{width: 270, height: 330}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:400}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Cuando toques el boton "Hecho" y hayas acertado veras algo como esto. Suerte!!</Text></View></ScrollView>,
                        subtitle: "",
                    },
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

export default TutorialOrderium;
