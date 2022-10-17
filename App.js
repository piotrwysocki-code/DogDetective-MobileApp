import 'react-native-gesture-handler';

import React, { Component, useState, useEffect} from 'react';
import { StyleSheet } from 'react-native'; // To add styles

import { createStackNavigator } from '@react-navigation/stack'; //Insert screens into a stack
import { NavigationContainer } from '@react-navigation/native'; //contains navigator and screen

import HomeScreen from './screens/HomeScreen';// Home screen
import AboutScreen from './screens/AboutScreen';// About Screen
import CameraScreen from './screens/CameraScreen';
import ResultScreen from './screens/ResultScreen';
import UploadImage from './screens/UploadImage';

import ReactLoading from 'react-loading';

const Stack = createStackNavigator();

class App extends Component {

  render(){
    return (
      <NavigationContainer> 
        <Stack.Navigator> 

          <Stack.Screen
            name="Home"
            component={HomeScreen}
          /> 
          <Stack.Screen
            name="About"
            component={AboutScreen}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
          />
          <Stack.Screen
            name="Upload"
            component={UploadImage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;