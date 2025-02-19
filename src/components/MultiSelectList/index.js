import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontStyles from '../../constants/FontStyles';

const MultiSelectList = ({ data, onSelectionChange }) => {
    const [selectedItems, setSelectedItems] = useState({});

    const toggleItemSelection = (category, item) => {
        const updatedSelection = { ...selectedItems };

        if (updatedSelection[category] && updatedSelection[category].includes(item)) {
            updatedSelection[category] = updatedSelection[category].filter(selectedItem => selectedItem !== item);
        } else {
            updatedSelection[category] = [...(updatedSelection[category] || []), item];
        }

        setSelectedItems(updatedSelection);
        onSelectionChange(updatedSelection);
    };

    return (
        <View style={styles.container}>
            {data.map((section, index) => (
                <View key={index} style={styles.section}>
                    <Text style={styles.sectionHeader}>{section.heading}</Text>
                    {section.options.map((option, optionIndex) => (
                        <TouchableOpacity
                            key={optionIndex}
                            style={[
                                styles.option,
                                selectedItems[section.heading] && selectedItems[section.heading].includes(option) && styles.selectedOption
                            ]}
                            onPress={() => toggleItemSelection(section.heading, option)}>
                            <Text style={[styles.optionText, { color: selectedItems[section.heading] && selectedItems[section.heading].includes(option) ? 'white' : 'black' }]}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    section: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#2F3D8F',
        padding:5
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: FontStyles.manRopeMedium,
    },
    option: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 5,
    },
    selectedOption: {
        backgroundColor: "#2F3D8F",
        borderColor: '#2F3D8F',
    },
    optionText: {
        fontSize: 16,
        fontFamily: FontStyles.manRopeMedium,
    },
});

export default MultiSelectList;
