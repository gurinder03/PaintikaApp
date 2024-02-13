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
import AWSHelper from "../../Services/AWSHelper";

const whiteBackground = {
  backgroundColor: "#FFFFFF",
  color: "#676767",
  height: 40,
  width: "100%",
  borderRadius: 8,
};

const filterDrodwn = {
  color: "#676767",
  fontSize: 12,
  textAlign: "left",
};

export default function FilePreview({ navigation, route }) {
  const dispatch = useDispatch();
  const countries = ["Instagram Users", "TikTok Users"];
  const [data, setData] = useState({
    name: "",
    size: "",
    theme: "",
    medium: "",
    quality: "",
    price: "",
    category: "",
  });
  const [descriptionData, setDescriptionData] = useState("");
  const [imgUpload, setImgUpload] = useState("");

  const savedList = useSelector((state) => state.saveDataReducer.allCategories);
  const [category, setCategory] = useState([]);
  const [role, setrole] = useState("");
  const userSavedData = useSelector((state) => state.saveDataReducer.userData);

  const [userId, setuserId] = useState("");
  const [authToken, setauthToken] = useState("");
  const { path } = route?.params;

  const handleChange = (name, e) => {
    console.log("selectedItem =>", name, e);
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
    }
  };

  const handleUpload = async () => {
    console.log("ssssss", data);
    AWSHelper.uploadFile(path[0]).then((res) => {
        if (res && data) {
          if (userSavedData && userSavedData.role == "ARTIST") {
            data.token = authToken;
            data.imagePath = res.Location;
            data.role = "ARTIST";
            data.userId = userId;
            dispatch({ type: "ADD_PREORDER", payload: data });
            navigation.navigate("Home");
          } else {
            let dataPre = {
              description: descriptionData,
              imagePath: res.Location,
              role: "USER",
              token: authToken,
              userId: userId,
            };
            dispatch({ type: "ADD_PREORDER", payload: dataPre });
            navigation.navigate("Home");
          }
        } else {
        }
      }).catch((err) => {
        console.log("Error Check", err);
      });
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

  useEffect(() => {
    getRole();
    getData();
    getAuthToken();
  }, []);

  useEffect(() => {
    setCategory(savedList.data);
  }, [savedList]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      console.log("🚀 ~ file: index.js:189 ~ getData ~ value:", value);
      if (value !== null) {
        setuserId(JSON.parse(value));
      }
    } catch (e) {}
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
          <Image source={{ uri: path[0].uri }} style={styles.imgMain} />
        </View>
        <View style={styles.inputSection}>
          {userSavedData && userSavedData.role == "ARTIST" ? (
            <View>
              <View>
                <TextInput
                  onChange={(e) => handleChange("name", e.nativeEvent.text)}
                  placeholder="Name"
                  style={styles.inputArea}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <TextInput
                  onChange={(e) => handleChange("size", e.nativeEvent.text)}
                  placeholder="Size"
                  style={styles.inputArea}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <TextInput
                  onChange={(e) => handleChange("theme", e.nativeEvent.text)}
                  placeholder="Theme"
                  style={styles.inputArea}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <TextInput
                  onChange={(e) => handleChange("medium", e.nativeEvent.text)}
                  placeholder="Medium"
                  style={styles.inputArea}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <TextInput
                  onChange={(e) => handleChange("quality", e.nativeEvent.text)}
                  placeholder="Framing Quality"
                  style={styles.inputArea}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <TextInput
                  onChange={(e) => handleChange("price", e.nativeEvent.text)}
                  placeholder="Price"
                  style={styles.inputArea}
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
    marginTop: 15,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 15,
    marginBottom: 15,
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
    resizeMode: "contain",
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
    marginBottom: 15,
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
