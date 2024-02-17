import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from 'react-native-vector-icons/Ionicons';
import RightIcon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../helpers/CustomButton';
import Colors from '../../constants/Colors';
import FontStyles from '../../constants/FontStyles';
import {forgotPassword} from '../../redux/actions';
export default function ForgotPassword({navigation}) {
  const userData = useSelector(state => state.saveDataReducer.signUpData);
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [errorMessage, seterrorMessage] = useState('');

  const validateEmail = text => {
    // console.log('Text::::::', text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let matchingResult = text.slice(0, 1);
    if (
      (matchingResult == '2' || matchingResult == '3' || matchingResult == '4',
      matchingResult == '5' ||
        matchingResult == '6' ||
        matchingResult == '7' ||
        matchingResult == '8' ||
        matchingResult == '9' ||
        matchingResult == '0' ||
        matchingResult == '1')
    ) {
      // console.log('INSIDE IF');
      setemail(text);
      seterrorMessage('');
    } else {
      // console.log('INSIDE ELSE');
      if (reg.test(text) === false) {
        // console.log('WORKING FAILED');
        setemail(text);
        seterrorMessage('Not a valid email address. Should be your@email.com');
        return false;
      } else {
        // console.log('WORKING PASSED');
        setemail(text);
        seterrorMessage('');
      }
    }
  };

  const handleChange = () => {
    // if (email !== '') {
    //   dispatch(
    //     forgotPassword({
    //       OTP: '1234',
    //       role: 'USER',
    //       email_or_mobile_number: email,
    //     }),
    //   );
    // } else {
    //   Alert.alert('Must enter email.');
    // }

    navigation.navigate('Create');
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity style={styles.backIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>
              <BackIcon
                name="chevron-back-outline"
                size={30}
                color={Colors.black}
              />
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.headingTitle}>Forgot password</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text
          style={{
            marginHorizontal: 10,
            marginBottom: 10,
            fontSize: 16,
            fontFamily: FontStyles.manRopeRegular,
            color: `${Colors.black}`,
          }}>
          Please, enter your email address or Phone. You will receive an OTP to
          create a new password.
        </Text>
        <TextInput
          style={[
            styles.input,
            {borderColor: errorMessage !== '' ? 'red' : 'transparent'},
          ]}
          onChangeText={e => validateEmail(e)}
          value={email}
          placeholder="Email or Phone Number"
        />
        <View
          style={{
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: FontStyles.manRopeRegular,
              color: `${Colors.alertRed}`,
            }}>
            {errorMessage}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title={'SEND'} onPress={handleChange} />
      </View>
      <View style={styles.socialLogin}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.white,
  },
  heading: {
    height: '20%',
    width: '100%',
    padding: 5,
  },
  headingTitle: {
    fontSize: 30,
    fontFamily: FontStyles.manRopeSemiBold,
    color: Colors.black,
    marginTop: 9,
  },
  inputContainer: {
    height: '30%',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: '20%',
  },
  socialLogin: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 65,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    backgroundColor: Colors.white,
    elevation: 3,
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: FontStyles.manRopeRegular,
  },
  socialLinks: {
    height: '70%',
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  iconContainer: {
    height: 60,
    width: 80,
    backgroundColor: Colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  googleIcon: {
    width: 85,
    height: 75,
  },
  backIcon: {
    height: 55,
    justifyContent: 'center',
  },
  forgotPasswrd: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    // flexDirection: 'row',
  },
  forgotPasswrdTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
});
