//Import libraries
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import uploadImage from "./UploadImage";


const CameraScreen = (props) => {
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
      setPhoto(result)
    }

  }

  if (photo) {
    //saves photo to user's gallery
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined); //get rid of the preview screen
      });
    };

    //After user takes a picture, preview will be displayed with 2 options
    // Save image to the camera roll (which will later be send to our model)
    //Discard, which will return back to the camera screen
    return (
      <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
      <Image style={styles.cameraContainer} source={{ uri: "data:image/jpg;base64," + photo.base64 }}/>
      </View>
      {hasMediaLibraryPermission ? 
        <TouchableOpacity style={styles.submitImage} title="Submit" onPress={() => uploadImage(photo, props)} >
          <Image style={styles.submitImage} source={require("../assets/yes.png")}/>
        </TouchableOpacity>
         : undefined}
        <TouchableOpacity style={styles.discardImage} title="Discard" onPress={() => setPhoto(undefined)}>
          <Image style={styles.discardImage} source={require("../assets/no.png")}/>
        </TouchableOpacity> 
   </View>
    );
  }

  return (
    <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
            <Camera style={styles.container} ref={cameraRef}/>
      </View>
      <TouchableOpacity style={styles.column} onPress={takePic}>
        <Image style={styles.takeImage} source={require("../assets/takeImage2.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={pickImage}>
        <Image style={styles.gallery} source={require("../assets/gallery.png")}/>
        </TouchableOpacity>
   </View>
  );
};
  
export default CameraScreen;

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
    image: {
      height: 400,
      width: 415,
      position: "relative"
    },
    takeImage: {
      height: 100,
      width: 100,
      left: "37%",
      top: "10%"
    },
    gallery: {
      height: 50,
      width: 50,
      left: "20%",
      top: "-125%"
      },
      discardImage:{
        height: 70,
        width: 70,
        bottom: "3%",
        left: "20%"
      },
      submitImage:{
        height: 75,
        width: 70,
        bottom: "-5.6%",
        left: "50%",
        padding: 0,
      },
      cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio:{
        flex: 1,
        aspectRatio: 1
    },
  });