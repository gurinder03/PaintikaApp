import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/HeaderScreen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TextInputComponent from '../../helpers/TextInput';
import CustomDatePicker from '../../helpers/CustomDatePicker';
import {ScrollView} from 'react-native-gesture-handler';
import CustomPicker from '../../helpers/CustomPicker';
import Colors from '../../constants/Colors';
import FontStyles from '../../constants/FontStyles';
import CustomButton from '../../helpers/CustomButton';

export default function EditProfile() {
  const [Info, setInfo] = useState({
    name: '',
    qulification: '',
    age: '',
    occupation: '',
    email: '',
    gender: '',
  });

  const onHandleChnage = (e, name) => {
    if (name == 'name') {
      setInfo({...Info, name: e});
    } else if (name == 'email') {
      setInfo({...Info, email: e});
    } else if (name == 'age') {
      setInfo({...Info, age: e});
    } else if ((name = 'Gender')) {
      setInfo({...Info, gender: e});
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <View
        style={{
          height: hp(10),
          backgroundColor: '#FFFFFF',
          width: wp(100),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.black,
            fontFamily: FontStyles.manRopeSemiBold,
            fontSize: 22,
          }}>
          Edit Profile
        </Text>
      </View>
      <ScrollView
        style={{
          height: hp(85),
          width: wp(100),
        }}>
        <TextInputComponent
          title={'Name'}
          onChange={e => onHandleChnage(e, 'name')}
          value={Info.name}
          placeHolder={'Enter your Name'}
        />
        <TextInputComponent
          title={'Email'}
          placeHolder={'Enter your Email'}
          onChange={e => onHandleChnage(e, 'email')}
          value={Info.email}
        />
        <TextInputComponent
          title={'Age'}
          value={Info.age}
          placeHolder={'Enter your age in Numbers'}
          onChange={e => onHandleChnage(e, 'age')}
        />
        <CustomPicker
          title={'Gender'}
          onChange={onHandleChnage}
          value={Info.gender}
        />
        <CustomPicker title={'Qualification'} />
        <TextInputComponent
          title={'Experience'}
          placeHolder={'Please enter your experience in Numbers'}
        />

        <CustomDatePicker value={new Date()} onChange={onHandleChnage} />
        <CustomButton title={'SAVE'} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({});
