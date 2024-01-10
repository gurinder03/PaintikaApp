import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedData } from "../../redux/actions";
import Search from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import BackIcon from "react-native-vector-icons/Ionicons";
import RenderItem from "./RenderItem";

export default function CategoryList({ navigation, route }) {
  const { item } = route.params || {};
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedValue, setselectedValue] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mohali", value: "mohali" },
    { label: "Kharar", value: "kharar" },
    { label: "Patiala", value: "patiala" },
    { label: "Jalandhar", value: "jalandhar" },
  ]);
  const savedList = useSelector((state) => state.saveDataReducer.relatedData);
  const [filteredData, setFilteredData] = useState(savedList.data);


  const onChangeSearchText = (text) => {
    setSearchText(text);
    const filtered = savedList.data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const onSelected = (ev) => {
    setSelectedLanguage(ev)
  };

  useEffect(() => {
    if (item !== null) {
      dispatch(
        getRelatedData({
          page: 1,
          limit: 10,
          city:'',
          filter: '',
          category: [item?._id],
        })
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity style={{ marginHorizontal: 13 }} onPress={() => navigation.goBack()}>
            <BackIcon name={"chevron-back"} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.dropdownMain}>
          {Platform.OS == "ios" ? (
            <View>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                zIndex={1000}
              />
            </View>
          ) : (
            <View style={styles.dropdownInner}>
              <Picker selectedValue={selectedLanguage} onValueChange={(itemValue, itemIndex) => onSelected(itemValue)}>
                <Picker.Item label="Select City" value="null" />
                <Picker.Item label="Mohali" value="Mohali" />
                <Picker.Item label="Kharar" value="Kharar" />
                <Picker.Item label="Patiala" value="Patiala" />
                <Picker.Item label="Jalandhar" value="Jalandhar" />
              </Picker>
            </View>
          )}
        </View>
        <View style={[styles.searchMain, { marginTop: Platform.OS === "ios" ? hp(1) : "" }]}>
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Data"
              onChangeText={onChangeSearchText}
              value={searchText}
            />
          </View>
          <View style={styles.searchIcon}>
            <Search name="search" size={25} color={Colors.black} />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            data={filteredData && filteredData.length ? filteredData : []}
            renderItem={({ item }) => {
              return <RenderItem data={item} nav={navigation} />;
            }}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#000000', fontWeight: '600', fontSize: 17 }}>Records Not Found!</Text>
                <LottieView source={require("../../../assets/animations/notfound.json")} autoPlay />
              </View>
            }
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  dropdownMain: {
    marginHorizontal: 15,
    marginTop: 15
  },
  dropdownInner: {
    marginBottom: 20,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 8
  },
  searchMain: {
    marginHorizontal: 25
  },
  searchInput: {
    borderRadius: 8,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  mainContainer: {
    marginTop: 15,
    marginBottom:"100%"
  },
})