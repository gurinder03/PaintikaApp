import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';
import FontStyles from '../../constants/FontStyles';
import {useSelector} from 'react-redux';
import CustomButton from '../../helpers/CustomButton';

export default function CreatePassword() {
  const [intialPassword, setintialPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const isLoading = useSelector(state => state.saveDataReducer.isLoading);
  return (
    <View style={styles.container}>
      <View
        style={{
          height: '35%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.otpTitle}>Create new Password</Text>
        <View
          style={{
            height: 200,
            width: 350,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../../assets/animations/otpanimation.json')}
            autoPlay
            style={{height: 120, width: 120}}
          />
        </View>
      </View>
      <View style={{height: '65%'}}>
        <View
          style={{
            paddingHorizontal: 20,
            width: '100%',
            height: 40,
            justifyContent: 'center',
          }}></View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={e => setintialPassword(e)}
            value={intialPassword}
            placeholder="Enter password"
          />
          <TextInput
            style={styles.input}
            onChangeText={e => setconfirmPassword(e)}
            value={confirmPassword}
            placeholder="Confirm password"
          />
          <ActivityIndicator size={'large'} animating={isLoading} />
          <CustomButton
            title={'Create Password'}
            onPress={() => goverifyOtp()}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  input: {
    height: 65,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    fontFamily: FontStyles.manRopeRegular,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  otpTitle: {
    fontSize: 28,
    fontFamily: FontStyles.manRopeMedium,
    color: `${Colors.black}`,
    fontWeight: '800',
  },
});
