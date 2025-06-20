/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { dropdownTimeValue1 } from './MemoryGameInformation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

type Props = {};
export default class Loader extends Component<Props> {
  state = {
    spinner: true
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        spinner: !this.state.spinner
      });
    }, dropdownTimeValue1);
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
          color='#1F41BB'
          overlayColor='transparent'
          size="large"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F41BB'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#1F41BB',
    marginBottom: 5
  }
});