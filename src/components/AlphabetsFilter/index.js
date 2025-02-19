import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FontStyles from '../../constants/FontStyles';

const AlphabetFilter = ({ onSelect }) => {
    const [selectedAlphabet, setSelectedAlphabet] = useState('ALL');
    const [buttonWidth, setButtonWidth] = useState(0);
    const alphabets = ['ALL', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))];
    
    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        const availableWidth = screenWidth - 10; 
        const numButtonsPerRow = 10; 
        const calculatedButtonWidth = availableWidth / numButtonsPerRow;
        setButtonWidth(calculatedButtonWidth);
    }, []);

    const handleAlphabetSelect = (alphabet) => {
        setSelectedAlphabet(alphabet);
        onSelect(alphabet);
    };

    return (
        <View style={styles.container}>
            {alphabets.map((alphabet, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.alphabetButton, { width: buttonWidth }, selectedAlphabet === alphabet && styles.selected]}
                    onPress={() => handleAlphabetSelect(alphabet)}>
                    <Text style={[styles.alphabetText, { color: selectedAlphabet === alphabet ? 'white' : 'black' }]}>{alphabet}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    alphabetButton: {
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
        backgroundColor: "#2F3D8F",
    },
    alphabetText: {
        fontSize: 16,
        fontFamily: FontStyles.manRopeMedium,
    },
});

export default AlphabetFilter;
