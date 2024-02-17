import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import TextInputComponent from "../../../helpers/TextInput";
import CustomPicker from "../../../helpers/CustomPicker";
import FontStyles from "../../../constants/FontStyles";
import Colors from "../../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../../helpers/CustomButton";
import BackIcon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddAddress({ route, navigation }) {
  const dispatch = useDispatch();
  const [Info, setInfo] = useState({
    name: "",
    qulification: "",
    pincode: "",
    occupation: "",
    phone: "",
    gender: "",
    address: "",
    experience: "",
    country: "",
    state: "",
    city: "",
    landmark: "",
    alternate: "",
    addressType: "",
  });
  const [userId, setuserId] = useState(null);
  const [authToken, setauthToken] = useState(null);
  // console.log("🚀 ~ file: index.js:37 ~ AddAddress ~ authToken:", authToken, userId);
  const states = [
    {
      name: "Punjab",
    },
    {
      name: "Uttar Pradesh (Up)",
    },
    {
      name: "Haryana",
    },
    {
      name: "Himachal",
    },
  ];
  const addressType = [
    {
      name: "Home",
    },
    {
      name: "Work",
    },
  ];

  useEffect(() => {
    getData();
    getAuthToken();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      // console.log("🚀 ~ file: index.js:30 ~ getData ~ value:", value);
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
      // console.log("🚀 ~ file: index.js:41 ~ getAuthToken ~ jsonValue:", jsonValue);

      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };

  const onHandleChnage = (e, name) => {
    // console.log("DATA IN HANDLER::::", e, name);
    if (name == "name") {
      setInfo({ ...Info, name: e });
    } else if (name == "phone") {
      setInfo({ ...Info, phone: e });
    } else if (name == "pincode") {
      setInfo({ ...Info, pincode: e });
    } else if ((name = "city")) {
      setInfo({ ...Info, city: e });
    } else if (name == "state") {
      setInfo({ ...Info, state: e });
    } else if (name == "address") {
      Alert.alert("INSIDE ADDRESS");
      setInfo({ ...Info, address: e });
    } else if (name == "landmark") {
      setInfo({ ...Info, landmark: e });
    } else if (name == "alternate") {
      setInfo({ ...Info, alternate: e });
    } else if (name == "addressType") {
      setInfo({ ...Info, addressType: e });
    }
  };
  // console.log("AFTER CHNAGE IN STATE::::", Info);
  const saveAddress = () => {
    if (authToken !== null && userId !== null) {
      const postData = {
        lat: "44.00155",
        lng: "75.20524",
        name: Info?.name,
        type: Info?.addressType,
        token: authToken,
        user_id: userId,
        address: {
          address: Info.address,
          allternatePhone: Info.alternate,
          city: Info.city,
          delveryType: Info.addressType,
          landmark: Info.landmark,
          locality: "",
          phoneNumber: Info.phone,
          pinCode: Info.pincode,
          state: Info.state,
        },
      };
      dispatch({ type: "ADD_ADDRESS", payload: postData });
    }
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          backgroundColor: "grey",
          justifyContent: "center",
          alignItems: "center",
          height: "10%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            height: "100%",
            width: "30%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon name="chevron-back" size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
            width: "70%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: FontStyles.manRopeSemiBold,
              color: Colors.black,
            }}
          >
            Add New Address
          </Text>
        </View>
      </View>
      <ScrollView style={{ width: "100%", height: "90%" }}>
        <TextInputComponent
          title={"Name"}
          onChange={(e) => onHandleChnage(e, "name")}
          value={Info?.name}
          placeHolder={"Enter your Name"}
        />

        <TextInputComponent
          title={"Phone"}
          placeHolder={"Enter your Phone Number"}
          onChange={(e) => onHandleChnage(e, "phone")}
          value={Info?.email}
          type={"number"}
        />
        <TextInputComponent
          title={"Pincode"}
          onChange={(e) => onHandleChnage(e, "pincode")}
          value={Info?.pincode}
          placeHolder={"Enter your Pincode"}
          type={"number"}
        />
        <View style={styles.container}>
          <Text style={styles.placeHolder}>Address</Text>
          <TextInput
            style={{
              width: "100%",
              height: 60,
              borderBottomWidth: 1,
              borderBottomColor: Colors.black,
            }}
            onChangeText={(e) => setInfo({ ...Info, address: e })}
            value={Info?.address}
            placeholder={"Enter complete address"}
          />
        </View>
        <TextInputComponent
          title={"City"}
          value={Info?.city}
          placeHolder={"Enter your City"}
          onChange={(e) => onHandleChnage(e, "city")}
        />
        <View style={styles.container}>
          <Text style={styles.placeHolder}>Landmark</Text>
          <TextInput
            style={{
              width: "100%",
              height: 60,
              borderBottomWidth: 1,
              borderBottomColor: Colors.black,
            }}
            onChangeText={(e) => setInfo({ ...Info, landmark: e })}
            value={Info?.landmark}
            placeholder={"Enter your landmark"}
          />
        </View>
        <CustomPicker
          title={"State"}
          onChange={(e) => setInfo({ ...Info, state: e })}
          customValues={states}
          value={Info?.state}
        />
        <View style={styles.container}>
          <Text style={styles.placeHolder}>Alternate Mobile</Text>
          <TextInput
            style={{
              width: "100%",
              height: 60,
              borderBottomWidth: 1,
              borderBottomColor: Colors.black,
            }}
            onChangeText={(e) => setInfo({ ...Info, alternate: e })}
            value={Info?.alternate}
            keyboardType="numeric"
            placeholder={"Alternate Phone (optional)"}
          />
        </View>
        <CustomPicker
          title={"Address Type"}
          onChange={(e) => setInfo({ ...Info, addressType: e })}
          customValues={addressType}
          value={Info?.addressType}
        />
        <CustomButton title={"Save Address"} onPress={() => saveAddress()} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  placeHolder: {
    fontSize: 17,
    color: Colors.black,
    fontFamily: FontStyles.manRopeSemiBold,
  },
});
