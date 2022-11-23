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
          <View style={styles.box}>
            <Image style={styles.img} source={{ uri: "data:image/jpg;base64," + img.base64 }}/>
            <View style={styles.resultsBox}>
              <Text style={styles.text}>
                {arrayOfMessages[index]}
              </Text>
              {improvedResult.map(name => (name.Confidence * 100 > 0.5 ? (
                  <Text style={styles.text} key={name.Breed}>{"\n"}
                  {name.Breed.replace(/_/g, " ")}{"\n"}
                  <Progress.Bar progress={name.Confidence} width={200} height={15} text={10} />{" "}
                  {Math.round(name.Confidence * 100)}% 
                  </Text>
              ): (null)) )}
            </View> 
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
      backgroundColor: '#a3e5fb',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: "140%",
    },
    img:{
      width: "85%",
      height: "50%",
    },
    box:{
      alignItems: 'center',
      width: "90%",
      height: "90%",
      justifyContent: "space-evenly"
    },
    resultsBox: {
      alignItems: 'center',
      width: "90%",
      justifyContent: "center",
    },
    text: {
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fontSize: 20,
    },
    btn:{
      backgroundColor: "white",
      fontSize: "20px",
      paddingHorizontal: 50,
      alignItems: 'center',
      padding: 10,
      borderRadius: 25,
      overflow: 'hidden',
    }
  });

export default ResultScreen;