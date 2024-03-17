import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontStyles from "../../constants/FontStyles";
import Colors from "../../constants/Colors";
import RazorpayCheckout from "react-native-razorpay";
import DeleteIcon from "react-native-vector-icons/AntDesign";
import BackIcon from "react-native-vector-icons/Ionicons";
import RadioButtonEmpty from "react-native-vector-icons/Fontisto";
import RadioActive from "react-native-vector-icons/Fontisto";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useIsFocused } from "@react-navigation/native";
import { fetchRequest } from "../../Services/APICaller";
import Toast from "react-native-toast-message";


export default function Address({ navigation, route }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [authToken, setauthToken] = useState("");
  // console.log("🚀 ~ file: index.js:24 ~ Address ~ authToken:", authToken);
  const [userId, setuserId] = useState("");
  const addresses = useSelector((state) => state.saveDataReducer.addressData);
  // console.log("🚀 ~ file: index.js:11 ~ Address ~ addresses:", addresses);
  const [selctedValue, setselctedValue] = useState(false);
  const [selectedAddress, setselectedAddress] = useState(null);
  const { details } = route.params || {};
  const userSavedData = useSelector((state) => state.saveDataReducer.userData);
  useEffect(() => {
    getData();
    getAuthToken();
  }, [isFocused]);

  useEffect(() => {
    if (userId !== "" && authToken !== "") {
      // console.log("INSIDE SUCCESS>>>>>>");
      dispatch({
        type: "GET_ADDRESS",
        payload: {
          user_id: userId,
          page: 1,
          limit: 10,
          token: authToken,
        },
      });
    }
  }, [userId, authToken, isFocused]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      // console.log("🚀 ~ file: index.js:30 ~ getData ~ value:", value);
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
      // console.log("🚀 ~ file: index.js:41 ~ getAuthToken ~ jsonValue:",  jsonValue);
      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };

  const addOrder = async (checkoutData, paymentId) => {
    var myHeaders = new Headers()
    myHeaders.append('token', `${'Bearer ' + authToken}`)
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "address_id": selectedAddress,//address selected
      "artistList": checkoutData?.artistList,// receive from checkout API 
      "items": checkoutData?.carts.map(cart => cart._id),// receive from checkout API 
      "payment_id": paymentId,
      "timezone": "Asia/Kolkata",
      "user_id": userSavedData?._id
    })
    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders,
      redirect: 'follow',
    };
    const apiResponse = await fetchRequest(
      '/order/add',
      requestOptions,
    )
    if (apiResponse.statusCode == '200') {
      Toast.show({
        type: "success",
        text1: `${apiResponse?.message}`,
        topOffset: 60,
        onHide: () => {
        },
      });
      navigation.navigate("Home");
    } else {
      Toast.show({
        type: "error",
        text1: `Error in placing order`,
        topOffset: 60,
        onHide: () => {
        },
      });
    }
  }

  const onPressBuy = async (total) => {
    if (selectedAddress === null) {
      Alert.alert("Please Select Address First.");
    } else {
      var myHeaders = new Headers()
      myHeaders.append('token', `${'Bearer ' + authToken}`)
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "items": details?.carts.map(cart => cart._id),//_id from cart Array
        "price": total,
        "user_id": userSavedData?._id
      });
      var requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow',
      };
      const apiResponse = await fetchRequest(
        '/order/checkout',
        requestOptions,
      )
      console.log('checkout API', apiResponse)
      if (apiResponse.statusCode == '200') {
        const RAZORPAY_KEY = "rzp_test_jJJrfOKqYAvjcP";
        let options = {
          description: "Credits towards purchase",
          image: "", // Add image URL if needed
          currency: "INR",
          key: RAZORPAY_KEY,
          amount: total * 100,
          name: "Paintika",
          order_id: "", // auto generated unique alpha numric
          prefill: {
            email: userSavedData?.email_or_mobile_number, // Add user's email
            contact: "", // Add user's contact number
            name: "", // Add user's name
          },
          notes: {
            address: "User's address", // Add user's address if needed
          },
          theme: { color: "#2F3D8F" },
          display: {
            hide: [
              { method: 'paylater' },
              { method: 'wallet' }
            ]
          }
        };
        RazorpayCheckout.open(options)
          .then((data) => {
            // handle success
            console.log("Payment successful:", data);
            addOrder(apiResponse?.data, data?.razorpay_payment_id)
          })
          .catch((error) => {
            // handle failure
            console.error("Payment error:", error);
            Toast.show({
              type: "error",
              text1: `Payment failed`,
              topOffset: 60,
              onHide: () => {
              },
            });
          });
      } else {
        Toast.show({
          type: "error",
          text1: `${apiResponse?.message}`,
          topOffset: 60,
          onHide: () => {
          },
        });
      }

    }
  };

  const removeAddress = (id) => {
    if (userId !== "") {
      const payload = {
        token: authToken,
        userId: userId,
        tableId: id,
      };

      dispatch({ type: "REMOVE_ADDRESS", payload: payload });

      setTimeout(() => {
        dispatch({
          type: "GET_ADDRESS",
          payload: {
            user_id: userId,
            page: 1,
            limit: 10,
            token: authToken,
          },
        });
      }, 1000);
    }
  };

  const selectItem = (item) => {
    // console.log("Selected Item >>>>>>>>>", item);
    setselectedAddress(item?._id);
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // padding: 5,
      }}
    >
      <View
        style={{
          height: "10%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            width: "30%",
            padding: 5,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon name="chevron-back" size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            width: "70%",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: FontStyles.manRopeSemiBold,
              color: Colors.black,
              //   height: "20%",
            }}
          >
            Select Address
          </Text>
        </View>
      </View>

      <View
        style={{
          height: "80%",
          width: "100%",
          padding: 20,
        }}
      >

        <View>
          {addresses?.length > 0 &&
            <>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FontStyles.manRopeSemiBold,
                  color: Colors.black,
                }}
              >
                Saved Address
              </Text>
              {
                addresses.map((Item, i) => {
                  return (
                    <View key={i}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#D3D3D3",
                          padding: 10,
                          height: hp(9),
                          justifyContent: "center",
                          borderRadius: 10,
                          marginVertical: 5,
                        }}
                        onPress={() => selectItem(Item)}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          {Item?._id === selectedAddress ? (
                            <RadioActive
                              name={"radio-btn-active"}
                              color={Colors.black}
                              size={22}
                            />
                          ) : (
                            <RadioButtonEmpty
                              name="radio-btn-passive"
                              color={Colors.black}
                              size={22}
                            />
                          )}

                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 16,
                              fontFamily: FontStyles.manRopeSemiBold,
                            }}
                          >
                            {Item?.name}
                          </Text>
                          <View>
                            <TouchableOpacity
                              onPress={() => removeAddress(Item?._id)}
                            >
                              <DeleteIcon name={"delete"} size={22} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              }
            </>
          }
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: hp(3)
            }}
          >
            {addresses?.length == 0 &&
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: FontStyles.manRopeSemiBold,
                }}
              >
                No Saved Address Found
              </Text>
            }
            {
              addresses?.length < 2 &&
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: hp(3)
                }}
              >
                <TouchableOpacity
                  style={{
                    height: heightPercentageToDP(5),
                    width: widthPercentageToDP(45),
                    backgroundColor: Colors.black,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("AddAddress", {
                      token: authToken,
                      userId: userId,
                    })
                  }
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.white,
                      fontFamily: FontStyles.manRopeSemiBold,
                    }}
                  >
                    Add New Address
                  </Text>
                </TouchableOpacity>
              </View>
            }

          </View>
        </View>

      </View>
      <View style={{ height: "10%", width: "100%" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.black,
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => onPressBuy(details?.order_total)}
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
            <Text style={{ fontSize: 12, color: Colors.black }}>
              {`TOTAL ₹ ${details?.order_total}`}
            </Text>
            <Text style={{ fontSize: 12, color: Colors.black }}>
              INCLUDING GST
            </Text>
          </View>
        </View>
      </View>
    </View >
  );
}
