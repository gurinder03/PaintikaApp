import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../../components/HeaderScreen";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  ImagePicker,
  launchImageLibrary,
  launchCamera,
} from "react-native-image-picker";
import TextInputComponent from "../../helpers/TextInput";
import CustomDatePicker from "../../helpers/CustomDatePicker";
import { ScrollView } from "react-native-gesture-handler";
import CustomPicker from "../../helpers/CustomPicker";
import Colors from "../../constants/Colors";
import FontStyles from "../../constants/FontStyles";
import CustomButton from "../../helpers/CustomButton";
import EditIcon from "react-native-vector-icons/Entypo";
export default function EditProfile() {
  const [avatar, setAvatar] = useState("");
  const [Info, setInfo] = useState({
    name: "",
    qulification: "",
    age: "",
    occupation: "",
    email: "",
    gender: "",
  });

  const onHandleChnage = (e, name) => {
    if (name == "name") {
      setInfo({ ...Info, name: e });
    } else if (name == "email") {
      setInfo({ ...Info, email: e });
    } else if (name == "age") {
      setInfo({ ...Info, age: e });
    } else if ((name = "Gender")) {
      setInfo({ ...Info, gender: e });
    }
  };
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
        setAvatar(response?.assets[0]?.uri);

        // here we can call a API to upload image on server
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <View
        style={{
          height: hp(10),
          backgroundColor: "#FFFFFF",
          width: wp(100),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.black,
            fontFamily: FontStyles.manRopeSemiBold,
            fontSize: 22,
          }}
        >
          Edit Profile
        </Text>
      </View>
      <ScrollView
        style={{
          height: hp(85),
          width: wp(100),
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: wp(33),
              height: hp(17),
              borderRadius: 150,
              borderWidth: 2.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={
                avatar !== ""
                  ? { uri: avatar }
                  : require("../../../assets/download.jpeg")
              }
              style={{ width: wp(30), height: hp(15), borderRadius: 90 }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.black,
              width: wp(9),
              height: hp(4),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 90,
              position: "absolute",
              left: wp(60),
              top: hp(3),
            }}
            onPress={selectImage}
          >
            <EditIcon name="edit" size={18} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <TextInputComponent
          title={"Name"}
          onChange={(e) => onHandleChnage(e, "name")}
          value={Info.name}
          placeHolder={"Enter your Name"}
        />
        <TextInputComponent
          title={"Email"}
          placeHolder={"Enter your Email"}
          onChange={(e) => onHandleChnage(e, "email")}
          value={Info.email}
        />
        <TextInputComponent
          title={"Age"}
          value={Info.age}
          placeHolder={"Enter your age in Numbers"}
          onChange={(e) => onHandleChnage(e, "age")}
        />
        <CustomPicker
          title={"Gender"}
          onChange={onHandleChnage}
          value={Info.gender}
        />
        <CustomPicker title={"Qualification"} />
        <TextInputComponent
          title={"Experience"}
          placeHolder={"Please enter your experience in Numbers"}
        />

        <CustomDatePicker value={new Date()} onChange={onHandleChnage} />
        <CustomButton title={"SAVE"} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({});
