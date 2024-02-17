import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
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
import styles from "../HomeScreen/styles";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { getStateData } from "../../redux/actions";


export default function EditProfile({ navigation, route }) {
  const dispatch = useDispatch();
  const [authToken, setauthToken] = useState(null);
  const { userData } = route.params || {};
  const [avatar, setAvatar] = useState(userData?.profile_image);
  const allStateData = useSelector((state) => state.saveDataReducer.stateData);

  console.log("authToken cccccc => ", allStateData);

  const stateOptions = [
    { label: "Select City", value: null },
    { label: "Mohali", value: "Mohali" },
    { label: "Kharar", value: "Kharar" },
    { label: "Patiala", value: "Patiala" },
    { label: "Andaman and Nicobar Islands", value: "Andaman and Nicobar Islands" }
  ];

  useEffect(() => {
    getAuthToken();
    dispatch(getStateData({token: authToken}));
  }, [authToken]);

  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authToken");
      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log("Error While getting Token", e);
    }
  };

  const [Info, setInfo] = useState({
    name: userData?.name,
    surname: userData?.surname,
    qulification: userData?.qualifications,
    age: "",
    occupation: "",
    email_or_mobile_number: userData?.email_or_mobile_number,
    gender: userData?.gender,
    job_type: userData?.job_type,
    address: "",
    experience: userData?.experience,
    additional_detail: userData?.additional_detail,
    country: userData?.country,
    state: userData?.state,
  });

  const onHandleChnage = (e, name) => {
    console.log("DATA IN HANDLER::::", e, name);
    if (name === "name") {
      setInfo({ ...Info, name: e });
    } else if (name === "email_or_mobile_number") {
      setInfo({ ...Info, email_or_mobile_number: e });
    } else if (name === "age") {
      setInfo({ ...Info, age: e });
    } else if (name === "gender") {
      setInfo({ ...Info, gender: e });
    } else if (name === "job_type") {
      setInfo({ ...Info, job_type: e });
    } else if (name === "surname") {
      setInfo({ ...Info, surname: e });
    } else if (name === "address") {
      setInfo({ ...Info, address: e });
    } else if (name === "experience") {
      setInfo({ ...Info, experience: e });
    } else if (name === "qualification") {
      setInfo({ ...Info, qualification: e });
    } else if (name === "additional_detail") {
      setInfo({ ...Info, additional_detail: e });
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
      // console.log("Response = ", response);
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
      gender: "1",
      qualifications: "graduation",
      country: "india",
      state: "punjab",
      experience: 0,
      additional_detail: "",
      id: "6522d6518d0f397d36f79fa9",
      job_type: "freelancer",
    };
  };

  const onSelected = (ev) => {
    console.log('ev => ', ev);
    setInfo({ ...Info, state: ev });
  };




  return (
    <View style={styles.editMain}>
      <View style={styles.edit2dInner}>
        <View style={{ width: "30%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon name="chevron-back" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "70%" }}>
          <Text style={styles.textEdit}>Edit Profile</Text>
        </View>
      </View>
      <ScrollView style={styles.editScrollMain}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: Platform.OS == "ios" ? wp(37) : wp(33),
              height: hp(17),
              borderRadius:100,
              borderWidth: 2.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={
                avatar
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
          <TouchableOpacity style={styles.editIcon} onPress={selectImage}>
            <EditIcon name="edit" size={18} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <TextInputComponent
          title={"Name"}
          onChange={(e) => onHandleChnage(e, "name")}
          value={Info.name}
          placeHolder={"Enter your Name "}
         
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
          onChange={(e) => onHandleChnage(e, "email_or_mobile_number")}
          value={Info.email_or_mobile_number}
        />
       
        <Text style={styles.genderSection}> Gender</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton.Android
              value="1"
              status={Info.gender === "1" ? "checked" : "unchecked"}
              onPress={() => onHandleChnage("1", "gender")}
              color={Colors.black}
            />
            <Text style={styles.editPro}> Male </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton.Android
              value="2"
              status={Info?.gender === "2" ? "checked" : "unchecked"}
              onPress={() => onHandleChnage("2", "gender")}
              color={Colors.black}
            />
            <Text style={styles.genderInner}>Female</Text>
          </View>
        </View>
        <View style={styles.editType}>
          <Text style={styles.freeLancingType}>
            Are you professional or freelancer ?
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton.Android
                value="professional"
                status={
                  Info?.job_type === "professional" ? "checked" : "unchecked"
                }
                onPress={() => onHandleChnage("professional", "job_type")}
                color={Colors.black}
              />
              <Text style={styles.typeOfFreelancing}> Professional </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton.Android
                value="freelancer"
                status={
                  Info?.job_type === "freelancer" ? "checked" : "unchecked"
                }
                onPress={() => onHandleChnage("freelancer", "job_type")}
                color={Colors.black}
              />
              <Text style={styles.typeOfFreelancing}> Freelancer </Text>
            </View>
          </View>
        </View>
        {Info?.job_type == "professional" ? (
          <>
            <TextInputComponent
              title={"Experience in Painting"}
              value={Info?.experience}
              placeHolder={"Please enter your experience in Numbers"}
              onChange={(e) => onHandleChnage(e, "experience")}
            />
            <TextInputComponent
              title={"Additional Details"}
              placeHolder={"Additional Details"}
              value={Info?.additional_detail}
              onChange={(e) => onHandleChnage(e, "additional_detail")}
            />
          </>
        ) : null}
        {/* <TextInputComponent
          title={"Experience"}
          placeHolder={"Please enter your experience in Numbers"}
          onChange={(e) => onHandleChnage(e, "experience")}
        /> */}
        <TextInputComponent
          title={"Country"}
          value={Info?.country}
          placeHolder={"Enter your country"}
          onChange={(e) => onHandleChnage(e, "country")}
        />
        <View style={{borderBottomWidth:1, marginHorizontal:5}}>
          <Text style={styles.stateEdt}>State</Text>
          <Picker selectedValue={Info?.state} onValueChange={onSelected}>
            {stateOptions.map((option, index) => (
              <Picker.Item key={index} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
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
