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
  const userSavedData = useSelector((state) => state.saveDataReducer.userData);

  // console.log('userSavedData  EEEEEEEEEEEEEEEEEEEEEEEEEEE=>', userSavedData);
  useEffect(() => {
    getAuthToken();
  }, [authToken]);

  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authToken");
      // console.log("Token =>", jsonValue);
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
            iconName = "user";
          } else if (route.name == "Upload Paint"||route.name =="Pre-Upload") {
            iconName = "camerao";
          } else if (route.name == "My Orders"|| route.name=="Orders") {
            iconName = "profile";
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
          {
            (userSavedData && userSavedData.role !== "ARTIST") &&
            <Tab.Screen
              name="Cart"
              options={{ headerShown: false }}
              component={CartScreen}
            />
          }
          <Tab.Screen
            name={userSavedData && userSavedData.role == "ARTIST" ? "Upload Paint" : "Pre-Upload"}
            options={{
              headerShown: false,
            }}
            component={VisualSearch}
          />

          <Tab.Screen
            name={userSavedData && userSavedData.role == "ARTIST" ? "Orders" : "My Orders"}
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
