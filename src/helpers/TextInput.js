import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import FontStyles from "../constants/FontStyles";

export default function TextInputComponent({
  value,
  onChange,
  placeHolder,
  title,
  type,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeHolder}>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder={placeHolder}
        keyboardType={type == "number" ? "numeric" : "default"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  placeHolder: {
    fontSize: 17,
    color: Colors.black,
    fontFamily: FontStyles.manRopeSemiBold,
  },
});
