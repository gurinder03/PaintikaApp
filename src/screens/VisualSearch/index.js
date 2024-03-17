import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Linking,
  Platform
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import LottieView from "lottie-react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as ImagePicker from 'react-native-image-picker';

import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions'
import appConfig from '../../../app.json'


export default function VisualSearch({ navigation }) {
  const { Release = 13 } = Platform.constants
  const [avatar, setAvatar] = useState("");
  var options = {
    title: "Select Image",
    customButtons: [
      {
        name: "customOptionKey",
        title: "Choose Photo from Custom Option",
      },
    ],
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
    width: 300,
    height: 400,
    cropping: true,
    mediaType: 'photo',
    //compressImageQuality: 0.7,
  };

  const requestPermission = (type) => {
    if (Platform.OS == 'ios') {
      request(type == 'Gallery' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.IOS.CAMERA)
        .then(result => {
          checkSwitchCase(result, type)
        })
        .catch(error => console.warn('errr', error))
    } else {
      request(type == 'Gallery' ? parseInt(Release) >= 13 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE : PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          checkSwitchCase(result, type)
        })
        .catch(error => console.warn('errr', error))
    }
  }

  const goToSettings = (type) => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings')
      })
    }
    Alert.alert(
      appConfig.displayName,
      `Turn on ${type == 'Gallery' ? 'Photos permission' : 'Camera permission'} to allow "${appConfig.displayName}" upload images`,
      [
        { text: 'Go to Settings', onPress: openSetting },
        {
          text: "Don't Use ",
          onPress: () => { },
        },
      ],
    )
  }

  const checkSwitchCase = async (status, type) => {
    switch (status) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'UNAVAILABLE',
          'This feature is not available (on this device / in this context)',
        )
        break
      case RESULTS.DENIED:
        console.log(
          'DENIED',
          'The permission has not been requested / is denied but requestable',
        )
        requestPermission(type)
        break
      case RESULTS.LIMITED:
        goToSettings(type)
        console.log(
          'LIMITED',
          'The permission is limited: some actions are possible',
        )
        break
      case RESULTS.GRANTED:
        console.log('GRANTED', 'The permission is granted')
        if (type == 'Gallery') {
          selectImage()
        } else {
          captureImage()
        }
        break
      case RESULTS.BLOCKED:
        goToSettings(type)
        console.log(
          'BLOCKED',
          'The permission is denied and not requestable anymore',
        )
        break
    }
  }

  const checkSpecificPermission = (type) => {
    check(
      Platform.OS == 'ios'
        ? type == 'Gallery' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.IOS.CAMERA
        : type == 'Gallery' ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(result => {
        checkSwitchCase(result, type)
      })
      .catch(error => {
        console.warn('error1', error)
      })
  }

  const captureImage = () => {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // setAvatar({ uri: response.uri });
        navigation.navigate("Preview", { path: response?.assets });
        // here we can call a API to upload image on server
      }
    });
  };
  const selectImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        setAvatar({ uri: response.uri });
        navigation.navigate("Preview", { path: response?.assets });
        // here we can call a API to upload image on server
      }
    });
  };
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/animations/fileShare.json")}
        autoPlay
        style={{
          height: hp(30),
          width: wp(70),
        }}
      />
      <View style={styles.innerBox}>
        <Text style={styles.headline}>
          Search for an painting by taking a photo or uploading an image.
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.uploadBtn1}
            onPress={() => checkSpecificPermission('Camera')}
          >
            <Text style={styles.uploadBtnText1}>TAKE A PHOTO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBtn2} onPress={() => checkSpecificPermission('Gallery')}>
            <Text style={styles.uploadBtnText2}>UPLOAD AN IMAGE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
