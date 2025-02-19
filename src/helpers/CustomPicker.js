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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={(e) => onChange(e, title)}
          style={styles.picker}
          mode={Platform.OS === 'ios' ? 'modal' : 'dialog'}
        >
          {customValues ? (
            customValues.map((Item) => {
              return <Picker.Item label={Item.name} value={Item.name} key={Item.name} />;
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
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  picker: {
    width: "100%",
  }
});
