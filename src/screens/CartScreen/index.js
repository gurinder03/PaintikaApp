import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import FontStyles from '../../constants/FontStyles';
import Colors from '../../constants/Colors';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
export default function CartScreen() {
  const CartData = [
    {
      image: require('../../../assets/wall.webp'),
      name: 'demo',
      description: 'size M',
      price: '$6 ',
    },
    {
      image: require('../../../assets/wall.webp'),
      name: 'demo',
      description: 'size M',
      price: '$6 ',
    },
    {
      image: require('../../../assets/wall.webp'),
      name: 'demo',
      description: 'size M',
      price: '$6 ',
    },
    {
      image: require('../../../assets/wall.webp'),
      name: 'demo',
      description: 'size M',
      price: '$6 ',
    },
    {
      image: require('../../../assets/wall.webp'),
      name: 'demo',
      description: 'size M',
      price: '$6 ',
    },
    {
      image: require('../../../assets/wall.webp'),
      name: 'demo',
      description: 'size M',
      price: '$6 ',
    },
  ];

  const RenderItem = ({item}) => {
    console.log('Working >>>>>>>>>>>>>>', item);
    return (
      <>
        <View style={styles.productContainer}>
          <View
            style={{
              width: '40%',
              height: '100%',
              padding: 5,
            }}>
            <Image
              source={item.image}
              style={{width: '100%', height: '100%', borderRadius: 20}}
            />
          </View>
          <View
            style={{
              width: '60%',
              height: '100%',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              borderLeftWidth: 1,
              borderLeftColor: Colors.black,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontStyles.manRopeRegular,
                  color: Colors.black,
                  marginLeft: 9,
                }}>
                Lorem Ipsum
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontStyles.manRopeRegular,
                  color: Colors.black,
                  marginLeft: 9,
                }}>
                this is the description
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: hp(5),
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontStyles.manRopeRegular,
                  color: Colors.black,
                  marginLeft: 9,
                }}>
                {item.price}
              </Text>
              <View
                style={{
                  width: wp(35),
                  height: hp(5),
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: Colors.black,
                }}>
                <TouchableOpacity
                  style={{
                    width: '30%',
                    height: hp(5),
                    borderRightWidth: 1,
                    borderRightColor: Colors.black,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>
                    <AddIcon name="remove" size={25} />
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: '40%',
                    height: hp(5),
                  }}></View>
                <TouchableOpacity
                  style={{
                    width: '30%',
                    height: hp(5),
                    borderLeftWidth: 1,
                    borderRightColor: Colors.black,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>
                    <AddIcon size={25} name="add" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.Sec1}>
        <FlatList
          data={CartData}
          renderItem={({item}) => <RenderItem item={item} />}
        />
      </View>
      <View style={styles.Sec2}>
        <View
          style={{
            height: hp(10),
            backgroundColor: Colors.black,
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.white}}>CONTINUE</Text>
        </View>
        <View
          style={{
            height: hp(9.5),
            width: '50%',
            borderTopWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 12, color: Colors.black}}>TOTAL $45</Text>
          <Text style={{fontSize: 12, color: Colors.black}}>INCLUDING GST</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Sec1: {
    height: hp(87),
    width: wp(100),
    padding: wp(2),
    paddingTop: hp(4),
  },
  Sec2: {
    height: hp(13),
    width: wp(100),
    flexDirection: 'row',
  },
  productContainer: {
    height: hp(20),
    width: wp(96),
    marginTop: hp(1),
    flexDirection: 'row',
    borderWidth: hp(0.2),
    borderColor: Colors.black,
  },
});
