import { View, Text, Image } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import FontStyles from "../../constants/FontStyles";
import Colors from "../../constants/Colors";

export default function OrderList() {
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
      <View
        style={{
          height: "60%",
          width: "100%",
          padding: 6,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: FontStyles.manRopeSemiBold,
            color: Colors.black,
          }}
        >
          My Orders
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: FontStyles.manRopeRegular,
            color: Colors.black,
            marginTop: 5,
          }}
        >
          Orders from May 24, 2023
        </Text>
        <View
          style={{
            height: 80,
            width: "100%",
            marginTop: "7%",
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
              source={require("../../../assets/art.jpg")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View
            style={{
              width: "50%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: FontStyles.manRopeRegular,
                color: Colors.black,
              }}
            >
              Painting Set
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
              759/-
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
