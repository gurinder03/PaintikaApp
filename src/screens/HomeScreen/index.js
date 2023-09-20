import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import styles from './styles';
import Header from '../../components/HeaderScreen';
import {useDispatch, useSelector} from 'react-redux';
import {getCategories} from '../../redux/actions';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontStyles from '../../constants/FontStyles';
import Colors from '../../constants/Colors';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const savedList = useSelector(state => state.saveDataReducer.savedCategories);
  console.log('🚀 ~ file: index.js:27 ~ HomeScreen ~ savedList:', savedList);
  const [number, onChangeNumber] = React.useState('');
  const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
  const data = ['ruby', 'Rococo', 'Erin', 'Shade'];
  const slideList = Array.from({length: 30}).map((_, i) => {
    return {
      id: i,
      image: `https://picsum.photos/1440/2842?random=${i}`,
      title: `This is the title! ${i + 1}`,
      subtitle: `This is the subtitle ${i + 1}!`,
    };
  });
  function Slide({data}) {
    console.log('DATA:::::::::::::', data);
    return (
      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <Image
          source={{uri: data.image}}
          style={{
            width: wp(100),
            height: hp(100),
          }}></Image>
        <Text
          style={{
            fontSize: 28,
            color: '#fff',
            position: 'absolute',
            top: '-75%',
            fontWeight: '900',
            left: 40,
          }}>
          {data.name.toUpperCase()}
        </Text>
        <Text style={{fontSize: 18}}>{data.subtitle}</Text>
      </View>
    );
  }
  useEffect(() => {
    dispatch(
      getCategories({
        page: 1,
        limit: 10,
      }),
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.filterContainer}>
        <View
          style={{
            width: wp(100),
            backgroundColor: '#ffffff',
            height: hp(6),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={{
              backgroundColor: Colors.black,
              justifyContent: 'center',
              alignItems: 'center',
              height: hp(5),
              width: wp(50),
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontStyle: FontStyles.manRopeSemiBold,
                color: Colors.white,
                fontSize: 18,
              }}>
              Join as a Painter
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterSearch}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Search"
          />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          data={savedList?.data}
          style={{flex: 1}}
          renderItem={({item}) => {
            return <Slide data={item} />;
          }}
        />
      </View>
    </View>
  );
}
