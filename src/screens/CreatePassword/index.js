import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import Colors from "../../constants/Colors";
import FontStyles from "../../constants/FontStyles";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../helpers/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreatePassword() {
  const dispatch = useDispatch();
  const [intialPassword, setintialPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [userId, setuserId] = useState("");
  const [authToken, setauthToken] = useState(null);
  const isLoading = useSelector((state) => state.saveDataReducer.isLoading);

  useEffect(() => {
    getData();
    getAuthToken();
  }, []);

  const changePassword = () => {
    if (userId !== "") {
      if (intialPassword == "") {
        Alert.alert("Please enter current password.");
      } else if (newPassword == "") {
        Alert.alert("New Password is required.");
      } else if (newPassword !== confirmPassword) {
        Alert.alert("Confirm Password didn't matched with new password.");
      } else {
        const payload = {
          token: authToken,
          id: userId,
          current_password: intialPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        };

        dispatch({ type: "CHANGE_PASSWORD", payload: payload });
      }
    }
  };

  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authToken");
      // console.log("🚀 ~ file: index.js:38 ~ getAuthToken ~ jsonValue:",  jsonValue);
      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      // console.log("🚀 ~ file: index.js:189 ~ getData ~ value:", value);
      if (value !== null) {
        setuserId(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: "35%",
          justifyContent: "center",
          alignItems: "center",
          marginTop:10
        }}
      >
        <Text style={styles.otpTitle}>Change Password</Text>
        <View
          style={{
            height: 200,
            width: 350,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("../../../assets/animations/otpanimation.json")}
            autoPlay
            style={{ height: 120, width: 120 }}
          />
        </View>
      </View>
      <View style={{ height: "65%" }}>
        <View
          style={{
            paddingHorizontal: 20,
            width: "100%",
            height: 20,
            justifyContent: "center",
          }}
        ></View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setintialPassword(e)}
            value={intialPassword}
            placeholder="Current Password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => setnewPassword(e)}
            value={newPassword}
            placeholder="New password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => setconfirmPassword(e)}
            value={confirmPassword}
            placeholder="Confirm password"
            secureTextEntry
          />
          <ActivityIndicator size={"large"} animating={isLoading} />
          <CustomButton
            title={"Change Password"}
            onPress={() => changePassword()}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  input: {
    height: 65,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    fontFamily: FontStyles.manRopeRegular,
    backgroundColor: Colors.white,
    elevation: 5,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  otpTitle: {
    fontSize: 28,
    fontFamily: FontStyles.manRopeMedium,
    color: `${Colors.black}`,
    fontWeight: "800",
  },
});
