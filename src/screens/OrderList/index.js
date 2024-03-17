import {
  View, Text, Image, FlatList, TouchableOpacity, StyleSheet, StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import FontStyles from "../../constants/FontStyles";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { heightPercentageToDP } from "react-native-responsive-screen";

const Item = ({ item, onPress }) => (
  < TouchableOpacity onPress={onPress} style={[styles.item, {}]} >
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            height: 80,
            width: "100%",
            flexDirection: "row",
            borderRadius: 6,
            borderWidth: 1,
            borderColor: Colors.black,
          }}
        >
          <View
            style={{
              width: "25%",
              height: "100%",
              padding: 5,
            }}
          >
            <Image
              resizeMode="contain"
              source={{ uri: item.items[0].image }}
              style={{ width: "100%", height: "100%", borderRadius: 5, resizeMode: 'contain' }}
            />
          </View>
          <View
            style={{
              width: "50%",
              height: "100%",
              marginLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontStyles.manRopeRegular,
                color: Colors.black,
              }}
            >
              {item.items[0].theme}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontStyles.manRopeRegular,
                color: Colors.black,
              }}
            >
              Order status: {item.status}
            </Text>
          </View>
          <View
            style={{
              width: "25%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: FontStyles.manRopeSemiBold,
                color: Colors.black,
              }}
            >
              {item.order_total}
            </Text>
          </View>
        </View>
      </View>

    </View>
  </TouchableOpacity >

);

export default function OrderList({ navigation }) {
  const [selectedId, setSelectedId] = useState();
  const dispatch = useDispatch();
  const [userId, setuserId] = useState("");
  const [authToken, setauthToken] = useState("");
  const ordersData = useSelector((state) => state.saveDataReducer.ordersData);
  const isFocused = useIsFocused();
  const userSavedData = useSelector((state) => state.saveDataReducer.userData);



  useEffect(() => {
    getData();
    getAuthToken();
    if (isFocused) {
      if (userId !== "" && authToken !== "") {
        if (userSavedData && userSavedData.role !== "ARTIST") {
          dispatch({
            type: "GET_ORDERS",
            payload: { userId: userId, token: authToken, limit: 100, page: 1, role: userSavedData.role },
          });
        } else {
          dispatch({
            type: "GET_ORDERS",
            payload: { userId: userId, token: authToken, limit: 100, page: 1, role: userSavedData.role },
          });
        }
      }
    }
  }, [userId, authToken, isFocused]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
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
      // console.log("🚀 ~ file: index.js:200 ~ getAuthToken ~ jsonValue:", jsonValue);
      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };

  const renderItem = ({ item }) => {
    const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate((userSavedData && userSavedData.role !== "ARTIST") ? "OrderDetails" : "ArtistOrderDetails", {
          details: item,
        })}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          height: "40%",
          width: "100%",
          padding: 5,
        }}
      >
        <Image
          source={require("../../../assets/orders.jpg")}
          style={{ width: "100%", height: "100%" }}
        />

      </View>
      <View style={{ width: "100%", left: 30, bottom: 10 }}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: FontStyles.manRopeSemiBold,
            color: Colors.black,
          }}
        >
          {(userSavedData && userSavedData.role !== "ARTIST") ? "My Orders" : "Order for you"}
        </Text>
        {/* <Text
          style={{
            fontSize: 18,
            fontFamily: FontStyles.manRopeRegular,
            color: Colors.black,
            marginTop: 5,
          }}
        >
          Orders from May 24, 2023
        </Text> */}
      </View>
      <FlatList
        data={ordersData && ordersData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={ordersData}
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              height: heightPercentageToDP(40),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 20, fontFamily: FontStyles.manRopeSemiBold }}
            >
              Your haven't ordered yet !
            </Text>
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});