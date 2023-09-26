import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import FontStyles from "../../constants/FontStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import TextInputComponent from "../../helpers/TextInput";
import CustomPicker from "../../helpers/CustomPicker";

export default function FilePreview({ route }) {
  const [data, setData] = useState({
    name: "",
    size: "",
    theme: "",
    medium: "",
    quality: "",
    price: "",
    category: "",
  });
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
          height: "40%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: path }}
          style={{ width: "80%", height: "80%", borderWidth: 2 }}
        />
      </View>
      <View
        style={{
          height: "60%",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <ScrollView style={{ width: wp(90) }}>
          <TextInputComponent title={"Name"} />
          <TextInputComponent title={"Size"} />
          <TextInputComponent title={"Painting Theme"} />
          <TextInputComponent title={"Medium"} />
          <TextInputComponent title={"Framing Quality"} />
          <TextInputComponent title={"Price"} />
          <CustomPicker title={"Category"} />
        </ScrollView>

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
