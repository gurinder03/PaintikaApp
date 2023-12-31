import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontStyles from "../../constants/FontStyles";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedData } from "../../redux/actions";
import Search from "react-native-vector-icons/Feather";
import Rupee from "react-native-vector-icons/FontAwesome";
import BookMark from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import BackIcon from "react-native-vector-icons/Ionicons";

export default function CategoryList({ navigation, route }) {
  const { item } = route.params || {};
  const dispatch = useDispatch();
  const [SelectedLanguage, setSelectedLanguage] = useState("");
  const [searchText, setsearchText] = useState("");
  const [selectedValue, setselectedValue] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mohali", value: "mohali" },
    { label: "Kharar", value: "kharar" },
    { label: "Patiala", value: "patiala" },
    { label: "Jalandhar", value: "jalandhar" },
  ]);

  const savedList = useSelector((state) => state.saveDataReducer.relatedData);
  const RenderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={{
            width: wp(100),
            height: hp(80),
            backgroundColor: "#fff",
            alignItems: "center",
            marginTop: hp(2),
          }}
          onPress={() =>
            navigation.navigate("Detail", {
              id: item?._id,
              creatorId: item?.creator_id,
            })
          }
        >
          <Image
            source={{ uri: item?.image }}
            style={{ width: "100%", height: "90%", resizeMode: "contain" }}
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
                  fontSize: 15,
                  fontFamily: FontStyles.manRopeRegular,
                  textAlign: "left",
                  color: Colors.black,
                }}
              >
                {item?.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <Rupee name="rupee" size={17} />
                <Text
                  style={{
                    fontFamily: FontStyles.manRopeRegular,
                    color: Colors.black,
                    marginTop: -3,
                    fontSize: 14,
                    marginLeft: 3,
                  }}
                >
                  {item.price}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                // position: "absolute",
                // top: hp(-45),
                // left: wp(87),
                backgroundColor: "#fff",
                width: wp(11),
                height: hp(5.6),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
            >
              <BookMark name="bookmark" size={18} />
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
          height: hp(19),
          justifyContent: "space-around",
          // zIndex: 999,
          // justifyContent: "center",
          // backgroundColor: "red",
        }}
      >
        <View style={{ height: "20%", marginTop: 15 }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <BackIcon name={"chevron-back"} size={30} />
          </TouchableOpacity>
        </View>
        {Platform.OS == "ios" ? (
          <>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              zIndex={1000}
              style={{
                width: wp(95),
                marginTop: hp(3),
                marginLeft: wp(2),
              }}
            />
          </>
        ) : (
          <View style={{ height: "15%", marginBottom: 25 }}>
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
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // height: hp(6),
            height: "20%",
            marginTop: Platform.OS === "ios" ? hp(1) : "",
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
          paddingBottom: hp(5),
        }}
      >
        <FlatList
          data={savedList ? savedList?.data : []}
          renderItem={RenderItem}
          ListEmptyComponent={
            <View
              style={{
                width: wp(100),
                height: hp(70),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                source={require("../../../assets/animations/notfound.json")}
                autoPlay
                style={{
                  height: hp(30),
                  width: wp(70),
                }}
              />
            </View>
          }
        />
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
