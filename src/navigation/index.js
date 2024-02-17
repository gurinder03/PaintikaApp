import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPassword from '../screens/ForgotPassword';
import SplashScreen from '../screens/SplashScreen';
import OtpScreen from '../screens/OTPScreen';
import HomeScreen from '../screens/HomeScreen';
import AuthStack from './AuthStack';
import TabsScreen from '../screens/TabsScreen';
import {useSelector} from 'react-redux';
import {navigationRef} from './NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
export default function Navigation() {
  const [splash, setsplash] = useState(true);
  const [authToken, setauthToken] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setsplash(false);
    }, 4000);
    getAuthToken();
    return () => {};
  }, []);

  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('authToken');
      // console.log('🚀 ~ file: index.js:38 ~ getAuthToken ~ jsonValue:', jsonValue);
      if (jsonValue !== null) {
        setauthToken(jsonValue);
      }
    } catch (e) {
      // error reading value
      console.log('Error While getting Token', e);
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {/* <Tabs /> */}
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        {splash ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
        )}

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen name="otp" component={OtpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
      {/* {console.log('VALUE OF OUTH TOKen is ', authToken)} */}
      {/* {authToken == null ? <AuthStack /> :
       } */}
      {/* <TabsScreen /> */}
      <AuthStack />
    </NavigationContainer>
  );
}
