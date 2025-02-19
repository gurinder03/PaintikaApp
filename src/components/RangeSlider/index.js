import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import RangeSlider from 'rn-range-slider';

const PriceRangeSlider = ({ onValuesChange }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const handleValuesChange = (start, end) => {
        setMinPrice(start);
        setMaxPrice(end);
        onValuesChange(start, end);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <RangeSlider
                style={{
                    paddingVertical: 10,
                    marginHorizontal: 10,
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(10), 
                    marginTop:-heightPercentageToDP(5)
                }}
                min={0}
                max={10000}
                step={100}
                onValueChanged={(start, end) => handleValuesChange(start, end)}
                renderThumb={() => {
                    return (
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: "#2F3D8F",
                            }}
                        />
                    )
                }}
                renderRail={() => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                height: 14,
                                borderRadius: 7,
                                backgroundColor: 'lightgrey',
                            }}
                        />
                    )
                }}
                renderRailSelected={() => {
                    return (
                        <View
                            style={{
                                height: 14,
                                borderRadius: 2,
                                backgroundColor: "#2F3D8F",
                            }}
                        />
                    )
                }}
                renderLabel={() => {
                    return (
                        <View
                            style={{
                                alignItems: 'center',
                                padding: 2,
                                backgroundColor: '#EAEAFF',
                            }}
                        >
                            <Text
                                style={{ fontSize: 16 }}
                            >
                                {minPrice} - {maxPrice}
                            </Text>
                        </View>
                    )
                }}
                renderNotch={() => {
                    return (
                        <View
                            style={{
                                width: 0,
                                height: 0,
                                borderLeftWidth: 10,
                                borderRightWidth: 10,
                                borderTopWidth: 20,
                                borderLeftColor: 'transparent',
                                borderRightColor: 'transparent',
                                borderTopColor: '#2F3D8F',
                            }}
                        />
                    )
                }}
            />
        </View>
    );
};

export default PriceRangeSlider;
