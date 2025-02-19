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
import {
  startOtpListener,
  removeListener
} from 'react-native-otp-verify';

export default function OtpScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { role, isForgot } = route?.params || {};
  const [input, setInput] = useState('');
  const savedEmail = useSelector((state) => state.saveDataReducer.savedEmail);
  const isLoading = useSelector((state) => state.saveDataReducer.isLoading);
  const userEmail = savedEmail;

  const handleChange = (e) => {
    setInput(e);
  };

  useEffect(() => {
    startOtpListener(message => {
      try {
        const otpMatch = message.match(/(\d{6})/);
          if (otpMatch && otpMatch[1]) {
            const otp = otpMatch[1];
            setInput(otp);
            goverifyOtp(otp);
          }
      } catch (e) {
        console.log(e);
      }
    });
    return () => removeListener();
  }, []);

  const goverifyOtp = (otp) => {
    if (!otp) {
      Toast.show({
        type: "error",
        text1: "OTP is not found ❌",
        topOffset: 60,
      });
      return;
    } else {
      dispatch(
        verifyOTP({
          role: role,
          otp: otp,
          email: userEmail,
          isForgot: isForgot,
        })
      );
    }
  };

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
            Enter Otp 6 Digit Code for verification.
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
          <CustomButton title={"VERIFY"} onPress={() => goverifyOtp(input)} />
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
    height: 50,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: Colors.white,
    elevation: 5,
    fontFamily: FontStyles.manRopeRegular,
    borderWidth: 1,
  },
  otpTitle: {
    fontSize: 15,
    fontFamily: FontStyles.manRopeMedium,
    color: `${Colors.black}`,
  },
});
