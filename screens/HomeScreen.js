//important imports
import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'; // importing components

// The home screen contains the text “You are on the home page” and a button.
class HomeScreen extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/pawbg.png")} resizeMode="cover" style={styles.container}>
        <View style={styles.box}>
          <Image style={styles.img} source={require("../assets/dogdetective-logo.png")}/>
          <Image source={require("../assets/dogdetective-title.png")}/>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Camera')}>
            <Text>Get Started</Text>
          </TouchableOpacity>
        </View>
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
      height: "100%",
    },
    header: {
      justifyContent: 'center',
    },
    box :{
      justifyContent: "space-evenly",
      alignItems: 'center',
      maxWidth: "90%",
      height: "85%"
    },
    btn:{
      backgroundColor: "white",
      fontSize: "20px",
      alignItems: 'center',
      padding: 10,
      borderRadius: 25,
      overflow: 'hidden',
      paddingHorizontal: 40,
    },
  });

export default HomeScreen;