import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import FontStyles from "../constants/FontStyles";

export default function CustomPicker({ onChange, value, title, customValues }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FontStyles.manRopeSemiBold,
          fontSize: 17,
          color: Colors.black,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          height: 65,
          width: "100%",
          borderBottomColor: Colors.black,
          borderBottomWidth: 1,
        }}
      >
        <Picker
          selectedValue={value}
          onValueChange={(e) => onChange(e, title)}
          style={{
            height: 45,
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: Colors.black,
          }}
          mode={Platform.OS === 'ios' ? 'modal' : 'dialog'}
        >
          {customValues ? (
            customValues.map((Item) => {
              return <Picker.Item label={Item.name} value={Item.name} />;
            })
          ) : (
            <>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </>
          )}
        </Picker>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 10,
  },
});
