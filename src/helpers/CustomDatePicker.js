import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Colors from '../constants/Colors';
import FontStyles from '../constants/FontStyles';
export default function CustomDatePicker({value, onChange}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View
      style={{
        height: 100,
        width: '100%',
        padding: 10,
      }}>
      <Text style={styles.title}>Date of Birth</Text>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 20,
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: Colors.black,
        }}>
        <Text>MM/DD/YY</Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Image
            source={require('../../assets/calendar.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={value}
        onConfirm={date => {
          setOpen(false);
          onChange(date);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontFamily: FontStyles.manRopeSemiBold,
  },
});
