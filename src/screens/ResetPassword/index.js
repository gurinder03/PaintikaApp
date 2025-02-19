import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Alert } from "react-native";
import LottieView from "lottie-react-native";
import Colors from "../../constants/Colors";
import FontStyles from "../../constants/FontStyles";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../helpers/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResetPassword({ navigation, route }) {
    const dispatch = useDispatch();
    const { role, OTP } = route?.params || {};
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const savedEmail = useSelector((state) => state.saveDataReducer.savedEmail);
    const isLoading = useSelector((state) => state.saveDataReducer.isLoading);
    const userEmail = savedEmail;
    const animationRef = useRef(null);

    const resetPassword = () => {
        if (newPassword?.trim() === "" || confirmPassword?.trim() === "") {
            Alert.alert("Please enter new password and confirm password");
        } else if (newPassword !== confirmPassword) {
            Alert.alert("New password and confirm password does not match");
        } else {
            const payloadData = {
                role:role,
                email_or_mobile_number: userEmail,
                password: newPassword,
                confirmPassword: confirmPassword,
                OTP: OTP,
            }
            dispatch({ type: "RESET_PASSWORD", payload: payloadData });
        }
    };

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

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("userId");
            if (value !== null) {
                setuserId(JSON.parse(value));
            }
        } catch (e) {
            console.log("Error While getting UserId", e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.otpTitle}>Reset Password</Text>
                <View style={styles.animationContainer}>
                    <LottieView
                        ref={animationRef}
                        source={require("../../../assets/animations/otpanimation.json")}
                        autoPlay
                        loop
                        style={{ height: 120, width: 120 }}
                    />
                </View>
            </View>
            <View style={styles.form}>
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
                    title={"Reset Password"}
                    onPress={() => resetPassword()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        height: "35%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    otpTitle: {
        fontSize: 28,
        fontFamily: FontStyles.manRopeMedium,
        color: Colors.black,
        fontWeight: "800",
    },
    animationContainer: {
        height: 200,
        width: 350,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        height: "65%",
        paddingHorizontal: 20,
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
});
