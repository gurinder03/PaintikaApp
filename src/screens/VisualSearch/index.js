import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function VisualSearch() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/animations/fileShare.json')}
        autoPlay
        style={{
          height: hp(30),
          width: wp(70),
        }}
      />
      <View style={styles.innerBox}>
        <Text style={styles.headline}>
          Search for an painting by taking a photo or uploading an image.
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.uploadBtn1}>
            <Text style={styles.uploadBtnText1}>TAKE A PHOTO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBtn2}>
            <Text style={styles.uploadBtnText2}>UPLOAD AN IMAGE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
