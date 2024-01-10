import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
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
            <View style={styles.nameText}>
                <Text style={styles.slideMain}>{data?.name}</Text>
            </View>
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
    nameText:{
        position:'absolute',
        top:120,
        bottom:0,
        right:0,
        left:0,
        alignItems:'center',
        justifyContent:'flex-start'

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
        color: '#FFFFFF', 
        marginHorizontal:18, 
        // textAlign:'center',
        marginBottom:10
    }
})