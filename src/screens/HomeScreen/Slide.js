import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    Platform
} from "react-native";

const Slide = ({ data, nav }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();

        return () => animation.stop(); // Clean up animation on unmount
    }, [fadeAnim]);

    const handlePress = () => {
        nav.navigate("Category", { item: data });
    };

    return (
        <View style={styles.containerSlide}>
            <TouchableOpacity style={styles.touchImg} onPress={handlePress}>
                <Image style={styles.mainImg} source={{ uri: data?.image }} />
                <Animated.View style={[styles.nameText, { opacity: fadeAnim }]}>
                    <Text style={styles.slideMain}>{data?.name}</Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
}

export default Slide;

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
    nameText: {
        position: 'absolute',
        top: '50%',
        left: '37%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        padding: 5,
    },
    mainImg: {
        width: "93%",
        height: 350,
        resizeMode: "cover",
        borderRadius: 10,
        marginVertical: 10,
    },
    touchImg: {
        alignItems: 'center'
    },
    slideMain: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
    }
});
