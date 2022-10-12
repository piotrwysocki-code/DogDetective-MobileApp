//important imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native'; // importing components

// The home screen contains the text “You are on the home page” and a button.
class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Dog Detective</Text>
        <Image style={styles.image} source={require("../assets/blank-dog.png")}></Image>
        
        <Button
            title="Get Started"
            onPress={() => this.props.navigation.navigate('Camera')}
        />
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
    },
    image: {
        height: 370,
        width: 450,
    },
    header: {
        fontSize: 60,
        fontFamily: "Papyrus",
        marginBottom: 50
    }
  });

export default HomeScreen;