import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontStyles from "../../constants/FontStyles";
import HeartIcon from "react-native-vector-icons/AntDesign";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedData } from "../../redux/actions";
export default function CategoryList({ navigation, route }) {
  const { item } = route.params || {};
  const dispatch = useDispatch();
  const savedList = useSelector((state) => state.saveDataReducer.relatedData);
  console.log(
    "🚀 ~ file: CategoryList.js:23 ~ CategoryList ~ savedList:",
    savedList
  );
  console.log("🚀 ~ file: CategoryList.js:19 ~ CategoryList ~ item:", item);
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
        <TouchableOpacity
          style={{
            width: wp(100),
            height: hp(60),
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(3),
            backgrounColor: "pink",
          }}
          onPress={() => navigation.navigate("Detail")}
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
        </TouchableOpacity>
      </>
    );
  };

  useEffect(() => {
    if (item !== null) {
      dispatch(
        getRelatedData({
          page: 1,
          limit: 10,
          category: [item?._id],
        })
      );
    }
  }, []);

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
    justifyContent: "center",
    alignItems: "center",
  },
});
