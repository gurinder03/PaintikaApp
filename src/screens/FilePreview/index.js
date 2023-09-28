import { View, Text, Image, ScrollView, Alert } from "react-native";
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

  const handleChange = (name, e) => {
    if (name == "name") {
      setData({ ...data, name: e });
    } else if (name == "size") {
      setData({ ...data, size: e });
    } else if (name == "theme") {
      setData({ ...data, theme: e });
    } else if (name == "medium") {
      setData({ ...data, medium: e });
    } else if (name == "quality") {
      setData({ ...data, quality: e });
    } else if (name == "price") {
      setData({ ...data, price: e });
    } else if (name == "category") {
      setData({ ...data, category: e });
    }
  };

  const handleUpload = () => {
    Alert.alert(
      `name ${data.name} size = ${data?.size} theme ${data.theme} medium ${data?.medium} quality ${data?.quality} price ${data?.price} category ${data?.category}`
    );
  };
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
          <TextInputComponent
            title={"Name"}
            onChange={(e) => handleChange("name", e)}
            value={data.name}
          />
          <TextInputComponent
            title={"Size"}
            onChange={(e) => handleChange("size", e)}
            value={data.size}
          />
          <TextInputComponent
            title={"Painting Theme"}
            onChange={(e) => handleChange("theme", e)}
            value={data?.theme}
          />
          <TextInputComponent
            title={"Medium"}
            onChange={(e) => handleChange("medium", e)}
            value={data?.medium}
          />
          <TextInputComponent
            title={"Framing Quality"}
            onChange={(e) => handleChange("quality", e)}
            value={data?.quality}
          />
          <TextInputComponent
            title={"Price"}
            onChange={(e) => handleChange("price", e)}
            value={data?.quality}
          />
          <CustomPicker
            title={"Category"}
            onChange={(e) => handleChange("category", e)}
            value={data?.category}
          />
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
            onPress={() => handleUpload()}
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
