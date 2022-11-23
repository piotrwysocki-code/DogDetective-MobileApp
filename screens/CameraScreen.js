//Import libraries
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import uploadImage from "./UploadImage";
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { ActivityIndicator } from "react-native-paper";

const CameraScreen = (props) => {
  //Variables
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [zoom, setZoom] = useState(0);
  const [type, setType] = useState(CameraType.back);
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(true);

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

  useEffect(() => {
    setTimeout(() => {
        setAnimate(false);
    }, 10000);
  })

  //if permissions are not clear, do not open the camera
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  //this method changed the camera type and loows to flip the image
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
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

  //this method changes the zoom of the camera
    const changeZoom = (event) => {
      if (event.nativeEvent.scale > 1 && zoom < 1) {
        setZoom(zoom + 0.0009);
      }
      if (event.nativeEvent.scale < 1 && zoom > 0) {
        setZoom(zoom - 0.0009);
      }
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
        <View style={styles.container}>
          <Image style={styles.cameraContainer} source={{ uri: "data:image/jpg;base64," + photo.base64 }}/>
          <View style={styles.btnContainer2}>
          <TouchableOpacity style={styles.imageInPreview} title="Discard" onPress={() => {
              setPhoto(undefined) 
              setIsLoading(false)
              setAnimate(false)
            }}>
            <Image style={styles.imageInPreview} source={require("../assets/no.png")}/>
          </TouchableOpacity> 
          <View style={styles.space}></View>
         <TouchableOpacity style={styles.submitImage} title="Submit" onPress={() => {
            setIsLoading(true)
            setAnimate(true)
            uploadImage(photo, props)
          }}>
            <Image style={styles.submitImage} source={require("../assets/yes.png")}/>
          </TouchableOpacity>
         </View>
         {isLoading ? 
            <ActivityIndicator animating={animate} style={[styles.activity, {transform: [{ scale: 1.5 }]}]}  size="large" color="blue" ></ActivityIndicator>
          : 
          <Text></Text>
          }
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeWrapper}>
      <View style={styles.container}>
        <Camera
          zoom={zoom}
          ref={cameraRef}
          style={styles.camera}
          type={type}
        />
        <View style={styles.btnContainer1}>
          <TouchableOpacity style={styles.imageInCamera} onPress={pickImage}>
            <Image style={styles.imageInCamera} source={require("../assets/gallery.png")}/>
          </TouchableOpacity>
          <View style={styles.spaceForCamera}></View>
          <TouchableOpacity style={styles.takeImage} onPress={takePic}>
            <Image style={styles.takeImage} source={require("../assets/takeImage2.png")}/>
          </TouchableOpacity>
        </View>
        <View style={styles.snapWrapper}>
        <TouchableOpacity onPress={toggleCameraType}>
          <Image style={styles.flipCamera} source={require("../assets/flipCamera.png")}/>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
  
export default CameraScreen;

//css
const styles = StyleSheet.create({
  safeWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'relative',
  },
  cameraContainer: {
    width: "100%",
    height: "80%"
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageInCamera :{
    width: 60,
    height: 60
  },
  takeImage :{
    width: 100,
    height: 100
  },
  flipCamera:{
    backgroundColor: "white",
    borderRadius: "50%",
    height: 70,
    width: 70,
    top: "20%",
    right: "10%",
    justifyContent: "center",
  },
  snapWrapper: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    alignSelf: "flex-end"
  },
  imageInCamera:{
    height: 60,
    width: 60,
    marginLeft: "10%"
  },
  takeImage :{
    height: 100,
    width: 100,
  },
  spaceForCamera:{
    width: "15%",
  },
  activity: {
    position: "absolute",
    flexDirection: 'row',
    justifyContent: "center",
    alignSelf: "center",
    top: "40%",
  },
  btnContainer1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
  },
  //for the preview screen
  btnContainer2: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  space: {
    width: "25%",
  },
  imageInPreview:{
    height: 70,
    width: 70,
  },
  submitImage:{
    height: 73,
    width: 70,
  },
  });