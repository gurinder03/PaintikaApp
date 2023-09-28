import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import FontStyles from "../../constants/FontStyles";
import RupeeIcon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
export default function ProductDetail() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{ backgroundColor: "yellow", height: hp(60), width: wp(100) }}
      >
        <Image
          source={require("../../../assets/art.jpg")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View
        style={{
          height: hp(40),
          width: wp(100),
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: wp(100),
            height: hp(5),
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: Colors.black,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: Colors.black,
              fontFamily: FontStyles.manRopeSemiBold,
            }}
          >
            ADD
          </Text>
        </TouchableOpacity>
        <ScrollView
          style={{
            height: hp(35),
            width: wp(100),
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontStyle: FontStyles.manRopeSemiBold,
              color: Colors.black,
            }}
          >
            Dynamic Art
          </Text>
          <View
            style={{
              flexDirection: "row",
              height: hp(5),
              width: wp(15),
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "100%",
                width: wp(4),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RupeeIcon name="rupee" size={18} color={Colors.black} />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: FontStyles.manRopeSemiBold,
                color: Colors.black,
                marginTop: -5,
              }}
            >
              899/-
            </Text>
          </View>
          <View style={{ width: wp(90) }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 15,
                fontStyle: FontStyles.manRopeRegular,
              }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Inventore, dolores laudantium suscipit exercitationem atque
              possimus iste illo, odio debitis nemo id maiores aliquid
              reprehenderit at cum totam consequatur? Aliquid, odit? Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Blanditiis ut nisi
              officia. Aliquam illum veniam soluta autem reprehenderit, eveniet
              magni nobis vero cum quasi, fugiat quam, numquam debitis commodi
              earum?
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
