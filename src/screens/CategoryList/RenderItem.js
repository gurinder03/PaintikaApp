import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Text
} from "react-native";
import FontStyles from "../../constants/FontStyles";
import Colors from "../../constants/Colors";
import Rupee from "react-native-vector-icons/FontAwesome";
import BookMark from "react-native-vector-icons/Feather";


const RenderItem = ({ data, nav, userType }) => {
    const handleDetail = (data) => {
        nav.navigate("Detail", {
            id: data?._id,
            creatorId: data?.creator_id,
        })
    };

    return (
        <View>
            <View style={styles.containerSlide}>
                <TouchableOpacity disabled={userType == "ARTIST"} style={{ alignItems: 'center' }} onPress={() => handleDetail(data)} >
                    <Image source={{ uri: data?.image }} style={styles.imgMain} />
                </TouchableOpacity>
                <View style={styles.mailCate}>
                    <View>
                        <View>
                            <Text style={styles.cateName}>
                                {data?.name}
                            </Text>
                        </View>
                        <View>
                            <View style={styles.priceSection}>
                                <Rupee name="rupee" size={17} />
                                <Text style={styles.priceMain}>
                                    {data?.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.bookmarkSection}>
                        <TouchableOpacity>
                            <BookMark name="bookmark" size={18} />
                        </TouchableOpacity>
                    </View> */}
                </View>
            </View>
        </View>
    )
}

export default RenderItem;

const styles = StyleSheet.create({
    containerSlide: {
        flex: 1,
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
    imgMain: {
        resizeMode: "contain",
        width: "93%",
        height: 350,
        borderRadius: 10,
        marginVertical: 10,
    },
    cateName: {
        fontSize: 15,
        fontFamily: FontStyles.manRopeRegular,
        textAlign: "left",
        color: Colors.black,
    },
    mailCate: {
        marginHorizontal: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceMain: {
        fontFamily: FontStyles.manRopeRegular,
        color: Colors.black,
        marginTop: -3,
        fontSize: 14,
        marginLeft: 3,
    },
    priceSection: {
        flexDirection: 'row',
        marginTop: 5
    },
    bookmarkSection: {

    }
})