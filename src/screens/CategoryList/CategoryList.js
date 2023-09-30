import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontStyles from "../../constants/FontStyles";
import HeartIcon from "react-native-vector-icons/AntDesign";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedData } from "../../redux/actions";
import CustomPicker from "../../helpers/CustomPicker";
import { Picker } from "@react-native-picker/picker";
import Search from "react-native-vector-icons/Feather";
export default function CategoryList({ navigation, route }) {
  const { item } = route.params || {};
  const dispatch = useDispatch();
  const [SelectedLanguage, setSelectedLanguage] = useState("");
  const [searchText, setsearchText] = useState("");
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
            marginTop: hp(2),
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
          height: hp(13),
          // zIndex: 999,
          // justifyContent: "center",
          // backgroundColor: "red",
        }}
      >
        <Picker
          selectedValue={SelectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          style={{
            borderWidth: 1,
            width: "100%",
            height: hp(1),
          }}
        >
          <Picker.Item label="Select City" value="null" />
          <Picker.Item label="Mohali" value="mohali" />
          <Picker.Item label="Kharar" value="kharar" />
          <Picker.Item label="Patiala" value="patiala" />
          <Picker.Item label="Jalandhar" value="jalandhar" />
        </Picker>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: hp(6),
          }}
        >
          <View
            style={{
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                width: "95%",
                height: hp(5),
                borderRadius: 5,
                paddingLeft: 15,
                borderWidth: 0.7,
                borderColor: Colors.black,
              }}
              onChangeText={(e) => setsearchText(e)}
              value={searchText}
            />
          </View>

          <View style={{ width: "10%" }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                // backgroundColor: "yellow",
                // height: "100%",
              }}
            >
              <Search name="search" size={25} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text
          style={{
            fontFamily: FontStyles.manRopeSemiBold,
            color: Colors.black,
            fontSize: 24,
          }}
        >
          Selected Category List
        </Text> */}
      </View>
      <View
        style={{
          width: "100%",
          height: hp(87),
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
