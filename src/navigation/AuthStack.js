import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import ForgotPassword from "../screens/ForgotPassword";
import SplashScreen from "../screens/SplashScreen";
import OtpScreen from "../screens/OTPScreen";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import CreatePassword from "../screens/CreatePassword";
import EditProfile from "../screens/EditProfile";
import Tabs from "./Tabs";
import FilePreview from "../screens/FilePreview";
import CategoryList from "../screens/CategoryList/CategoryList";
import ProductDetail from "../screens/ProductDetail";
import Address from "../screens/Address";
import AddAddress from "../screens/Address/AddAddress";

export default function AuthStack() {
  const Stack = createStackNavigator();

  const [splash, setsplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setsplash(false);
    }, 4000);

    return () => {};
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {splash ? (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            presentation: "modal",
            animationTypeForReplace: "push",
            animation: "slide_from_right",
          }}
        />
      ) : null}

      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      {/* <Stack.Screen name="Category" component={CategoryList} /> */}
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Create" component={CreatePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Preview" component={FilePreview} />
      <Stack.Screen name="Category" component={CategoryList} />
      <Stack.Screen name="Detail" component={ProductDetail} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      {/* <Stack.Screen
        name="Create"
        component={CreatePassword}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Edit"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
