import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity, ImageBackground, StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native'; // importing components
import background from "../assets/bg.png";
import * as Progress from 'react-native-progress';


class  ResultScreen extends Component {

  render() {
    // get the params from the uploadImage page
    const { result, img } = this.props.route.params;

    const improvedResult = JSON.parse(result)

    const arrayOfMessages = ["Case closed!", "The investigations reveals....", 
      "Dog Detective thinks:", "Hmmmm... Looks like this is:", "The investigations is over! The dog is:"]

    const index = Math.floor(Math.random() * 4) + 1

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require("../assets/pawbg.png")} resizeMode="cover" style={styles.container}>
        <Image style={styles.image} source={{ uri: "data:image/jpg;base64," + img.base64 }}/>
            <View style={styles.results}>
              <Text style={styles.text}>
                {arrayOfMessages[index]}
              </Text>
              {improvedResult.map(name => ( 
                <Text style={styles.text} key={name.Breed}>
                  {"\n"}
                  {name.Breed.replace(/_/g, " ")}
                  {"\n"}
                  <Progress.Bar progress={name.Confidence} width={200} height={15} text={10} />
                  {" "}{Math.round(name.Confidence * 100)}%
                </Text>

              ))}
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.btn}>
                <Text>Done</Text>
              </TouchableOpacity>
          </View> 
        </ImageBackground>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      width: '100%',
      height: '150%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    results: {
      alignItems: 'center',
      width: "100%",
      top: '25%'
    },
    image: {
      width: "80%",
      height: "50%",
      marginBottom: "25%",
    },
    progress: {
      height: "auto",
      width: "100%"
    },
    text: {
      fontFamily: 'Arial',
      fontWeight: 'bold',
      bottom: "100%",
      fontSize: 20,
    },
    bgImage: {
      width: "100%",
      height: "auto"
    },
    btn:{
      backgroundColor: "white",
      fontSize: "20px",
      width: "50%",
      height: "auto",
      alignItems: 'center',
      padding: 10,
      borderRadius: 25,
      overflow: 'hidden',
      top: "-75%"
    }
  });

export default ResultScreen;