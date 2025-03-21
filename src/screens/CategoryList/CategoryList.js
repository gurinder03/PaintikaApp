import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import Search from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import BackIcon from "react-native-vector-icons/Ionicons";
import RenderItem from "./RenderItem";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fetchRequest } from "../../Services/APICaller";
import FontStyles from "../../constants/FontStyles";
import Icon from "react-native-vector-icons/AntDesign";
import AlphabetFilter from "../../components/AlphabetsFilter";
import MultiSelectList from "../../components/MultiSelectList";
import PriceRangeSlider from "../../components/RangeSlider";

export default function CategoryList({ navigation, route }) {
  const { item } = route.params || {};
  const userSavedData = useSelector((state) => state.saveDataReducer.userData);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [hasLoadMore, setHasLoadMore] = useState(false)
  const [searchText, setSearchText] = useState("");
  const [statesArray, setStatesArray] = useState(undefined)
  const [filteredData, setFilteredData] = useState([]);

  const data = [
    {
      heading: 'Framing Quality',
      options: ['wood', 'plastic', 'metal'],
    },
    {
      heading: 'Medium',
      options: ['water colour', 'acrylic', 'oil'],
    },
    // {
    //   heading: 'Category',
    //   options: ['New Painting', 'Painting', 'Graffiti', 'Photography', 'Sculpture']
    // }
  ];
  const [selectedAlphabet, setSelectedAlphabet] = useState('ALL');
  // multi select
  const [selectedItems, setSelectedItems] = useState([]);

  // price range slider
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [loading, setLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  //use effect
  useEffect(() => {
    if (item !== null) {
      debouncedGetPainting('1', '10')
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

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  const debouncedGetPainting = debounce(getPainting, 500); // Adjust the delay as needed

  const handleAlphabetSelect = (alphabet) => {
    setSelectedAlphabet(alphabet);
  };

  const handleSelectionChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  async function getPainting(pageNo, limitCount) {
    var payload = JSON.stringify({
      page: Number(pageNo),
      limit: limitCount,
      city: '',
      filter: '',
      category: [item?._id],
      price: {},
      frame_quality: selectedItems["Framing Quality"],
      artists_dictionary: selectedAlphabet == 'ALL' ? '' : selectedAlphabet,
      medium: selectedItems["Medium"]
    })
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      body: payload,
      headers: myHeaders,
      redirect: 'follow',
    };
    const apiResponse = await fetchRequest("/home/list", requestOptions)
    const { statusCode, data, total } = apiResponse
    if (statusCode == 200) {
      if (pageNo == '1') {
        setFilteredData(data)
      } else {
        setFilteredData([...filteredData, ...data])
      }
      const hasNextPage = total > pageNo * limit;
      setHasLoadMore(hasNextPage);
      setPage(pageNo => (hasNextPage ? pageNo + 1 : pageNo));
    }
  }

  const onChangeSearchText = (text) => {
    setSearchText(text);
  };


  const HeaderComponent = useMemo(() => (
    <>
      <View style={{ marginTop: hp(1) }}>
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
      <View style={{ flex: 1, }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginVertical: 5,
          paddingHorizontal: 10,
          fontFamily: FontStyles.manRopeMedium,
        }}>Artists Directory</Text>
        <AlphabetFilter onSelect={handleAlphabetSelect} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 5,
          paddingHorizontal: 10,
          fontFamily: FontStyles.manRopeMedium,
        }}> Price </Text>
        <View style={{ width: '90%', justifyContent: 'space-between', alignSelf: 'center', flexDirection: 'row' }}>
          <Text style={styles.priceText}>Min Price: ₹{minPrice}</Text>
          <Text style={styles.priceText}>Max Price: ₹{maxPrice}</Text>
        </View>
        <PriceRangeSlider onValuesChange={handlePriceChange} />
        <TouchableOpacity style={{
          width: 60, height: 30, marginTop: hp(2),
          backgroundColor: '#2F3D8F', justifyContent: 'center',
          borderRadius: 5, marginHorizontal: 10, alignItems: 'center'
        }} onPress={() => debouncedGetPainting(1, limit)}>
          <Text style={{
            color: 'white',
            paddingHorizontal: 10,
            fontFamily: FontStyles.manRopeMedium,
          }}>Go</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, paddingTop: 15 }}>
        <MultiSelectList data={data} onSelectionChange={handleSelectionChange} />
      </View>
    </>
  ), [selectedAlphabet, minPrice, maxPrice, handlePriceChange, handleAlphabetSelect, searchText, onChangeSearchText, statesArray, handleSelectionChange]);


  return (
    <View style={styles.container}>
      <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => navigation.goBack()}>
          <BackIcon name={"chevron-back"} size={30} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ marginRight: 15 }} onPress={() => setIsFilter(prev => !prev)}>
          <BackIcon name={"filter"} size={30} color={isFilter ? 'black' : 'lightgrey'} />
        </TouchableOpacity> */}
      </View>
      <FlatList
        style={{ flexGrow: 1 }}
        ListHeaderComponent={isFilter && HeaderComponent}
        data={filteredData}
        renderItem={({ item }) => {
          return <RenderItem data={item} nav={navigation}
            userType={userSavedData?.role} />;
        }}
        keyExtractor={(item, index) => {
          return 'key-' + index.toString()
        }}
        onEndReachedThreshold={0.2}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd > 0 && hasLoadMore && !loading) {
            setLoading(true); // Set loading flag to prevent concurrent API calls
            debouncedGetPainting(page, limit)
              ?.finally(() => setLoading(false)); // Reset loading flag after API call
          }
        }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
            <Text style={{ color: '#000000', fontWeight: '600', fontSize: 17 }}>Records Not Found!</Text>
            <LottieView source={require("../../../assets/animations/notfound.json")} autoPlay />
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
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
    borderRadius: 5
  },

  searchIcon: {
    position: 'absolute',
    right: wp(5),
    top: hp(2)
  },

  priceText: {
    fontFamily: FontStyles.manRopeMedium,
    fontSize: 16
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: "space-between",
  },
  largeBlock: {
    backgroundColor: "#333",
    borderRadius: 10,
    width: "65%", // Large block
    padding: 15,
    marginBottom: 15,
    justifyContent: "center",
  },
  smallBlock: {
    backgroundColor: "#333",
    borderRadius: 10,
    width: "30%", // Small block
    padding: 15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthBlock: {
    backgroundColor: "#333",
    borderRadius: 10,
    width: "100%", // Full-width block
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  largeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5C00", // Orange text
    textAlign: "center",
  },
  smallText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
})