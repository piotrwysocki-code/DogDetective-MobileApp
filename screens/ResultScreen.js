import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native'; // importing components
import background from "../assets/bg.png";
import * as Progress from 'react-native-progress';


class  ResultScreen extends Component {

  render() {
    // get the params from the uploadImage page
    const { result, img } = this.props.route.params;
  
    //const improvedResult = result.replace(/_/g," ")

    const improvedResult = JSON.parse(result)


    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ backgroundImage: `url(${background})` }}>
        </Text>
        <Image style={styles.image} source={{ uri: "data:image/jpg;base64," + img.base64 }}/>
            <View style={styles.results}>
            <Text style={styles.text}>
        {"The Dog Detective thinks your dog is a:"}
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

            </View>
            <Button
            title="Done"
            onPress={() => this.props.navigation.navigate('Home')}
            />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    results: {
      alignItems: 'center',
      //justifyContent: 'right',
      top: '20%'
    },
    image: {
      width: 300,
      height: 400,
      marginBottom: "20%",
    },
    progress: {
      height: 15,
      width:200
    },
    text: {
      fontFamily: 'Times New Roman',
      fontWeight: 'bold',
      bottom: "100%",
      fontSize: 20,
    },
    bgImage: {
      width: 450,
      height: 850
    },
  });

export default ResultScreen;