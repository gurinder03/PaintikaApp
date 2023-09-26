import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VisualSearch from "../screens/VisualSearch";
import Icon from "react-native-vector-icons/AntDesign";
import CreatePassword from "../screens/CreatePassword";
import EditProfile from "../screens/EditProfile";
import CategoryList from "../screens/CategoryList/CategoryList";
const Tab = createBottomTabNavigator();
export default function Tabs() {
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
      <Tab.Screen
        name="Visual"
        options={{ headerShown: false }}
        component={VisualSearch}
      />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
