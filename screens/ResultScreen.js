import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native'; // importing components
import background from "../assets/bg.png";


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
            <View>    
            {improvedResult.map(name => (  
              <Text style={styles.text}>  
                {name.Breed.replace(/_/g," ")} 
                {Math.round(name.Confidence * 100)}%  
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 300,
      height: 400,
      marginBottom: "50%",
    },
    text: {
      bottom: "150%",
      width: 350,
      fontSize: 20,
    },
    bgImage: {
      width: 450,
      height: 850
    }
  });

export default ResultScreen;