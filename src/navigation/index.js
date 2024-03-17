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
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthStack />
    </NavigationContainer>
  );
}
