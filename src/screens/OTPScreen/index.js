import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { TextInput } from "react-native-gesture-handler";
import CustomButton from "../../helpers/CustomButton";
import Colors from "../../constants/Colors";
import FontStyles from "../../constants/FontStyles";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { verifyOTP } from "../../redux/actions";
export default function OtpScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { role } = route?.params || {};
  const [input, setinput] = useState("");
  const otp = useSelector((state) => state.saveDataReducer.otp);
  const savedEmail = useSelector((state) => state.saveDataReducer.savedEmail);
  const isLoading = useSelector((state) => state.saveDataReducer.isLoading);
  console.log("🚀 ~ file: index.js:15 ~ OtpScreen ~ savedEmail:", savedEmail);
  console.log("🚀 ~ file: index.js:12 ~ OtpScreen ~ otp:", otp);
  const userEmail = savedEmail;
  const handleChange = (e) => {
    setinput(e);
  };

  const goverifyOtp = () => {
    if (otp !== undefined && input !== otp) {
      Toast.show({
        type: "error",
        text1: `Please Enter Correct OTP ❌`,
        topOffset: 60,
      });

      console.log("INSIDE IF");
    } else {
      dispatch(
        verifyOTP({
          role: role,
          otp: input,
          email: userEmail,
        })
      );
    }
  };

  useEffect(() => {
    if (otp !== undefined) {
      setinput(otp);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          height: "40%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 300,
            width: 350,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("../../../assets/animations/otpanimation.json")}
            autoPlay
            style={{ height: 150, width: 150 }}
          />
        </View>
      </View>
      <View style={{ height: "60%" }}>
        <View
          style={{
            paddingHorizontal: 20,
            width: "100%",
            height: 40,
            justifyContent: "center",
          }}
        >
          <Text style={styles.otpTitle}>
            Enter Otp 4 Digit Code for verification.
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(e) => handleChange(e)}
            value={input}
            inputMode="numeric"
            placeholder="Enter OTP"
          />
          <ActivityIndicator size={"large"} animating={isLoading} />
          <CustomButton title={"VERIFY"} onPress={() => goverifyOtp()} />
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
  },
  otpTitle: {
    fontSize: 15,
    fontFamily: FontStyles.manRopeMedium,
    color: `${Colors.black}`,
  },
});
