import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import Colors from "../constants/Color";

  const data = [
    { label: '2 segundos', value: 2000 },
    { label: '4 segundos', value: 4000 },
    { label: '6 segundos', value: 6000 },
    { label: '8 segundos', value: 8000 },
  ];

  type DropdownTimeProps = {
    value: any; // replace 'any' with the actual type of 'value'
    onValueChange: (value: any) => void; // replace 'any' with the actual type of 'value'
  };
  
  const DropdownTimeComponent: React.FC<DropdownTimeProps> = ({ value:propValue, onValueChange }) => {
    const [value, setValue] = useState(propValue || 2000);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}

        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}

        onChange={item => {
          setValue(item.value);
          onValueChange(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
    );
  };

  export default DropdownTimeComponent;

  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      activeColor: Colors.primary,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });