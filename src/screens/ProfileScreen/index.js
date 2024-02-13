import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import FontStyles from "../../constants/FontStyles";
import Colors from "../../constants/Colors";
import Icon1 from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Logout from "react-native-vector-icons/MaterialIcons";
import { navigationRef } from "../../navigation/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const options = [
    { icon: "user", name: "Age", value: 24 },
    { icon: "user", name: "Gender", value: "Male" },
    { icon: "birthday-cake", name: "DOB", value: 1999 },
    { icon: "graduation-cap", name: "Qualification", value: "Graduation" },
    { icon: "work", name: "Occupation", value: "Freelancer" },
    { icon: "work", name: "Expericence", value: "4yrs" },
  ];
  const [userId, setuserId] = useState("");
  const [authToken, setauthToken] = useState(null);
  const userSavedData = useSelector((state) => state.saveDataReducer.userData);
  // console.log('Profile Data', userSavedData);
  useEffect(() => {
    getData();
    getAuthToken();
    getUserData();
  }, [userId, authToken]);

  const logout = () => {
    Alert.alert("Log Out", "Are you really want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          if (userId !== "") {
            dispatch({ type: "LOGOUT", payload: userId });
          }
        },
      },
    ]);
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      console.log("🚀 ~ file: index.js:189 ~ getData ~ value:", value);
      if (value !== null) {
        setuserId(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authToken");
      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };
  const getUserData = () => {
    if (userId !== "" && authToken !== null) {
      const payload = {
        token: authToken,
        userId: userId,
      };
      dispatch({ type: "GET_USER", payload: payload });
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.sectionOne, {paddingTop:15}]}>
        <View style={styles.profileSection}>
          <Image
            source={require("../../../assets/download.jpeg")}
            style={styles.userProfilePic}
          />
          <Text style={styles.userName}>{userSavedData?.name}</Text>
          <Text style={styles.userEmailText}>User Type: {userSavedData?.role}</Text>
          <Text style={styles.userEmailText}>
            {userSavedData?.email_or_mobile_number}
          </Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("Edit")}
          >
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.sectionTwo}>
        <TouchableOpacity
          style={{
            width: wp(100),
            height: hp(8),
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            marginTop: hp(1),
          }}
          onPress={() => navigation.navigate("Create")}
        >
          <View
            style={{
              flexDirection: "row",
              width: wp(100),
              height: hp(7),
              alignItems: "center",
              marginLeft: wp(3),
            }}
          >
            <View
              style={{
                width: wp(80),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  height: hp(4),
                  alignItems: "center",
                }}
              >
                <Icon1 name="lock" size={22} />
                <Text style={styles.itemText}>Change Password</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {userSavedData.length > 0 && (
          <>
            {options.map((item) => (
              <View
                style={{
                  width: wp(100),
                  height: hp(8),
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                  marginTop: hp(0.3),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: wp(100),
                    height: hp(7),
                    alignItems: "center",
                    marginLeft: wp(3),
                  }}
                >
                  {item?.icon == "location-pin" ? (
                    <Icon2 name={item?.icon} size={22} />
                  ) : item?.icon == "birthday-cake" ||
                    item.icon == "graduation-cap" ? (
                    <Icon3 name={item?.icon} size={22} />
                  ) : item.icon == "work" ? (
                    <Icon4 name={item.icon} size={22} />
                  ) : (
                    <Icon1 name={item?.icon} size={22} />
                  )}
                  <View
                    style={{
                      width: wp(80),
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemVal}>{item?.value}</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        <TouchableOpacity
          style={{
            width: wp(100),
            height: hp(8),
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            marginTop: hp(0.3),
            marginBottom: hp(5),
          }}
          onPress={() => logout()}
        >
          <View
            style={{
              flexDirection: "row",
              width: wp(100),
              height: hp(7),
              alignItems: "center",
              marginLeft: wp(3),
            }}
          >
            <View
              style={{
                width: wp(80),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  height: hp(4),
                  alignItems: "center",
                }}
              >
                <Logout name="logout" size={22} />
                <Text style={styles.itemText}>Logout</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionOne: {
    height: hp(30),
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  sectionTwo: {
    height: hp(70),
    width: wp(100),
    backgroundColor: "#F6F6F",
  },
  profileSection: {
    height: hp(29),
    width: wp(65),
    justifyContent: "center",
    alignItems: "center",
  },
  userProfilePic: {
    width: Platform.OS == "ios" ? wp(33) : wp(30),
    height: hp(15),
    borderRadius: 90,
  },
  userName: {
    fontSize: 20,
    fontFamily: FontStyles.manRopeSemiBold,
  },
  userEmailText: {
    fontSize: 14,
    fontFamily: FontStyles.manRopeSemiBold,
  },
  editBtn: {
    width: wp(30),
    height: hp(4),
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: hp(1),
  },
  editText: {
    fontSize: 12,
    color: Colors.white,
  },
  itemText: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: FontStyles.manRopeSemiBold,
    marginLeft: wp(3),
  },
  itemVal: {
    fontSize: 14,
    fontFamily: FontStyles.manRopeSemiBold,
    color: Colors.black,
  },
});
