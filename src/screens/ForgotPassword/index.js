import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import ToggleSwitch from "toggle-switch-react-native";
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import BackIcon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../helpers/CustomButton';
import Colors from "../../constants/Colors";
import FontStyles from '../../constants/FontStyles';
import {forgotPassword} from '../../redux/actions';
export default function ForgotPassword({navigation}) {
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPainter, setisPainter] = useState(false);

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!isNaN(text) && text.length === 10) {
      setErrorMessage('');
      return true;
    } else if (reg.test(text) === false) {
      setErrorMessage('Not a valid email address or mobile number. Should be your@email.com or 1234567890');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleChange = () => {
    if (validateEmail(email)) {
      dispatch(
        forgotPassword({
          role: isPainter ? "ARTIST" : "USER",
          email_or_mobile_number: email,
        })
      );
    } else {
      Alert.alert('Must enter a valid email or mobile number');
    }
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
        <Text style={styles.headingTitle}>Forgot Password</Text>
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
        <View
          style={{
            height: 45,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingHorizontal: 10,
          }}
        >
          <ToggleSwitch
            isOn={isPainter}
            onColor={Colors.black}
            offColor="#C8C8C8"
            label="Are you Artist?"
            labelStyle={{
              color: `${Colors.black}`,
              fontSize: 18,
            }}
            size="medium"
            onToggle={(isOn) => setisPainter(isOn)}
          />
        </View>
        <TextInput
          style={[
            styles.input
          ]}
          onChangeText={setemail}
          value={email}
          placeholder="Email or Phone Number"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title={'SEND'} onPress={handleChange} />
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
  input: {
    height: 50,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: Colors.white,
    elevation: 5,
    fontFamily: FontStyles.manRopeRegular,
    borderWidth: 1,
    borderColor: Colors.black,
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

  }
});
