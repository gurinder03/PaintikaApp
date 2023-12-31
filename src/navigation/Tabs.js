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
import OrderList from "../screens/OrderList";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
const Tab = createBottomTabNavigator();
export default function Tabs() {
  const [authToken, setauthToken] = useState(null);
  const isUserLogged = useSelector((state) => state.saveDataReducer.isLogged);
  console.log("🚀 ~ file: Tabs.js:18 ~ Tabs ~ isUserLogged:", isUserLogged);
  console.log("🚀 ~ file: Tabs.js:15 ~ Tabs ~ authToken:", authToken);
  useEffect(() => {
    getAuthToken();
  }, [authToken]);

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
          } else if (route.name == "My Orders") {
            iconName = "shoppingcart";
          } else if (route.name == "Login") {
            iconName = "user";
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
      {isUserLogged ? null : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            presentation: "modal",
            animationTypeForReplace: "push",
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
      )}

      {isUserLogged ? (
        <>
          <Tab.Screen
            name="Cart"
            options={{ headerShown: false }}
            component={CartScreen}
          />

          <Tab.Screen
            name="Visual"
            options={{ headerShown: false }}
            component={VisualSearch}
          />

          <Tab.Screen
            name="My Orders"
            options={{ headerShown: false }}
            component={OrderList}
          />

          <Tab.Screen
            name="Profile"
            options={{ headerShown: false }}
            component={ProfileScreen}
          />
        </>
      ) : null}
    </Tab.Navigator>
  );
}
