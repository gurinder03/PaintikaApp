import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions";
import Slide from "./Slide";


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const savedList = useSelector((state) => state.saveDataReducer.savedCategories);
  const [filteredData, setFilteredData] = useState(savedList.data);

  useEffect(() => {
    setFilteredData(savedList.data)
  }, [savedList]);

  const onChangeSearchText = (text) => {
    setSearchText(text);
    const filtered = savedList.data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };


  useEffect(() => {
    dispatch(getCategories({ page: 1, limit: 10 }));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <View style={styles.homeMain}>
              <TouchableOpacity style={styles.joinMain} onPress={() => { navigation.navigate("SignUp"); }}>
                <Text style={styles.joinText}> Join as a Artist</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainContainer}>
            {filteredData && filteredData.length ? (
              <FlatList
                data={filteredData ? filteredData : []}
                style={{ flex: 1 }}
                renderItem={({ item }) => {
                  return <Slide data={item} nav={navigation} />;
                }}
              />
            ) : (
              <View>
                <Text style={styles.noRocord}>No Records Found!</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
          <View style={{marginTop:10, position:'absolute', bottom:0, left:0, right:0, zIndex:9999, marginBottom:15}}>
            <View style={[styles.filterSearch, { backgroundColor: '#FFFFFF' }]}>
              <TextInput style={styles.inputSearch} onChangeText={onChangeSearchText} value={searchText} placeholder="Search" />
            </View>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  homeMain: {
    backgroundColor: "#ffffff",
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  joinMain: {
    backgroundColor: "#000000",
    padding: 13,
    paddingHorizontal: 35,
    borderRadius: 10
  },
  joinText: {
    color: '#FFFFFF',
    fontSize: 15
  },
  filterSearch: {
    marginHorizontal: 25,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15
  },
  inputSearch: {
    paddingHorizontal: 15
  },
  mainContainer: {
    marginTop: 25
  },
  noRocord: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center'
  }
})
