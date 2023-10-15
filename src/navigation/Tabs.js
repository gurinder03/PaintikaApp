import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VisualSearch from "../screens/VisualSearch";
import Icon from "react-native-vector-icons/AntDesign";
import CreatePassword from "../screens/CreatePassword";
import EditProfile from "../screens/EditProfile";
import CategoryList from "../screens/CategoryList/CategoryList";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createBottomTabNavigator();
export default function Tabs() {
  const [authToken, setauthToken] = useState(null);
  useEffect(() => {
    getAuthToken();
  }, []);

  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authToken");
      console.log(
        "🚀 ~ file: index.js:38 ~ getAuthToken ~ jsonValue:",
        jsonValue
      );
      if (jsonValue !== null) {
        setauthToken(jsonValue);
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = "home";
          } else if (route.name == "Cart") {
            iconName = "shoppingcart";
          } else if (route.name == "Profile") {
            iconName = "profile";
          } else if (route.name == "Visual") {
            iconName = "camerao";
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        options={{ headerShown: false }}
        component={CartScreen}
      />
      {authToken !== null ? (
        <Tab.Screen
          name="Visual"
          options={{ headerShown: false }}
          component={VisualSearch}
        />
      ) : null}

      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
