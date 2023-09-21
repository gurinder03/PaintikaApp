import { View, Text, Image } from "react-native";
import React from "react";

export default function FilePreview({ routes }) {
  const { path } = routes?.params;
  console.log("🚀 ~ file: index.js:6 ~ FilePreview ~ path:", path);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
      }}
    >
      <View style={{ height: "60%", backgroundColor: "green", width: "100%" }}>
        <Image
          source={{ uri: path }}
          style={{ width: "100%", height: "80%", borderWidth: 2 }}
        />
      </View>
      <View
        style={{ height: "40%", backgroundColor: "pink", width: "100%" }}
      ></View>
    </View>
  );
}
