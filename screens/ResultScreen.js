import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native'; // importing components


class  ResultScreen extends Component {
  render() {
    // get the params from the uploadImage page
    const { result, img } = this.props.route.params;
  
    const improvedResult = result.replace(/_/g," ")

    for(i in result){
      console.log(result[i])
    }

    return (
      <SafeAreaView style={styles.container}>
          <Image style={styles.image} source={{ uri: "data:image/jpg;base64," + img.base64 }}/>
          <Text style={styles.text}>{(improvedResult.replace(/"/g," "))}</Text>
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 300,
      height: 300,
      marginBottom: "50%",
    },
    text: {
      bottom: "10%"
    }
  });

export default ResultScreen;