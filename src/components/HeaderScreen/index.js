import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import SearchIcon from 'react-native-vector-icons/dist/Ionicons';
import Colors from '../../constants/Colors';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftIconContainer}>
        <Icon name="chevron-back-outline" size={30} color="#222222" />
      </View>
      <View style={styles.headerTitle}>
        <Text style={styles.title}>Painting List</Text>
      </View>
      <View style={styles.rightIconConatiner}>
        <SearchIcon name="search" size={30} color="#222222" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    width: wp(100),
    height: hp(9),
    backgroundColor: Colors.primaryBg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconContainer: {
    width: wp(20),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    width: wp(60),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconConatiner: {
    width: wp(20),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
  },
});
