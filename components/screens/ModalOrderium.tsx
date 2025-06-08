import React from 'react';
import { useContext } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Color';
import Fonts from '../constants/Fonts';
import { ScoreContext } from '../context/ScoreContext';

type ModalOrderiumProps = {
  isVisible: boolean;
  navigation: NativeStackScreenProps<RootStackParamList>['navigation'];
  route?: NativeStackScreenProps<RootStackParamList>['route'];  // Opcional
};

const ModalOrderium: React.FC<ModalOrderiumProps> = ({ navigation, isVisible }) => {

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
          <Text
            style={{
              fontSize: FontSize.large,
              color: Colors.primary,
              fontFamily: Fonts['poppins-bold'],
              textAlign: 'center',
              paddingTop: Spacing * 2.5,
            }}
          >
            ¡Felicitaciones!
          </Text>

          <TouchableOpacity 
            style={{
              padding: Spacing,
              backgroundColor: Colors.primary,
              marginVertical: Spacing, 
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: Spacing },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
              alignSelf: 'center'
            }}
            onPress={() => {
              navigation.replace("OrderiumGame");  // Reemplaza la pantalla actual con "GonoGoGame"
            }}
          >
            <Text style={{ fontFamily: Fonts['Roboto-Bold'], color: Colors.onPrimary, fontSize: FontSize.medium }}>
              Volver a Jugar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{
              padding: Spacing,
              backgroundColor: Colors.primary,
              marginVertical: Spacing, 
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: Spacing },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
              alignSelf: 'center'
            }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
              });
            }}
          >
            <Text style={{ fontFamily: Fonts['Roboto-Bold'], color: Colors.onPrimary, fontSize: FontSize.medium }}>
              Salir
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default ModalOrderium;
