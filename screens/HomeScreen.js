//important imports
import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'; // importing components

// The home screen contains the text “You are on the home page” and a button.
class HomeScreen extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/pawbg.png")} resizeMode="cover" style={styles.container}>
          <Image style={styles.image} source={require("../assets/dogdetective-logo.png")}></Image>
            <ImageBackground style={styles.header} resizeMode="cover" source={require("../assets/dogdetective-title.png")}></ImageBackground>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Camera')}>
            <Text>Get Started</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#a3e5fb',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: "auto",
    },
    image: {
        height: 410,
        width: "100%",
        bottom: "10%",
    },
    header: {
        bottom: "5%",
        height: 170,
        width: "100%",
    },
    btn:{
      backgroundColor: "white",
      fontSize: "20px",
      width: "50%",
      alignItems: 'center',
      padding: 10,
      borderRadius: 25,
      overflow: 'hidden',
      bottom: "-5%",
    },
  });

export default HomeScreen;