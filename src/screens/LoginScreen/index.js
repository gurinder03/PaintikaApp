import { View, Text, Image, Alert, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import TextInputComponent from "../../helpers/TextInput";
import CustomButton from "../../helpers/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import RightIcon from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
import FontStyles from "../../constants/FontStyles";
import ToggleSwitch from "toggle-switch-react-native";
import { login } from "../../redux/actions";
import BackIcon from "react-native-vector-icons/Ionicons";
export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.saveDataReducer.signUpData);
  console.log('userData ', userData);
  const [inputValue, setinputValue] = useState({
    email: "",
    password: "",
  });
  const [isPainter, setisPainter] = useState(false);
  const gotToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleChange = (name, e) => {
    if (name == "email") {
      setinputValue({ ...inputValue, email: e });
    } else {
      setinputValue({ ...inputValue, password: e });
    }
  };
  const saveData = () => {
    if (inputValue.email == "") {
      Alert.alert("Email is required.");
    } else if (inputValue.password == "") {
      Alert.alert("Password is required.");
    } else {
      // dispatch(saveSignInData(inputValue));
      // navigation.navigate('Home');
      dispatch(
        login({
          email: inputValue.email,
          password: inputValue.password,
          role: isPainter ? "ARTIST" : "USER",
        })
      );
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <BackIcon name="chevron-back-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headingTitle}>Login</Text>
      </View>
      <View style={styles.inputContainer}>
        <View
          style={{
            height: 45,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingHorizontal: 10,
          }}
        >
          <ToggleSwitch
            isOn={isPainter}
            onColor={Colors.black}
            offColor="#C8C8C8"
            label="Are you Artist?"
            labelStyle={{
              color: `${Colors.black}`,
              fontSize: 18,
              fontStyle: FontStyles.manRopeMedium,
            }}
            size="medium"
            onToggle={(isOn) => setisPainter(isOn)}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(e) => handleChange("email", e)}
          value={inputValue.email}
          placeholder="Email or Phone Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => handleChange("password", e)}
          value={inputValue.password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <View style={styles.forgotPasswrd}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
                <Text style={styles.forgotPasswrdTitle}>
                  Forgot your password ?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title={"LOGIN"} onPress={saveData} />
        <View
          style={{
            height: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 25,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                fontFamily: FontStyles.manRopeRegular,
              }}
            >
              Don't have an account ?{" "}
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text
                style={{
                  color: `${Colors.black}`,
                  fontWeight: "600",
                  fontFamily: FontStyles.manRopeRegular,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.socialLogin}>
        <Text style={styles.socialTitle}>Or login with social account</Text>
        <View style={styles.socialLinks}>
          <View style={styles.iconContainer}>
            <Image source={require("../../../assets/facebook.png")}  style={styles.icon} />
          </View>
          <View style={styles.iconContainer}>
            <Image source={require("../../../assets/Google.png")}  style={styles.googleIcon} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.white,
  },
  heading: {
    height: "20%",
    width: "100%",
    padding: 5,
  },
  headingTitle: {
    fontSize: 30,
    fontFamily: FontStyles.manRopeSemiBold,
    // fontWeight: '800',
    color: Colors.black,
    marginTop: 9,
  },
  inputContainer: {
    height: "40%",
    justifyContent: "center",
  },
  buttonContainer: {
    height: "20%",
  },
  socialLogin: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius:8,
    padding: 10,
    paddingLeft:15,
    backgroundColor: Colors.white,
    elevation: 5,
    fontFamily: FontStyles.manRopeRegular,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  socialLinks: {
    height: "70%",
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  socialTitle: {
    fontSize: 14,
    fontFamily: FontStyles.manRopeRegular,
    color: Colors.black,
  },
  iconContainer: {
    height: 60,
    width: 80,
    backgroundColor: Colors.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
  },
  googleIcon: {
    width: 85,
    height: 75,
  },
  backIcon: {
    height: 55,
    justifyContent: "center",
  },
  forgotPasswrd: {
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 15,
  },
  forgotPasswrdTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
    fontFamily: FontStyles.manRopeRegular,
  },
});
