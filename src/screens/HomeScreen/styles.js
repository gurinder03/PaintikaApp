import { Dimensions, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontStyles from "../../constants/FontStyles";
import Colors from "../../constants/Colors";
const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(100),
    backgroundColor: Colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    height: hp(93),
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    height: hp(7),
    width: wp(100),
    justifyContent: "center",
  },
  filterList: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  filterSearch: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(4),
    position: "absolute",
    top: hp(85),
    zIndex: 999,
    left: wp(12),
    borderWidth: 1,
    borderRadius: 2,
  },
  filterItem: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp(3),
    width: wp(20),
    height: hp(4),
    marginTop: hp(1),
    borderRadius: wp(4),
  },
  filterTitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: FontStyles.manRopeRegular,
  },
  cardContainer: {
    width: wp(48),
    height: hp(38),
    backgroundColor: "#C7C7C7",
    borderRadius: wp(5),
    marginTop: 3,
    marginLeft: 3,
  },
  imageContainer: {
    width: wp(48),
    height: hp(27),
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: wp(5),
  },
  ratingSection: {},
  paintingName: {
    fontSize: 18,
    fontFamily: FontStyles.manRopeRegular,
    color: Colors.black,
    fontWeight: "600",
    marginLeft: wp(4),
  },
  userName: {
    fontSize: 20,
    fontFamily: FontStyles.manRopeRegular,
    color: Colors.black,
    fontWeight: "800",
    marginLeft: wp(4),
  },
  priceText: {
    fontSize: 20,
    fontFamily: FontStyles.manRopeRegular,
    color: Colors.black,
    fontWeight: "600",
    marginLeft: wp(4),
  },
  container1: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    width: wp(80),
    height: hp(5),
    padding: 4,
    paddingLeft: 15,
  },
});

export default styles;
