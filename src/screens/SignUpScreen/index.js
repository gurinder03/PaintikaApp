import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../helpers/CustomButton';
import ToggleSwitch from 'toggle-switch-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import FontStyles from '../../constants/FontStyles';
import {signUp} from '../../redux/actions';
export default function SignUpScreen({navigation}) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    name: '',
    password: '',
    email: '',
    gender: '',
    dob: new Date(),
  });
  const [text, onChangeText] = React.useState('');
  const [isPainter, setisPainter] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const isLoading = useSelector(state => state.saveDataReducer.isLoading);
  console.log('🚀 ~ file: index.js:33 ~ SignUpScreen ~ isLoading:', isLoading);
  const saveData = () => {
    if (inputValue.name == '') {
      Alert.alert('Name is required.');
    } else if (inputValue.email == '') {
      Alert.alert('Email is required.');
    } else if (inputValue.password == '') {
      Alert.alert('Password is required.');
    } else {
      // dispatch(saveSignInData(inputValue));
      dispatch(
        signUp({
          name: inputValue.name,
          email: inputValue.email,
          password: inputValue.password,
          role: isPainter ? 'PAINTER' : 'USER',
        }),
      );
    }
  };

  const handleChange = (name, e) => {
    console.log('NAME>>>>>>>', name, 'EVNET>>>>>', e);
    if (name == 'name') {
      setInputValue({...inputValue, name: e});
    } else if (name == 'email') {
      setInputValue({...inputValue, email: e});
    } else {
      setInputValue({...inputValue, password: e});
    }
  };

  const validateEmail = text => {
    console.log(typeof text);
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
      handleChange('email', text);
      seterrorMessage('');
    } else {
      if (reg.test(text) === false) {
        console.log('WORKING FAILED');
        handleChange('email', text);
        seterrorMessage('Not a valid email address. Should be your@email.com');
        return false;
      } else {
        console.log('WORKING PASSED');
        handleChange('email', text);
        seterrorMessage('');
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <Text>
            <BackIcon
              name="chevron-back-outline"
              size={30}
              color={Colors.black}
            />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headingTitle}>Sign up</Text>
      </View>
      <View style={styles.inputContainer}>
        <View
          style={{
            height: 45,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingHorizontal: 10,
          }}>
          <ToggleSwitch
            isOn={isPainter}
            onColor="green"
            offColor="#C8C8C8"
            label="Are you Painter?"
            labelStyle={{
              color: `${Colors.black}`,
              fontSize: 18,
              fontStyle: FontStyles.manRopeMedium,
            }}
            size="medium"
            onToggle={isOn => setisPainter(isOn)}
          />
        </View>

        <TextInput
          style={styles.input}
          onChangeText={e => handleChange('name', e)}
          value={inputValue.name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={e => validateEmail(e)}
          value={inputValue.email}
          placeholder="Email or Phone Number"
        />
        <Text style={styles.errorTitle}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={e => handleChange('password', e)}
          value={inputValue.password}
          placeholder="Password"
        />
      </View>
      <View style={styles.buttonContainer}>
        <ActivityIndicator size={'large'} animating={isLoading} />
        <CustomButton title={'SIGN UP'} onPress={saveData} />
      </View>
      <View style={styles.socialLogin}>
        <Text style={styles.socialTitle}>Or sign up with social account</Text>
        <View style={styles.socialLinks}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/facebook.png')}
              style={styles.icon}
            />
          </View>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/Google.png')}
              style={styles.googleIcon}
            />
          </View>
        </View>
      </View>
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
    // justifyContent: 'center',
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
    height: '40%',
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
    fontFamily: FontStyles.manRopeRegular,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  errorTitle: {
    fontSize: 14,
    color: Colors.alertRed,
    textAlign: 'center',
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
    fontFamily: FontStyles.manRopeRegular,
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
});
