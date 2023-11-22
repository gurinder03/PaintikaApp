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
import RazorpayCheckout from "react-native-razorpay";
import Remove from "react-native-vector-icons/FontAwesome";
import { addProduct } from "../../redux/actions";
export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const [userId, setuserId] = useState("");
  const [authToken, setauthToken] = useState("");
  const [cart, setcart] = useState([]);
  const [itemIndex, setitemIndex] = useState(1);
  const detailsData = useSelector((state) => state.saveDataReducer.cartList);
  const isFocused = useIsFocused();
  const imgURL =
    "https://m.media-amazon.com/images/I/61L5QgPvgqL._AC_UF1000,1000_QL80_.jpg";

  console.log(
    "🚀 ~ file: index.js:18 ~ CartScreen ~ detailsData:",
    detailsData
  );

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

  const updateProduct = (id, creatorId) => {
    console.log("INSIDE UPDATE PRODUCT>>>>>>>>>>", id, creatorId);
    setitemIndex(itemIndex + 1);
    dispatch(
      addProduct({
        user_id: userId,
        art_id: id,
        creator_id: creatorId,
        quantity: itemIndex,
        token: authToken,
      })
    );
    dispatch({
      type: "GET_PRODUCTS",
      payload: { userId: userId, token: authToken },
    });
  };

  const RenderItem = ({ item }) => {
    console.log("Working >>>>>>>>>>>>>>", item);
    return (
      <>
        <View style={styles.productContainer}>
          <View
            style={{
              width: "40%",
              height: "100%",
              // padding: 5,
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
                Lorem Ipsum
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontStyles.manRopeRegular,
                  color: Colors.black,
                  marginLeft: 9,
                }}
              >
                this is the description
              </Text>
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
                {`₹ ${item.price}`}
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
                    <AddIcon name="remove" size={25} />
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
                  onPress={() => updateProduct(item?._id, item?.creator_id)}
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

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      console.log("🚀 ~ file: index.js:189 ~ getData ~ value:", value);
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
      console.log(
        "🚀 ~ file: index.js:200 ~ getAuthToken ~ jsonValue:",
        jsonValue
      );

      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };

  const onPressBuy = (total) => {
    //Order Api: Call POST api with body like (username, id, price etc) to create an Order and use order_id in below options object
    // const response = await .....
    const RAZORPAY_KEY = "rzp_test_jJJrfOKqYAvjcP";
    let options = {
      description: "Credits towards consultation",
      image: cart?.item?.image, //require('../../images.png')
      currency: "INR", //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
      key: RAZORPAY_KEY,
      amount: total.toFixed(2),
      name: "Acme Corp",
      order_id: "", //Replace this with an order_id(response.data.orderId) created using Orders API.
      prefill: {
        email: "",
        contact: "",
        name: "",
      }, //if prefill is not provided then on razorpay screen it has to be manually entered.
      notes: {
        address: "",
      },
      theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
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
                details: detailsData?.order_total,
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
