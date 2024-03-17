import { View, Text, StyleSheet, Image, Animated, ImageBackground } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import React, { useRef, useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
export default function SplashScreen() {
  const rotationValue = useRef(new Animated.Value(0)).current;
  const [showText, setshowText] = useState(false);

  const startRotation = () => {
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 3000, // Time in milliseconds for the rotation to complete
      useNativeDriver: true,
    }).start(() => {
      // Reset the rotation value once the animation is complete
      rotationValue.setValue(0);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setshowText(true);
    }, 3100);
    // startRotation();
  }, []);

  const rotateImage = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Animated.Image
          source={require("../../../assets/Paintika.png")}
          style={{
            resizeMode:'contain',
            width: wp(45),
            height: hp(20),
            transform: [
              { rotate: rotateImage },
              { scale: 2.1 },
              {
                scaleX: rotationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 15],
                }),
              },
              {
                scaleY: rotationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 15],
                }),
              },
            ],
          }}
        />
        {showText == true ? (
          <Animated.Text
            style={{
              color: "#000",
              fontSize: 18,
              fontWeight: "800",
              marginTop: hp(15),
              transform: [{ scale: 1.5 }],
            }}
          >
            P A I N T I K A
          </Animated.Text>
        ) : null} */}
        <ImageBackground
          source={require("../../../assets/splash.gif")}
          style={{
            resizeMode: 'contain',
            width: wp(100),
            height: hp(40),
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#180D40",
  },
});
