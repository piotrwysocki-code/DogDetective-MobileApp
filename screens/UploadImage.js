import * as FileSystem from 'expo-file-system';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native'; // importing components
import ResultScreen from './ResultScreen';


const UploadImage = (photo, props) => {

    FileSystem.uploadAsync(
    'http://15.222.119.165:4000/upload',      //our server
    photo.uri,{                               //user's uploaded photo 
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file',
      mimeType: 'image/png',
    }).then((response) => {
        //console.log(response);

        props.navigation.navigate('Result', {
          result: response.body,
          img: photo
        });
        
    }).catch((error) => {
      console.log(error);
    });

    console.log(photo.uri)
  };

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});