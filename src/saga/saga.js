import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import Toast from "react-native-toast-message";
import Colors from "../constants/Colors";
import * as NavigationService from "../navigation/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";

//fetching functions
const BASE_URL = `http://52.66.72.115:5004/api/v1`;
const GetRecord = (url, data) => {
  console.log(data, " >>>> data", url);
  return axios({
    method: "POST",
    crossDomain: true,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data,
    url: BASE_URL + url,
  });
};

const GetRecord1 = (url, data) => {
  console.log(data, " >>>> data", url);
  return axios({
    method: "GET",
    crossDomain: true,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    url: BASE_URL + url,
  });
};

//Saga functions

function* SignUp({ payload }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  const postData = {
    name: payload?.name,
    role: payload?.role,
    email_or_mobile_number: payload?.email,
    password: payload?.password,
  };
  const requestUrl = "/user/signup";

  try {
    const response = yield call(GetRecord, requestUrl, postData);
    console.log(
      "🚀 ~ file: saga.js:30 ~ function*SignUp ~ response:",
      response.data
    );

    if (response?.data !== null && response.data.statusCode == 200) {
      console.log("INSIDE IF");

      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        text2: "Please wait for OTP ✅",
        topOffset: 60,
        onHide: () => {
          Toast.show({
            type: "success",
            text1: `${response?.data?.data?.OTP}`,
            text2: `Enter otp to proceed Further 💬`,
            visibilityTime: 9000,
            topOffset: 60,
          });
        },
      });

      yield put({ type: "SAVE_OTP", payload: response?.data?.data?.OTP });
      yield put({ type: "SAVE_SIGNUPDATA", payload: payload?.email });

      yield NavigationService.navigate("Otp");
    } else {
      Toast.show({
        type: "error",
        text1: `${response?.data?.message}`,
        topOffset: 60,
        onHide: () => {
          Toast.show({
            type: "success",
            text1: `${response?.data?.data?.OTP}`,
            text2: `Enter otp to proceed Further 💬`,
            visibilityTime: 9000,
            topOffset: 60,
          });
        },
      });
    }
  } catch (e) {
    console.log("ERROR IN SIGNUP", e);
  } finally {
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}
function* login({ payload }) {
  console.log("WORKING SAGA LOGIN:::", payload);
  const postData = {
    role: payload?.role,
    email_or_mobile_number: payload?.email,
    password: payload?.password,
  };
  const requestUrl = "/user/login";

  try {
    const response = yield call(GetRecord, requestUrl, postData);
    console.log(
      "🚀 ~ file: saga.js:30 ~ function*SignUp ~ response:",
      response.data
    );

    if (response?.data !== null && response.data.statusCode == 200) {
      console.log("INSIDE IF");

      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        text2: "Welcome to Paintika",
        topOffset: 60,
      });

      yield put({ type: "SAVE_TOKEN", payload: response?.data?.data?.token });
      yield put({ type: "SAVE_USERID", payload: response?.data?.data?._id });
      let token = JSON.stringify(response?.data?.data?.token);
      // let userData = JSON.stringify(response?.data?.data?._id);
      // console.log(
      //   "🚀 ~ file: saga.js:126 ~ function*login ~ userData:",
      //   userData
      // );
      console.log("🚀 ~ file: saga.js:125 ~ function*login ~ token:", token);
      yield AsyncStorage.setItem("authToken", token);
      // yield AsyncStorage.setItem("userId", userData);
      yield NavigationService.navigate("Home");
    } else {
      Toast.show({
        type: "error",
        text1: `${response?.data?.message} ❌`,
        topOffset: 60,
      });
    }
  } catch (e) {
    console.log("ERROR IN LOGIN", e);
  }
}
function* verifyOtp({ payload }) {
  console.log("Working OTP ", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const postData = {
    role: payload.role,
    OTP: payload.otp,
    email_or_mobile_number: payload.email,
  };
  const requestUrl = "/user/verifyOTP";

  try {
    const response = yield call(GetRecord, requestUrl, postData);
    console.log(
      "🚀 ~ file: saga.js:108 ~ function*verifyOtp ~ response:",
      response.data
    );
    if (response?.data !== null && response?.data?.statusCode == 200) {
      yield put({ type: "SHOW_LOADING", payload: false });
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
      yield NavigationService.navigate("Home");
    } else {
      Toast.show({
        type: "error",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
      yield put({ type: "SHOW_LOADING", payload: false });
    }
  } catch (e) {
    console.log("Error in Verify OTP::::", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}
function* forgotPassword({ payload }) {
  console.log("Forgot password Working ", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const postData = {
    OTP: payload.OTP,
    role: payload.role,
    password: "1234567",
    email_or_mobile_number: payload.email_or_mobile_number,
  };
  const requestUrl = "/user/forgot/password";

  try {
    const response = yield call(GetRecord, requestUrl, postData);
    console.log(
      "🚀 ~ file: saga.js:155 ~ function*forgotPassword ~ response:",
      response.data
    );

    if (response?.data !== null && response?.data?.statusCode == 200) {
      yield put({ type: "SHOW_LOADING", payload: false });
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
      yield NavigationService.navigate("Otp");
    } else {
      Toast.show({
        type: "error",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
      yield put({ type: "SHOW_LOADING", payload: false });
    }
  } catch (e) {
    console.log("Error in forgot password", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}

function* getCategories({ payload }) {
  console.log("Working categories", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const postData = {
    page: payload?.page,
    limit: payload?.limit,
  };
  const requestUrl = "/home/category/list";

  try {
    console.log("BEFORE FETCHING", BASE_URL + requestUrl, postData);
    const response = yield call(GetRecord, requestUrl, postData);
    console.log(
      "🚀 ~ file: saga.js:216 ~ function*getCategories ~ response:",
      response.data
    );

    if (response?.data?.statusCode == 200 && response?.data !== null) {
      console.log("WORKING:::::::");
      yield put({ type: "SAVE_CATEGORIES", payload: response?.data });
    }
  } catch (e) {
    console.log("Error in get category OTP::::", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}

function* getRelatedData({ payload }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  const postData = {
    page: payload?.page,
    limit: payload?.limit,
    categories: payload?.category,
  };
  const requestUrl = "/home/list";

  try {
    console.log(
      "BEFORE FETCHING RELATED DATA",
      BASE_URL + requestUrl,
      postData
    );
    const response = yield call(GetRecord, requestUrl, postData);
    console.log(
      "🚀 ~ file: saga.js:243 ~ function*getRelatedData ~ response:",
      response.data
    );

    if (response?.data?.statusCode == 200 && response?.data !== null) {
      yield put({ type: "SAVE_RELATEDDATA", payload: response?.data });
    }
  } catch (e) {
    console.log("Error in get category OTP::::", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}

function* getDetails({ payload }) {
  console.log("GET DETAILS::::::::", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const requestUrl = `/home/view/${payload}`;
  console.log("BEFORE FETHING URL", requestUrl);
  try {
    const response = yield call(GetRecord1, requestUrl);
    console.log(
      "🚀 ~ file: saga.js:267 ~ function*getDetails ~ response:",
      response?.data
    );
    // if (response.statusCode == 200 && response.data !== null) {
    yield put({ type: "SAVE_DETAILS_DATA", payload: response?.data });
    // }
  } catch (e) {
    console.log("Error in getting Details", e);
  }
}

function* addProductToCart({ payload }) {
  console.log("ADD TO CART PAYLOAD::::", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const requestUrl = `/cart/add`;
  console.log("BEFORE FETHING URL CART", requestUrl);
  try {
    const response = yield call(GetRecord1, requestUrl);
    console.log(
      "🚀 ~ file: saga.js:299 ~ function*addProductToCart ~ response:",
      response
    );

    // if (response.statusCode == 200 && response.data !== null) {
    // yield put({ type: "SAVE_DETAILS_DATA", payload: response?.data });
    // }
  } catch (e) {
    console.log("Error in getting CART", e);
  }
}
function* mySaga() {
  yield takeLatest("SIGN_UP_REQUESTED", SignUp);
  yield takeLatest("LOGIN", login);
  yield takeLatest("VERIFY_OTP", verifyOtp);
  yield takeLatest("FORGOT_PASSWORD", forgotPassword);
  yield takeLatest("GET_CATEGORIES", getCategories);
  yield takeLatest("RELATED_DATA", getRelatedData);
  yield takeLatest("GET_DETAILS_DATA", getDetails);
  yield takeLatest("ADD_PRODUCT", addProductToCart);
}

export default mySaga;
