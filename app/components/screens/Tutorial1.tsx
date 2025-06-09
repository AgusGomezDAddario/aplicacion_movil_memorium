import React from 'react';
import { View, Image, ScrollView,Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../types";
import Colors from '../constants/Color';
import { imagePathsTuto } from "../constants/imagesTuto";
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Fonts from '../constants/Fonts';

type Props = NativeStackScreenProps<RootStackParamList, "Tutorial1">;
const Tutorial1Screen: React.FC<Props> = ({ navigation: { navigate } }: Props) => {
    return (
            <Onboarding
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[0]}
                        style={{width: 300, height: 350}}/>,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Primero vas a tener unos segundos para memorizar la secuencia de números</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[1]}
                        style={{width: 300, height: 350}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Entre número y número vas a tener unos segundos de espera para hacerlo más difícil</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[2]}
                        style={{width: 300, height: 350}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:350}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Ahora tendrás que ingresar el número que lograste memorizar, tenés 5 intentos</Text></View></ScrollView>,
                        subtitle: "",
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={imagePathsTuto[3]}
                        style={{width: 270, height: 330}} />,
                        title: <ScrollView style={{marginTop:-50}}><View style={{height:400}}><Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}>Finalmente podrás ver cuál era la respuesta correcta. Si no lograste memorizar, no pasa nada. Intentá las veces que quieras!!</Text></View></ScrollView>,
                        subtitle: "",
                    },
                ]}
                bottomBarColor={Colors.onPrimary}
                showPagination
                skipLabel={'Omitir'}
                onSkip={() => navigate('InstruccionesJuego2')}
                nextLabel={'Siguiente'}
                onDone={() => navigate('InstruccionesJuego2')}
                flatlistProps 
                bottomBarHeight={50}
                transitionAnimationDuration={200}
                containerStyles={{marginTop: 20}}
                //titleStyles={{marginTop: -50, fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center"}}
                //subTitleStyles={{fontSize: FontSize.large, color: Colors.primary, fontFamily: Fonts["poppins-bold"], textAlign: "center", marginBottom: 30}}
            />
    );
};

export default Tutorial1Screen;
