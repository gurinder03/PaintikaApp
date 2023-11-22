import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
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
import { RadioButton } from "react-native-paper";
import BackIcon from "react-native-vector-icons/Ionicons";
export default function EditProfile({ navigation }) {
  const [avatar, setAvatar] = useState("");
  const [selectedValue, setSelectedValue] = useState("freelancer");
  const [Info, setInfo] = useState({
    name: "",
    surname: "",
    qulification: "",
    age: "",
    occupation: "",
    email: "",
    gender: "",
    address: "",
    experience: "",
    country: "",
    state: "",
  });

  const onHandleChnage = (e, name) => {
    console.log("DATA IN HANDLER::::", e, name);
    if (name == "name") {
      setInfo({ ...Info, name: e });
    } else if (name == "email") {
      setInfo({ ...Info, email: e });
    } else if (name == "age") {
      setInfo({ ...Info, age: e });
    } else if ((name = "Gender")) {
      setInfo({ ...Info, gender: e });
    } else if (name == "surname") {
      setInfo({ ...Info, surname: e });
    } else if (name == "address") {
      setInfo({ ...Info, address: e });
    } else if (name == "professionalExp") {
      setInfo({ ...Info, experience: e });
    } else if (name == "qualification") {
      setInfo({ ...Info, qualification: e });
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

  const saveData = () => {
    const payloadData = {
      email_or_mobile_number: "elliotelderson@gmail.com",
      name: "Elliot111",
      surname: "abc",
      dob: "2023-10-22",
      address: "Nagar,Batala",
      gender: 1,
      qualifications: "graduation",
      country: "india",
      state: "punjab",
      experience: 0,
      additional_detail: "",
      id: "6522d6518d0f397d36f79fa9",
      job_type: "freelancer",
    };
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
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "30%",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon name="chevron-back" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "70%" }}>
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
              width: Platform.OS == "ios" ? wp(37) : wp(33),
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
              style={{
                width: Platform.OS == "ios" ? wp(35) : wp(30),
                height: hp(15),
                borderRadius: 90,
              }}
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
          title={"Surname"}
          onChange={(e) => onHandleChnage(e, "surname")}
          value={Info.surname}
          placeHolder={"Enter your Surname"}
        />
        <TextInputComponent
          title={"Email or Phone"}
          placeHolder={"Enter your Email or Phone"}
          onChange={(e) => onHandleChnage(e, "email")}
          value={Info.email}
        />
        <TextInputComponent
          title={"Qualification"}
          value={Info.qulification}
          placeHolder={"Enter your Qualifiaction"}
          onChange={(e) => onHandleChnage(e, "qualification")}
        />
        <CustomPicker
          title={"Gender"}
          onChange={(e) => onHandleChnage(e, "gender")}
          value={Info.gender}
        />
        <View
          style={{
            height: hp(10),
            width: "100%",
            padding: 6,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: FontStyles.manRopeSemiBold,
              color: Colors.black,
            }}
          >
            Are you professional or freelancer ?
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton.Android
                value="professional"
                status={
                  selectedValue === "professional" ? "checked" : "unchecked"
                }
                onPress={() => setSelectedValue("professional")}
                color={Colors.black}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.black,
                  fontFamily: FontStyles.manRopeSemiBold,
                }}
              >
                Professional
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton.Android
                value="freelancer"
                status={
                  selectedValue === "freelancer" ? "checked" : "unchecked"
                }
                onPress={() => setSelectedValue("freelancer")}
                color={Colors.black}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.black,
                  fontFamily: FontStyles.manRopeSemiBold,
                }}
              >
                Freelancer
              </Text>
            </View>
          </View>
        </View>
        {selectedValue == "professional" ? (
          <>
            <TextInputComponent
              title={"Experience in Painting"}
              placeHolder={"Please enter your experience in Numbers"}
              onChange={(e) => onHandleChnage(e, "professionalExp")}
            />
            <TextInputComponent
              title={"Additional Details"}
              placeHolder={"Additional Details"}
              onChange={(e) => onHandleChnage(e, "additionalDetails")}
            />
          </>
        ) : null}
        {/* <CustomPicker title={"Qualification"} /> */}
        <TextInputComponent
          title={"Experience"}
          placeHolder={"Please enter your experience in Numbers"}
          onChange={(e) => onHandleChnage(e, "experience")}
        />
        <TextInputComponent
          title={"Country"}
          value={Info.country}
          placeHolder={"Enter your country"}
          onChange={(e) => onHandleChnage(e, "country")}
        />
        <TextInputComponent title={"State"} placeHolder={"Enter your State"} />
        <TextInputComponent
          title={"Address"}
          value={Info.address}
          placeHolder={"Please enter your address"}
          onChange={(e) => onHandleChnage(e, "address")}
        />
        <CustomDatePicker
          value={new Date()}
          onChange={(e) => onHandleChnage(e, "dob")}
        />
        <CustomButton title={"SAVE"} onPress={saveData} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({});
