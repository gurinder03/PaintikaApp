import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import BackIcon from 'react-native-vector-icons/Ionicons';

export default function LoginHeader({title, navigation}) {
  return (
    <View style={styles.heading}>
      <TouchableOpacity style={styles.backIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>
            <BackIcon name="chevron-back-outline" size={30} color="#000" />
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <Text style={styles.headingTitle}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    height: '20%',
    width: '100%',
    padding: 5,
  },
  backIcon: {
    height: 55,
    justifyContent: 'center',
  },
  headingTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#222',
    marginTop: 9,
  },
});
