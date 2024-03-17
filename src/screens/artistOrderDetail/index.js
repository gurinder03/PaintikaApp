import {
    View, Text, Image, ScrollView, StyleSheet, TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import FontStyles from "../../constants/FontStyles";
import Colors from "../../constants/Colors";
import BackIcon from "react-native-vector-icons/Ionicons";


export default function ArtistOrderDetails({ navigation, route }) {
    const { details } = route.params || {};
    console.log("artist order detail", details)
    return (
        <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
            <View
                style={{
                    height: "100%",
                    backgroundColor: Colors.white,
                    width: "100%"
                }}
            >
                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity style={{ marginHorizontal: 13 }} onPress={() => navigation.goBack()}>
                        <BackIcon name={"chevron-back"} size={30} />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ width: "100%", }}>
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: FontStyles.manRopeSemiBold,
                                color: Colors.black,
                                textAlign: "center",
                                textDecorationLine: "underline"
                            }}
                        >
                            Orders Detail
                        </Text>

                    </View>
                    <View style={{ width: "100%", top: 20, paddingHorizontal: 15 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Order Number :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {details.order_number} </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>CreatedAt :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}>{new Date(details.created_at).toISOString().split('T')[0].split('-').reverse().join('-')}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Payment Id :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {details.payment_id} </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Payment Method :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {details.payment_method} </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Payment Status :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {details.payment_status} </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Order Status :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {details.status} </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: "100%", marginTop: 30 }}>
                    <Text
                        style={{
                            fontSize: 25,
                            fontFamily: FontStyles.manRopeSemiBold,
                            color: Colors.black,
                            textAlign: "center",
                            textDecorationLine: "underline"
                        }}
                    >
                        User Detail
                    </Text>
                </View>
                <View style={{ width: "100%", top: 20, paddingHorizontal: 15, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold", color: "grey" }}>Name :</Text>
                        <Text style={{ fontWeight: "500", color: "grey" }}> {details.user_detail.name} </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold", color: "grey" }}>Email/Phone :</Text>
                        <Text style={{ fontWeight: "500", color: "grey" }}> {details.user_detail.email_or_mobile_number} </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold", color: "grey" }}>Role :</Text>
                        <Text style={{ fontWeight: "500", color: "grey" }}> {details.user_detail.role}  </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 40 }}>
                        <Text style={{ fontWeight: "bold", color: "grey" }}>Timezone :</Text>
                        <Text style={{ fontWeight: "500", color: "grey" }}> {details.timezone}</Text>
                    </View>
                </View>
                {details?.items.map((item, index) => (
                    <View style={{ width: "100%", top: 10, paddingHorizontal: 15 }}>
                        <Text style={{ fontWeight: "bold", marginVertical: 5, fontSize: 15 }}>{"Item " + (index + 1)}</Text>
                        <Image
                            resizeMode="contain"
                            source={{ uri: item.image }}
                            style={{
                                width: "100%",
                                height: 150,
                                marginBottom: 10,
                                borderRadius: 10,
                                resizeMode: "cover"
                            }}

                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Item Name :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {item.name} </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Item theme :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {item.theme}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Size:</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {item.size} </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Quantity :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {item.quantity} </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <Text style={{ fontWeight: "bold", color: "grey" }}>Price :</Text>
                            <Text style={{ fontWeight: "500", color: "grey" }}> {item.price} </Text>
                        </View>
                    </View>
                ))}
                <View style={{ width: "100%", paddingHorizontal: 15, top: 10, }}>
                    <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between", }}>
                        <Text style={{ fontWeight: "bold" }}>Order Sub Total :</Text>
                        <Text style={{ fontWeight: "500", color: "grey" }}> {details.order_sub_total} </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between", }}>
                        <Text style={{ fontWeight: "bold" }}>Tax :</Text>
                        <Text style={{ fontWeight: "500", color: "grey" }}> {details.tax}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between", }}>
                        <Text style={{ fontWeight: "bold" }}>Order total :</Text>
                        <Text style={{ fontWeight: "500", color: "grey" }}> {details.order_total} </Text>
                    </View>
                </View>
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
}
