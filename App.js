/*
* App.js
* This is where all the magic happens
*/

//Import libraries
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data'
import file from './assets/pickImage.png'


export default function App() {
  //Variables
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  let newPhoto;

  //request permissions from the user
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  //if permissions are not clear, do not open the camera
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  //method to snap a picture 
  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    newPhoto = await cameraRef.current.takePictureAsync(options);
    
    //console.log(newPhoto);

    setPhoto(newPhoto);
  };

  // This function is triggered when the "Select an image" button pressed
  const pickImage = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    };

    if (permissionResult === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if(result.cancelled === true){
      setPhoto(undefined)
    } else{
      newPhoto = result;
      setPhoto(newPhoto)
    }

  }

  const upload = async (file) => {
       
    console.log(photo);

    axios.post('http://99.79.108.211/api.classify', photo.uri)
    .then(result => {
        console.log(result.data)
    }).catch(err => {
        console.log(err.response.data)
    })

    try {
      console.log("Upload Image", photo.uri);

      const formData = new FormData();
      formData.append("filename", photo.uri);
      console.log("____________________");

      console.log("Form Data", formData);

      const config = {
        headers: {
          "accept": "application/json",
          "content-type": "multipart/form-data"
        }
      };

      const url = 'http://99.79.108.211/api/classify';
  
      const result = await axios.post(url, formData, config);
      console.log("RESULT: ", result);
    } catch (error) {
      console.error("ERORO___________ " + error);
    }
  };

  if (photo) {
    //saves photo to user's gall
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined); //get rid of the preview screen
      });
    };

    //After user takes a picture, preview will be displayed with 2 options
    // Save image to the camera roll (which will later be send to our model)
    //Discard, which will return back to the camera screen
    return (
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: "data:image/jpg;base64," + photo.base64 }} style={styles.container}/>
        {hasMediaLibraryPermission ? 
        <TouchableOpacity title="Submit" onPress={upload}>
          <Image style={styles.submitImage} source={require("./assets/yes.png")}/>
        </TouchableOpacity>
         : undefined}
        <TouchableOpacity title="Discard" onPress={() => setPhoto(undefined)}>
          <Image style={styles.discardImage} source={require("./assets/no.png")}/>
        </TouchableOpacity> 
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.column} onPress={takePic}>
        <Image style={styles.takeImage} source={require("./assets/takeImage2.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={pickImage}>
        <Image style={styles.gallery} source={require("./assets/gallery.png")}/>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

//css
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 700,
  },
  history: {
    height: 45,
    width: 45,
    left: "66%",
    top: "180%"
  },
  takeImage: {
    height: 100,
    width: 100,
    left: "37%"
  },
  gallery: {
    height: 50,
    width: 50,
    left: "20%",
    top: "-130%"
    },

  discardImage:{
    height: 70,
    width: 70,
    color: "white",
    bottom: "450%",
    left: "25%"
  },
  submitImage:{
    height: 75,
    width: 70,
    color: "white",
    bottom: "325%",
    left: "60%"
  },
  preview: {

    height: '99%',
    width: "100%",
    alignSelf: "center",
    bottom: "5%"
  },
});