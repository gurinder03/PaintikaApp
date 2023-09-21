import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import LottieView from "lottie-react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ImagePicker, launchImageLibrary } from "react-native-image-picker";

export default function VisualSearch({ navigation }) {
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
  };
  const selectImage = () => {
    console.log("IMAGE WORKINg");
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        setAvatar({ uri: response.uri });
        navigation.navigate("Preview", { path: response?.assets[0]?.uri });
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
          <TouchableOpacity style={styles.uploadBtn1}>
            <Text style={styles.uploadBtnText1}>TAKE A PHOTO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBtn2} onPress={selectImage}>
            <Text style={styles.uploadBtnText2}>UPLOAD AN IMAGE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
