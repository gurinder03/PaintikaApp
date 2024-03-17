import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedData } from "../../redux/actions";
import Search from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import BackIcon from "react-native-vector-icons/Ionicons";
import RenderItem from "./RenderItem";
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fetchRequest } from "../../Services/APICaller";
import { AutocompleteDropdown } from "../../components/react-native-autocomplete-dropdown/src";
import FontStyles from "../../constants/FontStyles";
import Icon from "react-native-vector-icons/AntDesign";


export default function CategoryList({ navigation, route }) {
  const { item } = route.params || {};
  const dispatch = useDispatch();
  const userSavedData = useSelector((state) => state.saveDataReducer.userData);

  const [searchText, setSearchText] = useState("");
  let stateRef = useRef(undefined)

  const [selectedState, setSelectedState] = useState(undefined)
  const [statesArray, setStatesArray] = useState(undefined)
  const savedList = useSelector((state) => state.saveDataReducer.relatedData);
  const [filteredData, setFilteredData] = useState(savedList.data);

  useEffect(() => {
    if (item !== null) {
      dispatch(
        getRelatedData({
          page: 1,
          limit: 100,
          city: '',
          filter: '',
          category: [item?._id],
        })
      );
    }
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
    setFilteredData(savedList.data)
  }, [savedList]);

  const onChangeSearchText = (text) => {
    setSearchText(text);
    // const filtered = savedList.data.filter(item =>
    //   item?.name?.toLowerCase().includes(text?.toLowerCase())
    // );
    // setFilteredData(filtered);
  };



  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity style={{ marginHorizontal: 13 }} onPress={() => navigation.goBack()}>
            <BackIcon name={"chevron-back"} size={30} />
          </TouchableOpacity>
        </View>
        <View style={ Platform.select({ ios: { zIndex: 1 } })}>
          <AutocompleteDropdown
            controller={c => (stateRef.current = c)}
            textInputProps={{
              placeholder: 'Select state',
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
        <View style={{ marginTop:hp(2) }}>
          <TextInput
            style={styles.input}
            placeholder="Search Data"
            onChangeText={onChangeSearchText}
            value={searchText}
          />

          <View style={styles.searchIcon}>
            <Search name="search" size={25} color={Colors.black} />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            data={filteredData && filteredData.length ? savedList.data : []}
            renderItem={({ item }) => {
              return <RenderItem data={item} nav={navigation}
              userType={userSavedData?.role} />;
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

  input: {
    height: 50,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 5,
    fontFamily: FontStyles.manRopeRegular,
    backgroundColor: Colors.white,
    elevation: 5,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius:5
  },
  
  searchIcon: {
    position: 'absolute',
    right: wp(5),
    top: hp(2)
  },
  mainContainer: {
    marginTop: 15,
    marginBottom: "100%"
  },
})