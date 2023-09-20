import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyles from '../../../constants/FontStyles';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    width: wp(100),
    height: hp(50),
    padding: wp(5),
  },
  headline: {
    fontSize: 22,
    fontFamily: FontStyles.manRopeSemiBold,
    color: Colors.black,
  },
  uploadBtn1: {
    width: wp(90),
    height: hp(5),
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
    marginTop: hp(5),
  },
  uploadBtn2: {
    width: wp(90),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
    marginTop: hp(5),
    borderColor: Colors.black,
    borderWidth: 2,
  },
  uploadBtnText1: {
    fontSize: 18,
    color: Colors.white,
  },
  uploadBtnText2: {
    fontSize: 18,
    color: Colors.black,
  },
  btnContainer: {
    height: hp(30),
    justifyContent: 'space-around',
  },
});

export default styles;
