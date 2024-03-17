import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions";

import CheckBox from "@react-native-community/checkbox";
import Toast from "react-native-toast-message";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const whiteBackground = {
  backgroundColor: "#FFFFFF",
  color: "#676767",
  height: 40,
  width: "100%",
  borderRadius: 8,
};

const filterDrodwn = {
  fontSize: 14,
  textAlign: "left",
};

export default function FilePreview({ navigation, route }) {
  const dispatch = useDispatch();
  const sizes = [{ 'name': "10 Inch", 'id': "1" }, { 'name': "20 Inch", 'id': "2" }, { 'name': "30 Inch", 'id': "3" }];
  const colors = [{ 'name': "Red" }, { 'name': "Yellow" }, { 'name': "Green" }, { 'name': "Black" }, { 'name': "Orange" }, { 'name': "Pink" }, { 'name': "Brown" }, { 'name': "Blue" }, { 'name': "Purple" }, { 'name': "Silver" }, { 'name': "Golden" }];
  const frameQuality = [{ 'name': "Wood" }, { 'name': "Metal" }, { 'name': "Plastic" }];
  const medium = [{ 'name': "Oil" }, { 'name': "Acrylic" }, { 'name': "Water Color" }, { 'name': "Sketch" }, { 'name': "Others" }];
  const [data, setData] = useState({
    name: "paint",
    size: "",
    theme: "",
    medium: "",
    quality: "",
    price: "",
    category: "",
    is_copy: false,
    desc: "",
    colors: ""
  });
  const [descriptionData, setDescriptionData] = useState("");
  const savedList = useSelector((state) => state.saveDataReducer.allCategories);
  const [category, setCategory] = useState([]);
  const [role, setrole] = useState("");
  const userSavedData = useSelector((state) => state.saveDataReducer.userData);

  const [userId, setuserId] = useState("");
  const [authToken, setauthToken] = useState("");
  const { path } = route?.params;

  useEffect(() => {
    getRole();
    getData();
    getAuthToken();
  }, []);

  useEffect(() => {
    setCategory(savedList.data);
  }, [savedList]);

  function areAllValuesFilled(object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (key === 'is_copy' && object[key] !== true) {
          return false;
        }
        if (object[key] === "" || object[key] === null || object[key] === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  const handleChange = (name, e) => {
    if (name == "name") {
      setData({ ...data, name: e });
    } else if (name == "size") {
      setData({ ...data, size: e });
    } else if (name == "theme") {
      setData({ ...data, theme: e });
    } else if (name == "medium") {
      setData({ ...data, medium: e });
    } else if (name == "quality") {
      setData({ ...data, quality: e });
    } else if (name == "price") {
      setData({ ...data, price: e });
    } else if (name == "category") {
      setData({ ...data, category: e });
    } else if (name == "checkbox") {
      setData({ ...data, is_copy: !data?.is_copy });
    } else if (name == "desc") {
      setData({ ...data, desc: e });
    } else if (name == "colors") {
      setData({ ...data, colors: e });
    }

  };

  const handleUpload = async () => {
    if (userSavedData && userSavedData.role == "ARTIST") {
      const allValuesFilled = areAllValuesFilled(data);
      if (allValuesFilled) {
        let postData = {}
        postData.name = data.name,
          postData.size = data.size.id,
          postData.theme = data.theme,
          postData.medium = data.medium.name,
          postData.frame_quality = data.quality.name,
          postData.price = data.price,
          postData.userId = userId,
          postData.status = 'active',
          postData.category = data.category,
          postData.is_copy_sale = data.is_copy,
          postData.description = data.desc,
          postData.color = data.colors.name,
          postData.token = authToken;
        postData.imagePath = path[0];
        postData.role = "ARTIST";
        dispatch({ type: "ADD_PREORDER", payload: postData });
      } else {
        Toast.show({
          type: "error",
          text1: `Painting details fields cannot be empty ❌`,
          topOffset: 60,
        });
        return; // Exit function or handle error as needed
      }

    } else {
      if (!descriptionData?.trim()) {
        Toast.show({
          type: "error",
          text1: `Description cannot be empty ❌`,
          topOffset: 60,
        });
        return; // Exit function or handle error as needed
      }
      let dataPre = {
        description: descriptionData,
        imagePath: path[0],
        role: "USER",
        token: authToken,
        userId: userId,
      };
      dispatch({ type: "ADD_PREORDER", payload: dataPre });
    }
  };

  const getAuthToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authToken");
      dispatch(
        getAllCategories({ page: 1, limit: 100, token: JSON.parse(jsonValue) })
      );
      if (jsonValue !== null) {
        setauthToken(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log("Error While getting Token", e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        setuserId(JSON.parse(value));
      }
    } catch (e) { }
  };

  const getRole = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("role");
      if (jsonValue !== null) {
        setrole(jsonValue);
      }
    } catch (e) {
      // read error
    }
  };

  const _renderIconButton = () => {
    return (
      <TouchableOpacity activeOpacity={0.5}>
        <Icon name="caretdown" color="#181C2E" size={12} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: path && path[0].uri }}
            resizeMode="contain"
            style={styles.imgMain} />
        </View>
        <View style={styles.inputSection}>
          {userSavedData && userSavedData.role == "ARTIST" ? (
            <View>
              {/* <View>
                <TextInput
                  onChange={(e) => handleChange("name", e.nativeEvent.text)}
                  placeholder="Name"
                  style={styles.inputArea}
                />
              </View> */}
              <View style={{ marginTop: 15 }}>
                <TextInput
                  onChange={(e) => handleChange("price", e.nativeEvent.text)}
                  placeholder="Price"
                  style={styles.inputArea}
                />
              </View>

              <View style={{ marginTop: 15 }}>
                <TextInput
                  onChange={(e) => handleChange("theme", e.nativeEvent.text)}
                  placeholder="Painting Theme"
                  style={styles.inputArea}
                />
              </View>

              <View style={styles.selected}>
                <SelectDropdown
                  data={sizes}
                  onSelect={(selectedItem, index) =>
                    handleChange("size", selectedItem)
                  }
                  defaultButtonText={"Select Size"}
                  buttonStyle={whiteBackground}
                  renderDropdownIcon={_renderIconButton}
                  dropdownIconPosition="right"
                  // @ts-expect-error
                  buttonTextStyle={filterDrodwn}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                />
              </View>

              <View style={styles.selected}>
                <SelectDropdown
                  data={medium}
                  onSelect={(selectedItem, index) =>
                    handleChange("medium", selectedItem)
                  }
                  defaultButtonText={"Select Medium"}
                  buttonStyle={whiteBackground}
                  renderDropdownIcon={_renderIconButton}
                  dropdownIconPosition="right"
                  // @ts-expect-error
                  buttonTextStyle={filterDrodwn}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                />
              </View>

              <View style={styles.selected}>
                <SelectDropdown
                  data={frameQuality}
                  onSelect={(selectedItem, index) =>
                    handleChange("quality", selectedItem)
                  }
                  defaultButtonText={"Select Frame Quality"}
                  buttonStyle={whiteBackground}
                  renderDropdownIcon={_renderIconButton}
                  dropdownIconPosition="right"
                  // @ts-expect-error
                  buttonTextStyle={filterDrodwn}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                />
              </View>
              <View style={styles.selected}>
                <SelectDropdown
                  data={category}
                  onSelect={(selectedItem, index) =>
                    handleChange("category", selectedItem)
                  }
                  buttonStyle={whiteBackground}
                  renderDropdownIcon={_renderIconButton}
                  dropdownIconPosition="right"
                  buttonTextStyle={filterDrodwn}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                  defaultButtonText={"Select Category"}
                />
              </View>
              <View style={styles.selected}>
                <SelectDropdown
                  data={colors}
                  onSelect={(selectedItems, selectedIndex) =>
                    handleChange("colors", selectedItems)
                  }
                  defaultButtonText={"Select Colors"}
                  buttonStyle={whiteBackground}
                  renderDropdownIcon={_renderIconButton}
                  dropdownIconPosition="right"
                  multiple={true} // Enable multiple selection
                  buttonTextStyle={filterDrodwn}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                />
              </View>
              <View style={[styles.selected, { borderWidth: 0 }]}>
                <TextInput
                  style={[styles.disText]}
                  onChange={(e) => handleChange("desc", e.nativeEvent.text)}
                  numberOfLines={5}
                  textAlignVertical="top"
                  multiline
                  placeholder="Painting Description"
                />
              </View>
              <View style={{
                flexDirection: 'row', padding: 5, alignItems: 'center', width: '100%',
                margin: 5, justifyContent: 'space-between', marginTop: 15
              }}>
                <CheckBox
                  tintColors={{
                    // true: Color.THEME_MAIN,
                    // false: Color.THEME_BORDER,
                  }}
                  style={{
                    width: widthPercentageToDP(3),
                    height: heightPercentageToDP(2),
                  }}
                  disabled={false}
                  boxType={'square'}
                  value={data?.is_copy}
                  onValueChange={newValue =>
                    handleChange("checkbox")
                  }
                />
                <Text numberOfLines={2} onPress={() => handleChange("checkbox")}>{"I am uploading a copy of the origional painting."}</Text>

              </View>
            </View>
          ) : (
            <View>
              <View>
                <Text style={styles.dis}>Description</Text>
                <TextInput
                  style={styles.disText}
                  onChange={(e) => {
                    setDescriptionData(e.nativeEvent.text);
                  }}
                  numberOfLines={5}
                  textAlignVertical="top"
                  multiline
                  placeholder="Enter Description"
                />
              </View>
            </View>
          )}
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.buttonText}
              onPress={() => handleUpload()}
            >
              <Text style={{ color: "#FFFFFF" }}> UPLOAD </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  imgMain: {
    resizeMode: 'cover',
    width: "94%",
    height: 350,
    borderRadius: 10,
  },
  inputSection: {
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 15,
  },
  inputArea: {
    borderWidth: 1,
    paddingLeft: 15,
    height: 45,
    borderRadius: 10,
  },
  selected: {
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 10,
  },
  valueSelect: {},
  dis: {
    fontSize: 17,
    color: "#000",
  },
  disText: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    paddingTop: 15,
    paddingLeft: 15,
  },
  btn: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonText: {
    backgroundColor: "#000",
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
