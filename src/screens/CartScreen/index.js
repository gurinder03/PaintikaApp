import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FlatList } from "react-native-gesture-handler";
import FontStyles from "../../constants/FontStyles";
import Colors from "../../constants/Colors";
import AddIcon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Remove from "react-native-vector-icons/FontAwesome";
import { addProduct } from "../../redux/actions";
export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const [userId, setuserId] = useState("");
  const [authToken, setauthToken] = useState("");
  const [cart, setcart] = useState([]);
  const detailsData = useSelector((state) => state.saveDataReducer.cartList);
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
    getAuthToken();

    if (userId !== "" && authToken !== "") {
      dispatch({
        type: "GET_PRODUCTS",
        payload: { userId: userId, token: authToken },
      });
    }
  }, [userId, authToken, isFocused]);

  useEffect(() => {
    if (detailsData) {
      setcart(detailsData?.carts);
    }
  }, [isFocused, detailsData]);

  const deleteProduct = (id) => {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: { id: id, token: authToken, userId: userId },
    });
    dispatch({
      type: "GET_PRODUCTS",
      payload: { userId: userId, token: authToken },
    });
  };

  const removeItem = (id) => {
    Alert.alert("Alert", "Are you really want to remove this product?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteProduct(id) },
    ]);
  };

  const updateProduct = (data, type) => {
    dispatch(
      addProduct({
        user_id: data.user_id,
        art_id: data.art_id,
        creator_id: data.creator_id,
        quantity: type == 'Incremented' ? 1 : - 1,
        token: authToken,
      })
    );
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      // console.log("🚀 ~ file: index.js:189 ~ getData ~ value:", value);
      if (value !== null) {
        setuserId(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authToken");
      // console.log("🚀 ~ file: index.js:200 ~ getAuthToken ~ jsonValue:", jsonValue);
      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };

  const RenderItem = ({ item }) => {
    return (
      <>
        <View style={styles.productContainer}>
          <View
            style={{
              width: "40%",
              height: "100%",
              padding: 5,
            }}
          >
            <Image
              source={{ uri: item?.image }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View
            style={{
              width: "60%",
              height: "100%",
              justifyContent: "space-around",
              alignItems: "flex-start",
              borderLeftWidth: 1,
              borderLeftColor: Colors.black,
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: "-50%",
                  left: "85%",
                }}
                onPress={() => removeItem(item?._id)}
              >
                <Remove name="remove" size={20} color={Colors.black} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontStyles.manRopeRegular,
                  color: Colors.black,
                  marginLeft: 9,
                }}
              >
                {item.name}
              </Text>
              {/* <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontStyles.manRopeRegular,
                  color: Colors.black,
                  marginLeft: 9,
                }}
              >
                this is the description
              </Text> */}
            </View>
            <View
              style={{
                width: "100%",
                height: hp(5),
                justifyContent: "space-around",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontStyles.manRopeRegular,
                  color: Colors.black,
                  marginLeft: 9,
                }}
              >
                {`₹ ${item.price * item.quantity}`}
              </Text>
              <View
                style={{
                  width: wp(35),
                  height: hp(5),
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: Colors.black,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (item.quantity == 1) {
                      removeItem(item?._id)
                    } else {
                      updateProduct(item, "Decremented")
                    }
                  }
                  }
                  style={{
                    width: "30%",
                    height: hp(5),
                    borderRightWidth: 1,
                    borderRightColor: Colors.black,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>
                    <AddIcon
                      name="remove" size={25} />
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: "40%",
                    height: hp(5),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.black,
                      fontWeight: "500",
                    }}
                  >
                    {item?.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: "30%",
                    height: hp(5),
                    borderLeftWidth: 1,
                    borderRightColor: Colors.black,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => updateProduct(item, "Incremented")}
                >
                  <Text>
                    <AddIcon size={25} name="add" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.Sec1}>
        <FlatList
          data={cart ? cart : []}
          renderItem={({ item }) => <RenderItem item={item} />}
          ListEmptyComponent={
            <View
              style={{
                width: "100%",
                height: hp(90),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 20, fontFamily: FontStyles.manRopeSemiBold }}
              >
                Your Cart is Empty !
              </Text>
            </View>
          }
        />
      </View>
      {cart.length > 0 ? (
        <View style={styles.Sec2}>
          <TouchableOpacity
            style={{
              height: hp(10),
              backgroundColor: Colors.black,
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("Address", {
                details: detailsData,
              })
            }
          >
            <Text style={{ color: Colors.white }}>CONTINUE</Text>
          </TouchableOpacity>
          <View
            style={{
              height: hp(9.5),
              width: "50%",
              borderTopWidth: 0.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 12, color: Colors.black }}
            >{`TOTAL ₹ ${detailsData?.order_total}`}</Text>
            <Text style={{ fontSize: 12, color: Colors.black }}>
              INCLUDING GST
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Sec1: {
    height: Platform.OS == "ios" ? hp(79) : hp(87),
    width: wp(100),
    // padding: wp(2),
    paddingTop: hp(4),
  },
  Sec2: {
    height: Platform.OS == "ios" ? hp(14) : hp(13),
    width: wp(100),
    flexDirection: "row",
  },
  productContainer: {
    height: hp(28),
    width: "100%",
    marginTop: hp(1),
    flexDirection: "row",
    borderTopWidth: hp(0.2),
    borderBottomWidth: hp(0.2),
    borderColor: Colors.black,
  },
});
