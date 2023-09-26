import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontStyles from "../../constants/FontStyles";
import HeartIcon from "react-native-vector-icons/AntDesign";
import Colors from "../../constants/Colors";
export default function CategoryList() {
  const data = [
    {
      name: "FANCY ART",
      image: require("../../../assets/art.jpg"),
      price: "499",
    },
    {
      name: "FANCY ART",
      image: require("../../../assets/art.jpg"),
      price: "499",
    },
    {
      name: "FANCY ART",
      image: require("../../../assets/art.jpg"),
      price: "499",
    },
    {
      name: "FANCY ART",
      image: require("../../../assets/art.jpg"),
      price: "499",
    },
    {
      name: "FANCY ART",
      image: require("../../../assets/art.jpg"),
      price: "499",
    },
    {
      name: "FANCY ART",
      image: require("../../../assets/art.jpg"),
      price: "499",
    },
  ];

  const RenderItem = ({ item }) => {
    return (
      <>
        <View
          style={{
            width: wp(100),
            height: hp(60),
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(3),
            backgrounColor: "pink",
          }}
        >
          <Image
            source={require("../../../assets/art.jpg")}
            style={{ width: "100%", height: "90%" }}
          />
          <View
            style={{
              height: "10%",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            <View style={{}}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: FontStyles.manRopeSemiBold,
                  textAlign: "left",
                  color: Colors.black,
                }}
              >
                FANCY ART
              </Text>
              <Text
                style={{
                  fontFamily: FontStyles.manRopeSemiBold,
                  color: Colors.black,
                  marginTop: -4,
                }}
              >
                PRICE : {item.price}
              </Text>
            </View>

            <TouchableOpacity>
              <HeartIcon name="hearto" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FontStyles.manRopeSemiBold,
            color: Colors.black,
            fontSize: 24,
          }}
        >
          Selected Category List
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "90%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList data={data} renderItem={RenderItem} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: wp(100),
    flex: 1,
    flexDirection: "column",
    height: "100%",
    backgrounColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
});
