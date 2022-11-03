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
    }, 11000);
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
        setZoom(zoom + 0.0005);
      }
      if (event.nativeEvent.scale < 1 && zoom > 0) {
        setZoom(zoom - 0.0005);
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
      <View style={{ flex: 1}}>
        <View style={styles.cameraContainer}>
          <Image style={styles.cameraContainer} source={{ uri: "data:image/jpg;base64," + photo.base64 }}/>
        </View>
        {isLoading ? 
          <ActivityIndicator animating={animate} style={[styles.activity, {transform: [{ scale: 1.5 }]}]}  size="large" color="blue" ></ActivityIndicator>
         : 
         <Text></Text>
         }
          <TouchableOpacity style={styles.submitImage} title="Submit" onPress={() => {
            setIsLoading(true)
            setAnimate(true)
            uploadImage(photo, props)
          }}>
            <Image style={styles.submitImage} source={require("../assets/yes.png")}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.discardImage} title="Discard" onPress={() => setPhoto(undefined)}>
            <Image style={styles.discardImage} source={require("../assets/no.png")}/>
          </TouchableOpacity>  
      </View>
    );
  }

  return (
    <PinchGestureHandler onGestureEvent={(event) => changeZoom(event)}>
    <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
            <Camera zoom={zoom} type={type} style={styles.container} ref={cameraRef}/>
      </View>
      <TouchableOpacity style={styles.column} onPress={takePic}>
        <Image style={styles.takeImage} source={require("../assets/takeImage2.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={pickImage}>
        <Image style={styles.gallery} source={require("../assets/gallery.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={toggleCameraType}>
        <Image style={styles.flipCamera} source={require("../assets/flipCamera.png")}/>
        </TouchableOpacity>
   </View>
   </PinchGestureHandler>
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
      flipCamera:{
        height: 50,
        width: 50,
        right: "-84%",
        top: "-1460%",
        backgroundColor: "white",
        borderRadius: "50%",
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
    activity: {
      bottom: "40%"
    }
  });