import {
  View,
  Text,
  Image,
  Animated,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import React, { useRef, useState } from "react";
import CustomButton from "../../helpers/CustomButton";
import ToggleSwitch from "toggle-switch-react-native";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import BackIcon from "react-native-vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import FontStyles from "../../constants/FontStyles";
import { getStateData, signUp } from "../../redux/actions";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/AntDesign";
import { AutocompleteDropdown } from '../../components/react-native-autocomplete-dropdown'
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRequest } from "../../Services/APICaller";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    name: "",
    password: "",
    email: ""
  });
  let stateRef = useRef(undefined)
  let cityRef = useRef(undefined)

  const [isPainter, setisPainter] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const isLoading = false;
  const [selectedState, setSelectedState] = useState(undefined)
  const [selectedCity, setSelectedCity] = useState(undefined)
  const [statesArray, setStatesArray] = useState(undefined)
  const [cityArray, setCityArray] = useState(undefined)
  useEffect(() => {
    async function getState() {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      try {
        const apiResponse = await fetchRequest(
          "/setting/states",
          requestOptions,
        )
        setStatesArray(apiResponse?.data?.map((item, index) => {
          let item1 = {
            title: item,
            id: index
          }
          return item1
        }))

      } catch (e) {
        console.log("Error in getting CART List", e);
      }
    }
    getState()

  }, []);

  useEffect(() => {
    if (selectedState) {
      getCities()
    }
  }, [selectedState]);

  const getCities = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "state": selectedState?.title
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const apiResponse = await fetchRequest(
      "/setting/cities",
      requestOptions,
    )
    setCityArray(apiResponse?.data?.map((item, index) => {
      let item1 = {
        title: item,
        id: index
      }
      return item1
    }))
  }

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let matchingResult = text.slice(0, 1);
    if (
      (matchingResult == "2" || matchingResult == "3" || matchingResult == "4",
        matchingResult == "5" ||
        matchingResult == "6" ||
        matchingResult == "7" ||
        matchingResult == "8" ||
        matchingResult == "9" ||
        matchingResult == "0" ||
        matchingResult == "1")
    ) {
      handleChange("email", text);
      seterrorMessage("");
    } else {
      if (reg.test(text) === false) {
        // console.log("WORKING FAILED");
        handleChange("email", text);
        seterrorMessage("Not a valid email address. Should be your@email.com");
        return false;
      } else {
        // console.log("WORKING PASSED");
        handleChange("email", text);
        seterrorMessage("");
      }
    }
  };

  const saveData = () => {
    if (inputValue.name == "") {
      Alert.alert("Name is required.");
    } else if (inputValue.email == "") {
      Alert.alert("Email is required.");
    } else if (inputValue.password == "") {
      Alert.alert("Password is required.");
    } else if (isPainter && !selectedState) {
      Alert.alert("State is required.");
    } else if (isPainter && !selectedCity) {
      Alert.alert("City is required.");
    }
    else {
      if (!isPainter) {
        dispatch(
          signUp({
            name: inputValue.name,
            email: inputValue.email,
            password: inputValue.password,
            role: "USER",
          })
        );
      }
      else {
        dispatch(signUp({
          city: selectedCity.title,
          name: inputValue.name,
          email_or_mobile_number: inputValue.email,
          password: inputValue.password,
          role: "ARTIST",
          state: selectedState.title,
          userType: true
        }))
      }
    }
  };

  const handleChange = (name, e) => {
    if (name == "name") {
      setInputValue({ ...inputValue, name: e });
    } else if (name == "email") {
      setInputValue({ ...inputValue, email: e });
    } else {
      setInputValue({ ...inputValue, password: e });
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <ScrollView
          scrollEnabled={true}
          //keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heading}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            >
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
                  //  fontStyle: FontStyles.manRopeMedium,
                }}
                size="medium"
                onToggle={(isOn) => setisPainter(isOn)}
              />
            </View>

            <TextInput
              style={styles.input}
              onChangeText={(e) => handleChange("name", e)}
              value={inputValue.name}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={(e) => validateEmail(e)}
              value={inputValue.email}
              placeholder="Email or Phone Number"
            />
            <Text style={styles.errorTitle}>{errorMessage}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => handleChange("password", e)}
              value={inputValue.password}
              placeholder="Password"
              secureTextEntry
            />
            {
              isPainter && (
                <>
                  <View style={[styles.selected, Platform.select({ ios: { zIndex: 1 } })]}>
                    <AutocompleteDropdown
                      controller={c => (stateRef.current = c)}
                      textInputProps={{
                        placeholder: 'Select or enter your state',
                        // placeholderTextColor: Color.THEME_SKILL_TEXT,
                        style: {
                          fontSize: 15,
                          fontFamily: FontStyles.manRopeMedium,
                          // color: Color.THEME_MAIN,
                        },
                      }}
                      RightIconComponent={
                        <TouchableOpacity activeOpacity={0.5}>
                          <Icon name="caretdown" color="#181C2E" size={12} />
                        </TouchableOpacity>
                      }
                      flatListProps={{
                        style: { height: 250, width: '100%' }
                      }}
                      showClear={false}
                      showChevron={false}
                      inputContainerStyle={styles.input}
                      iconPressAction={() => { }}
                      clearOnFocus={false}
                      closeOnBlur={false}
                      closeOnSubmit={false}
                      onSelectItem={setSelectedState}
                      dataSet={statesArray}
                    />
                  </View>
                  <View style={[styles.selected, Platform.select({ ios: { zIndex: 2 } })]}>
                    <AutocompleteDropdown
                      controller={c => (cityRef.current = c)}
                      textInputProps={{
                        placeholder: 'Select or enter your city',
                        // placeholderTextColor: Color.THEME_SKILL_TEXT,
                        style: {
                          fontSize: 15,
                          fontFamily: FontStyles.manRopeMedium,
                          // color: Color.THEME_MAIN,
                        },
                      }}
                      containerStyle={{ width: '100%' }}
                      RightIconComponent={
                        <TouchableOpacity activeOpacity={0.5}>
                          <Icon name="caretdown" color="#181C2E" size={12} />
                        </TouchableOpacity>
                      }
                      showClear={false}
                      showChevron={false}
                      inputContainerStyle={styles.input}
                      iconPressAction={() => { }}
                      clearOnFocus={false}
                      closeOnBlur={false}
                      closeOnSubmit={false}
                      onSelectItem={setSelectedCity}
                      dataSet={cityArray}
                      flatListProps={{
                        style: { height: 250, width: '90%' }
                      }}
                    />
                  </View>
                </>
              )
            }

            <View style={styles.buttonContainer}>
              <ActivityIndicator
                size={"large"}
                animating={isLoading}
                color={Colors.black}
              />
              <CustomButton title={"SIGN UP"} onPress={saveData} />
            </View>
          </View>
        </ScrollView>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
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
    height: "20%",
    width: "100%",
    padding: 5,
  },
  headingTitle: {
    fontSize: 30,
    fontFamily: FontStyles.manRopeSemiBold,
    color: Colors.black,
    marginTop: 9,
  },
  inputContainer: {
    justifyContent: "center",
  },
  buttonContainer: {
    height: "20%",
  },
  socialLogin: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 65,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    fontFamily: FontStyles.manRopeRegular,
    backgroundColor: Colors.white,
    elevation: 5,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  errorTitle: {
    fontSize: 14,
    color: Colors.alertRed,
    textAlign: "center",
  },
  socialLinks: {
    height: "70%",
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
  },
});
