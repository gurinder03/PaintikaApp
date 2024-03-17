import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import FontStyles from "../../constants/FontStyles";
import RupeeIcon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getDetailsData } from "../../redux/actions";
import Toast from "react-native-toast-message";
import BackIcon from "react-native-vector-icons/Ionicons";
import Navigation from "../../navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProductDetail = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { id, creatorId } = route.params || {};
  const detailsData = useSelector((state) => state.saveDataReducer.detailsData);
  const [userId, setuserId] = useState("");
  const [data, setData] = useState("");
  const [authToken, setauthToken] = useState(null);

  useEffect(() => {
    if (id !== null) {
      dispatch(getDetailsData(id));
      getAuthToken();
    }
    getData();
  }, [id]);


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        setuserId(JSON.parse(value));
      }
    } catch (e) {
      console.log('Error =>', e);
    }
  };

  const addToCart = () => {
    if (authToken !== null) {
      dispatch(
        addProduct({
          user_id: userId,
          art_id: id,
          creator_id: creatorId,
          quantity: 1,
          token: authToken,
        })
      );
    } else {
      Toast.show({
        type: "error",
        text1: `Login or Signup First.`,
        topOffset: 60,
      });
      navigation.navigate("Login");
    }
  };

  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authToken");
      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log("Error While getting Token", e);
    }
  };


  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon name={"chevron-back"} size={32} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerSlide}>
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: detailsData?.data?.image }} style={styles.mainImg} />
        </View>
        <View style={styles.priceMain}>
          <Text style={styles.nameText}>
            {detailsData?.data?.name}
          </Text>
          <View style={styles.priceItem}>
            <RupeeIcon name="rupee" size={18} color={Colors.black} />
            <Text style={styles.priceSection}>
              {detailsData?.data?.price}
            </Text>
          </View>
        </View>
        <View style={styles.addsBtn}>
          <TouchableOpacity style={styles.btnMain} onPress={() => addToCart()}>
            <Text> ADD To Cart </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginHorizontal: 15
  },
  containerSlide: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: '#E1E1E1',
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 15,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  mainImg: {
    resizeMode: "contain",
    width: "93%",
    height: 350,
    borderRadius: 10,
    marginVertical: 10,
  },
  addsBtn: {
    margin: 10,
  },
  btnMain: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: "35%"
  },
  nameText: {
    fontSize: 15,
    color: Colors.black,
    marginHorizontal: 20
  },
  priceSection: {
    fontSize: 15,
    // fontFamily: FontStyles.manRopeSemiBold,
    color: Colors.black,
    marginLeft: 3
  },
  priceMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15
  },
  mssgeSection: {
    color: Colors.black,
    fontSize: 15,
    // fontStyle: FontStyles.manRopeRegular,
  }
})