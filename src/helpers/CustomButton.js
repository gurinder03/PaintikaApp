import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import FontStyles from '../constants/FontStyles';

export default function CustomButton({title, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <Text style={styles.btnTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // height: 100,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: Colors.black,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom:25
  },
  btnTitle: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: FontStyles.manRopeMedium,
  },
});
