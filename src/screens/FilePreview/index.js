import { View, Text, Image } from "react-native";
import React from "react";
import FontStyles from "../../constants/FontStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

export default function FilePreview({ route }) {
  const { path } = route?.params;
  console.log("🚀 ~ file: index.js:6 ~ FilePreview ~ path:", path);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
      }}
    >
      <View
        style={{
          height: "60%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: path }}
          style={{ width: "100%", height: "80%", borderWidth: 2 }}
        />
      </View>
      <View
        style={{
          height: "40%",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: FontStyles.manRopeSemiBold }}>
          Tap on the upload button below.
        </Text>
        <View
          style={{
            height: hp(10),
            width: wp(90),
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              height: hp(7),
              width: wp(40),
              backgroundColor: Colors.black,
              borderRadius: wp(8),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: FontStyles.manRopeSemiBold,
              }}
            >
              UPLOAD
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
