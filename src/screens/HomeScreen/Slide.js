import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Platform,
    ScrollView,
    Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Slide = ({ data, nav }) => {

    const handlePress = (data) => {
        nav.navigate("Category", { item: data })
    };

    return (
        <View style={styles.containerSlide}>
            <TouchableOpacity style={styles.touchImg} onPress={() => handlePress(data)}>
                <Image style={styles.mainImg} source={{ uri: data?.image }} />
            </TouchableOpacity>
            <Text style={styles.slideMain}>{data?.name}</Text>
        </View>
    );
}

export default Slide

const styles = StyleSheet.create({
    containerSlide: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderWidth:1,
        borderColor:'#E1E1E1',
        marginHorizontal:10,
        borderRadius:15,
        marginBottom:15,
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
        width: "93%",
        height: 350,
        resizeMode: "cover",
        borderRadius: 10,
        marginVertical: 10,
    },
    touchImg:{
        alignItems:'center'
    },
    slideMain:{ 
        fontSize: 18, 
        color: '#000000', 
        marginHorizontal:18, 
        marginBottom:10
    }
})