import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native'; // importing components


class  ResultScreen extends Component {
  render() {
    // get the params from the uploadImage page
    const { result, img } = this.props.route.params;

    return (
      <SafeAreaView style={styles.container}>
          <Image source={{ uri: "data:image/jpg;base64," + img.base64 }}/>
          <Text>{result}</Text>
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
  });

export default ResultScreen;