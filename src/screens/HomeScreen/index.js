import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import Header from "../../components/HeaderScreen";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import FontStyles from "../../constants/FontStyles";
import Colors from "../../constants/Colors";
import Swiper from "react-native-swiper";
export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const savedList = useSelector(
    (state) => state.saveDataReducer.savedCategories
  );
  console.log("🚀 ~ file: index.js:27 ~ HomeScreen ~ savedList:", savedList);
  const [number, onChangeNumber] = useState("");
  const { width: windowWidth, height: windowHeight } =
    Dimensions?.get("window");

  function Slide({ data }) {
    return (
      <TouchableOpacity
        style={{
          height: windowHeight,
          width: windowWidth,
          justifyContent: "center",
          alignItems: "center",
          // marginTop: 5,
        }}
        onPress={() => navigation.navigate("Category", { item: data })}
      >
        <Image
          source={{ uri: data?.image }}
          style={{
            width: wp(100),
            height: hp(300),
          }}
          resizeMode="contain"
        ></Image>
        <Text
          style={{
            fontSize: 28,
            color: "#fff",
            position: "absolute",
            top: "-45%",
            fontWeight: "900",
            left: 40,
            zIndex: 999,
          }}
        >
          {data?.name?.toUpperCase()}
        </Text>
        <Text style={{ fontSize: 18 }}>{data?.subtitle}</Text>
      </TouchableOpacity>
    );
  }
  useEffect(() => {
    dispatch(
      getCategories({
        page: 1,
        limit: 10,
      })
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.filterContainer}>
        <View
          style={{
            width: wp(100),
            backgroundColor: "#ffffff",
            height: hp(6),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            style={{
              backgroundColor: Colors.black,
              justifyContent: "center",
              alignItems: "center",
              height: hp(5),
              width: wp(50),
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontStyle: FontStyles.manRopeSemiBold,
                color: Colors.white,
                fontSize: 15,
              }}
            >
              Join as a Artist
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterSearch}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Search"
          />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          data={savedList?.data ? savedList?.data : []}
          style={{ flex: 1 }}
          renderItem={({ item }) => {
            return <Slide data={item} />;
          }}
        />
      </View>
    </View>
  );
}
