import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import FontStyles from "../../constants/FontStyles";
import RupeeIcon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getDetailsData } from "../../redux/actions";
import Toast from "react-native-toast-message";
import Navigation from "../../navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ProductDetail({ navigation, route }) {
  const dispatch = useDispatch();
  const { id, creatorId } = route.params || {};
  const detailsData = useSelector((state) => state.saveDataReducer.detailsData);
  // const userId = useSelector((state) => state.saveDataReducer.userId);
  const [userId, setuserId] = useState("");
  console.log("🚀 ~ file: index.js:21 ~ ProductDetail ~ userId:", userId);
  console.log(
    "🚀 ~ file: index.js:17 ~ ProductDetail ~ detailsData:",
    detailsData
  );
  console.log("🚀 ~ file: index.js:16 ~ ProductDetail ~ id:", id);
  const [data, setData] = useState("");
  const [authToken, setauthToken] = useState(null);
  console.log("🚀 ~ file: index.js:27 ~ ProductDetail ~ authToken:", authToken);
  useEffect(() => {
    if (id !== null) {
      dispatch(getDetailsData(id));
      getAuthToken();
    }
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      console.log("🚀 ~ file: index.js:41 ~ getData ~ value:", value);
      if (value !== null) {
        setuserId(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  const addToCart = () => {
    if (authToken !== null) {
      dispatch(
        addProduct({
          user_id: userId,
          art_id: id,
          creator_id: creatorId,
          quantity: 1,
          token: authToken,
        })
      );
    } else {
      Toast.show({
        type: "error",
        text1: `Login or Signup First.`,
        topOffset: 60,
      });
      navigation.navigate("Login");
    }
  };

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ height: hp(60), width: wp(100) }}>
        <Image
          source={{ uri: detailsData?.data?.image }}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </View>
      <View
        style={{
          height: hp(40),
          width: wp(100),
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: wp(100),
            height: hp(5),
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: Colors.black,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => addToCart()}
        >
          <Text
            style={{
              fontSize: 12,
              color: Colors.black,
              fontFamily: FontStyles.manRopeSemiBold,
            }}
          >
            ADD
          </Text>
        </TouchableOpacity>
        <ScrollView
          style={{
            height: hp(35),
            width: wp(100),
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontStyle: FontStyles.manRopeSemiBold,
              color: Colors.black,
            }}
          >
            {detailsData?.data?.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              height: hp(5),
              width: wp(15),
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "100%",
                width: wp(4),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RupeeIcon name="rupee" size={18} color={Colors.black} />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: FontStyles.manRopeSemiBold,
                color: Colors.black,
                marginTop: -5,
              }}
            >
              {detailsData?.data?.price}
            </Text>
          </View>
          <View style={{ width: wp(90) }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 15,
                fontStyle: FontStyles.manRopeRegular,
              }}
            >
              {detailsData?.message}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
