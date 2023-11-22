import { View, Text, Image, ScrollView, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import FontStyles from "../../constants/FontStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

export default function FilePreview({ route }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    size: "",
    theme: "",
    medium: "",
    quality: "",
    price: "",
    category: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [description, setdescription] = useState("");
  const [role, setrole] = useState("");
  const [userId, setuserId] = useState("");
  const [authToken, setauthToken] = useState("");
  const { path } = route?.params;
  console.log("🚀 ~ file: index.js:6 ~ FilePreview ~ path:", path);

  const handleChange = (name, e) => {
    if (name == "name") {
      setData({ ...data, name: e });
    } else if (name == "size") {
      setData({ ...data, size: e });
    } else if (name == "theme") {
      setData({ ...data, theme: e });
    } else if (name == "medium") {
      setData({ ...data, medium: e });
    } else if (name == "quality") {
      setData({ ...data, quality: e });
    } else if (name == "price") {
      setData({ ...data, price: e });
    } else if (name == "category") {
      setData({ ...data, category: e });
    }
  };

  const handleUpload = () => {
    let data = new FormData();

    if (path !== null) {
      data.append("image", path);

      console.log("Data::::::::", data);

      const payloadData = {
        token: authToken,
        userId: userId,
        image: data,
        description: description,
      };

      dispatch({ type: "ADD_PREORDER", payload: payloadData });
    }
  };
  useEffect(() => {
    getRole();
    getData();
    getAuthToken();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      console.log("🚀 ~ file: index.js:189 ~ getData ~ value:", value);
      if (value !== null) {
        setuserId(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authToken");
      console.log(
        "🚀 ~ file: index.js:200 ~ getAuthToken ~ jsonValue:",
        jsonValue
      );

      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };

  const getRole = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("role");
      console.log("🚀 ~ file: index.js:55 ~ getRole ~ jsonValue:", jsonValue);
      if (jsonValue !== null) {
        setrole(jsonValue);
      }
    } catch (e) {
      // read error
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
      }}
    >
      <View
        style={{
          height: "40%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: path }}
          style={{ width: "80%", height: "80%", borderBottomWidth: 2 }}
        />
      </View>
      <View
        style={{
          height: "60%",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {false ? (
          <ScrollView style={{ width: wp(90) }}>
            <TextInput
              onChange={() => {}}
              placeholder="Name"
              style={{
                height: hp(7),
                paddingLeft: wp(2),
                borderBottomWidth: 1,
              }}
            />
            <TextInput
              onChange={() => {}}
              placeholder="Size"
              style={{
                height: hp(7),
                paddingLeft: wp(2),
                borderBottomWidth: 1,
                marginTop: 2,
              }}
            />
            <TextInput
              onChange={() => {}}
              placeholder="Theme"
              style={{
                height: hp(7),
                paddingLeft: wp(2),
                borderBottomWidth: 1,
                marginTop: 2,
              }}
            />
            <TextInput
              onChange={() => {}}
              placeholder="Medium"
              style={{
                height: hp(7),
                paddingLeft: wp(2),
                borderBottomWidth: 1,
                marginTop: 2,
              }}
            />
            <TextInput
              onChange={() => {}}
              placeholder="Framing Quality"
              style={{
                height: hp(7),
                paddingLeft: wp(2),
                borderBottomWidth: 1,
                marginTop: 2,
              }}
            />
            <TextInput
              onChange={() => {}}
              placeholder="Price"
              style={{
                height: hp(7),
                paddingLeft: wp(2),
                borderBottomWidth: 1,
                marginTop: 2,
              }}
            />
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
              style={{ borderBottomWidth: 1 }}
            >
              <Picker.Item label="Category" value={"category"} />
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </ScrollView>
        ) : (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: hp(20),
            }}
          >
            <View style={{ width: "80%" }}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: FontStyles.manRopeSemiBold,
                  color: Colors.black,
                }}
              >
                Description
              </Text>
            </View>
            <TextInput
              style={{
                width: "80%",
                borderWidth: 1,
                height: "50%",
                borderRadius: 10,
                padding: 5,
                marginTop: 5,
              }}
              onChange={(e) => {
                setdescription(e);
              }}
              numberOfLines={5}
              multiline
              placeholder="Enter Description"
            />
          </View>
        )}

        <View
          style={{
            height: hp(10),
            width: wp(90),
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              height: hp(7),
              width: wp(40),
              backgroundColor: Colors.black,
              borderRadius: wp(8),
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => handleUpload()}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: FontStyles.manRopeSemiBold,
              }}
            >
              UPLOAD
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
