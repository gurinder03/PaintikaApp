import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import Toast from "react-native-toast-message";
import * as NavigationService from "../navigation/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

//fetching functions
const BASE_URL = `https://api.paintikaart.com/api/v1`;
const GetRecord = (url, data) => {
  // console.log(data, " >>>> data", BASE_URL + url);
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
  // console.log(data, " >>>> data", url);
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
  const requestUrl = "/user/signup";
  try {
    const response = yield call(GetRecord, requestUrl, payload);
    // console.log("🚀 ~ file: saga.js:30 ~ function*SignUp ~ response:", response.data);
    if (response?.data !== null && response.data.statusCode == 200) {
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
      yield NavigationService.navigate("Otp", { role: payload?.role });
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
  // console.log("WORKING SAGA LOGIN:::", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  let postData = {}
  if (payload.isSocial) {
    postData = {
      role: payload?.role,
      email_or_mobile_number: payload?.email_or_mobile_number,
      authToken: payload?.authToken,
      facebook_id: "",
      google_id: payload?.google_id,
      name: payload?.name,
      profile_image: payload?.profile_image,
    }
  } else {
    postData = {
      role: payload?.role,
      email_or_mobile_number: payload?.email,
      password: payload?.password,
    }
  }
  const requestUrl = payload.isSocial ? "/user/social/login" : "/user/login";
  try {
    const response = yield call(GetRecord, requestUrl, postData);
    // console.log("🚀 ~ file: saga.js:30 ~ function*SignUp ~ response:", response.data);
    if (response?.data !== null && response.data.statusCode == 200) {
      // console.log("INSIDE IF");
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        text2: "Welcome to Paintika",
        topOffset: 60,
      });
      yield put({ type: "SAVE_TOKEN", payload: response?.data?.data?.token });
      yield put({ type: "SAVE_USERID", payload: response?.data?.data?._id });
      yield put({ type: "ISLOGGED", payload: true });
      let token = JSON.stringify(response?.data?.data?.token);
      let userData = JSON.stringify(response?.data?.data?._id);
      // console.log("🚀 ~ file: saga.js:126 ~ function*login ~ userData:", userData);
      // console.log("🚀 ~ file: saga.js:125 ~ function*login ~ token:", token);
      yield AsyncStorage.setItem("authToken", token);
      yield AsyncStorage.setItem("userId", userData);
      yield AsyncStorage.setItem("role", payload?.role);
      // yield NavigationService.navigate("Home");
      yield NavigationService.navigate("Profile");
    } else {
      Toast.show({
        type: "error",
        text1: `${response?.data?.message} ❌`,
        topOffset: 60,
      });
    }
    yield put({ type: "SHOW_LOADING", payload: false });
  } catch (e) {
    console.log("ERROR IN LOGIN", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}

function* verifyOtp({ payload }) {
  // console.log("Working OTP ", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const postData = {
    role: payload.role,
    OTP: payload.otp,
    email_or_mobile_number: payload.email,
  };
  const requestUrl = "/user/verifyOTP";

  try {
    const response = yield call(GetRecord, requestUrl, postData);
    // console.log( "🚀 ~ file: saga.js:108 ~ function*verifyOtp ~ response:", response.data);
    if (response?.data !== null && response?.data?.statusCode == 200) {
      yield put({ type: "SHOW_LOADING", payload: false });
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
      yield NavigationService.navigate("Login");
    } else {
      Toast.show({
        type: "error",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
      yield put({ type: "SHOW_LOADING", payload: false });
    }
    yield put({ type: "SHOW_LOADING", payload: false });
  } catch (e) {
    console.log("Error in Verify OTP::::", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}
function* forgotPassword({ payload }) {
  // console.log("Forgot password Working ", payload);
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
    // console.log("🚀 ~ file: saga.js:155 ~ function*forgotPassword ~ response:", response.data);
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
    yield put({ type: "SHOW_LOADING", payload: false });
  } catch (e) {
    console.log("Error in forgot password", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}

function* getCategories({ payload }) {
  // console.log("Working categories", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const postData = {
    page: payload?.page,
    limit: payload?.limit,
  };
  const requestUrl = "/home/category/list";

  try {
    // console.log("BEFORE FETCHING", BASE_URL + requestUrl, postData);
    const response = yield call(GetRecord, requestUrl, postData);
    // console.log("🚀 ~ file: saga.js:216 ~ function*getCategories ~ response:", response.data);

    if (response?.data?.statusCode == 200 && response?.data !== null) {
      // console.log("WORKING:::::::");
      yield put({ type: "SAVE_CATEGORIES", payload: response?.data });
    }
    yield put({ type: "SHOW_LOADING", payload: false });
  } catch (e) {
    console.log("Error in get category OTP::::", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}


function* getAllCategories({ payload }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  const postData = {
    page: payload?.page,
    limit: payload?.limit,
  };
  const requestUrl = "/category/list";


  try {
    let config = {
      headers: {
        token: `Bearer ${payload?.token}`,
      },
    };
    const response = yield axios.post(`${BASE_URL + requestUrl}`, postData, config);
    if (response?.data?.statusCode == 200 && response?.data !== null) {
      yield put({ type: "ALL_CATEGORIES", payload: response?.data });
    }
    yield put({ type: "SHOW_LOADING", payload: false });
  } catch (e) {
    // console.log("Error in get category OTP::::", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}

function* getRelatedData({ payload }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  const postData = {
    page: payload?.page,
    limit: payload?.limit,
    categories: payload?.category,
    city: payload && payload.city ? payload.city : '',
    filter: payload && payload.filter ? payload.filter : ''
  };
  const requestUrl = "/home/list";

  try {
    // console.log("BEFORE FETCHING RELATED DATA", BASE_URL + requestUrl,  postData  );
    const response = yield call(GetRecord, requestUrl, postData);
    // console.log("🚀 ~ file: saga.js:243 ~ function*getRelatedData ~ response:", response.data);

    if (response?.data?.statusCode == 200 && response?.data !== null) {
      yield put({ type: "SAVE_RELATEDDATA", payload: response?.data });
    }
  } catch (e) {
    console.log("Error in get category OTP::::", e);
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}

function* getDetails({ payload }) {
  // console.log("GET DETAILS::::::::", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const requestUrl = `/home/view/${payload}`;
  // console.log("BEFORE FETHING URL", requestUrl);
  try {
    const response = yield call(GetRecord1, requestUrl);
    // console.log( "🚀 ~ file: saga.js:267 ~ function*getDetails ~ response:", response?.data);
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
  // console.log("BEFORE FETHING URL CART", requestUrl);
  let config = {
    headers: {
      token: `Bearer ${payload?.token}`,
    },
  };
  const postData = {
    user_id: payload?.user_id,
    art_id: payload?.art_id,
    creator_id: payload?.creator_id,
    quantity: payload?.quantity,
  };

  try {
    // console.log("BEFORE FETCH ADD TO CART:::::::",  `${BASE_URL + requestUrl}`, postData);
    const response = yield axios.post(
      `${BASE_URL + requestUrl}`,
      postData,
      config
    );
    // console.log("🚀 ~ file: saga.js:299 ~ function*addProductToCart ~ response:", response?.data );

    if (response?.data?.message.includes("Add successfully")) {
      yield put({
        type: "GET_PRODUCTS",
        payload: { userId: payload?.user_id, token: payload?.token },
      });
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });

    } else {
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
    }
  } catch (e) {
    console.log("Error in getting CART", e?.response);
  }
}

function* getProducts({ payload }) {
  // console.log("ADD TO GET CART PAYLOAD::::", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const requestUrl = `/cart/list`;
  let config = {
    headers: {
      token: `Bearer ${payload?.token}`,
    },
  };
  const postData = {
    user_id: payload?.userId,
  };
  try {
    const response = yield axios.post(
      `${BASE_URL + requestUrl}`,
      postData,
      config
    );
    if (response?.data !== null) {
      yield put({ type: "SAVE_CART", payload: response?.data?.data });
      console.log("🚀 ~ file: saga.js:386 ~ function*getProducts ~ response:", response?.data?.data);
    }

  } catch (e) {
    console.log("Error in getting order List", e);
  }
}

function* getOrders({ payload }) {
  // console.log("ADD TO GET CART PAYLOAD::::", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  let postData = {}
  let requestUrl = ""
  let config = {
    headers: {
      token: `Bearer ${payload?.token}`,
    },
  };
  if (payload.role != "ARTIST") {
    requestUrl = `/order/user/list`;
    postData = {
      user_id: payload?.userId,
      limit: payload.limit,
      page: payload.page
    };
  } else {
    requestUrl = `/order/artist/list`;
    postData = {
      artist_id: payload?.userId,
      limit: payload.limit,
      page: payload.page
    };
  }
  try {
    const response = yield axios.post(
      `${BASE_URL + requestUrl}`,
      postData,
      config
    );
    if (response?.data !== null) {
      yield put({ type: "SAVE_ORDERS", payload: response?.data?.data });
      console.log("🚀 ~ file: saga.js:386 ~ function*getProducts ~ response:", response?.data?.data);

    }

  } catch (e) {
    console.log("Error in getting CART List", e);
  }
}

function* removeProducts({ payload }) {
  // console.log("REMOVE PRODUCT::::", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const requestUrl = `/cart/remove`;
  let config = {
    headers: {
      token: `Bearer ${payload?.token}`,
    },
  };
  const postData = {
    id: payload?.id,
  };

  try {
    const response = yield axios.post(
      `${BASE_URL + requestUrl}`,
      postData,
      config
    );
    // console.log("🚀 ~ file: saga.js:449 ~ function*removeProducts ~ response:",  response?.data);
    if (response?.data) {
      yield put({
        type: "GET_PRODUCTS",
        payload: { userId: payload?.userId, token: payload?.token },
      });
    }

  } catch (e) {
    console.log("Error in getting CART List", e);
  }
}

function* getAddress({ payload }) {
  // console.log("GET ADDRESS:::::::", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const requestUrl = `/address/list`;
  let config = {
    headers: {
      token: `Bearer ${payload?.token}`,
    },
  };
  const postData = {
    user_id: payload?.user_id,
    page: payload?.page,
    limit: payload?.limit,
  };

  try {
    // console.log("Before fetch ::::::::::::::1", `${BASE_URL + requestUrl}`,  postData);
    const response = yield axios.post(
      `${BASE_URL + requestUrl}`,
      postData,
      config
    );
    // console.log("🚀 ~ file: saga.js:516 ~ function*getAddress ~ response:", response?.data);
    yield put({ type: "SAVE_ADDRESS", payload: response?.data?.data });

  } catch (e) {
    console.log("Error in getting CART List", e);
  }
}

function* getState({ }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  const requestUrl = `/setting/states`;
  let config = {
    headers: null
  };
  try {
    const response = yield axios.get(`${BASE_URL + requestUrl}`, config);
    console.log('Get State => ', response.data);
    yield put({
      type: "SET_STATE_DATA", payload: response?.data?.data.map((item, index) => {
        item.title = item
        item.id = index
        return item
      }),
    });
  } catch (e) {
    console.log("Error in getting CART List", e);
  }
}

function* addAddressfun({ payload }) {
  // console.log("GET ADD ADDRESS:::::::", payload);
  yield put({ type: "SHOW_LOADING", payload: true });
  const requestUrl = `/address/add`;
  let config = {
    headers: {
      token: `Bearer ${payload?.token}`,
    },
  };

  const postData = {
    user_id: payload?.user_id,
    name: payload?.name,
    address: {
      pinCode: payload?.address?.pinCode,
      locality: "456457645",
      address: payload?.address?.address,
      landmark: payload?.address?.landmark,
      delveryType: payload?.address?.delveryType,
      allternatePhone: payload?.address?.phoneNumber,
      state: payload?.address?.state,
      city: payload?.address?.city,
      phoneNumber: payload?.address?.phoneNumber,
    },
    type: payload?.type,
    lat: "44.00155",
    lng: "75.20524",
  };
  try {
    // console.log("Before fetch Data", `${BASE_URL + requestUrl}`, postData, config );
    const response = yield axios.post(`${BASE_URL + requestUrl}`, postData, config);
    console.log("🚀 ~ file: saga.js:555 ~ function*addAddressfun ~ response:", response?.data);

    if (response?.data !== null) {
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
      NavigationService.navigationRef.navigate("Address");
    }
  } catch (e) {
    console.log("Error in getting CART List", e);
  }
}

function* logout({ payload }) {
  // console.log("logout payload:::::::", payload);
  const postData = {
    id: payload,
  };
  const requestUrl = "/user/logout";

  try {
    const response = yield call(GetRecord, requestUrl, postData);
    // console.log("🚀 ~ file: saga.js:583 ~ function*logout ~ response:", response?.data );
    if (response?.data !== null) {
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
      yield put({ type: "ISLOGGED", payload: false });
      yield AsyncStorage.removeItem("authToken");
      yield AsyncStorage.removeItem("userId");
      yield AsyncStorage.removeItem("role");
    }
  } catch (e) {
    console.log("ERROR IN LOGOUT", e);
  }
}

function* addPreOrder({ payload }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  let requestUrl = '';
  let selectedPayload = new FormData();
  if (payload?.role === "ARTIST") {
    requestUrl = '/art/add';
    selectedPayload.append('role', payload.role)
    selectedPayload.append('image', {
      name: payload.imagePath?.fileName,
      type: payload.imagePath.type,
      uri: Platform.select({
        ios: payload.imagePath.uri.replace('file://', ''),
        android: payload.imagePath.uri
      }),
    })
    selectedPayload.append('name', payload.name)
    selectedPayload.append('size', Number(payload.size))
    selectedPayload.append('theme', payload.theme)
    selectedPayload.append('medium', payload.medium)
    selectedPayload.append('frame_quality', payload.frame_quality)
    selectedPayload.append('price', payload.price)
    selectedPayload.append('creator_id', payload.userId)
    selectedPayload.append('status', 'active')
    selectedPayload.append('category', payload.category?._id)
    selectedPayload.append('is_copy_sale', 'yes')
    selectedPayload.append('desc', payload.description)
    selectedPayload.append("color", JSON.stringify([payload.color]));
  } else {
    requestUrl = '/preorder/add';
    selectedPayload = new FormData();
    selectedPayload.append('description', payload.description)
    selectedPayload.append('user_id', payload.userId)
    selectedPayload.append('image', {
      name: payload.imagePath?.fileName,
      type: payload.imagePath.type,
      uri: Platform.select({
        ios: payload.imagePath.uri.replace('file://', ''),
        android: payload.imagePath.uri
      }),
    })
  }
  try {
    var myHeaders = new Headers()
    myHeaders.append('token', `${'Bearer ' + payload?.token}`)
    myHeaders.append('Content-Type', 'multipart/form-data')
    myHeaders.append('Accept', 'application/json')
    var requestOptions = {
      method: 'POST',
      body: selectedPayload,
      headers: myHeaders,
      redirect: 'follow',
    };
    yield fetch(`${BASE_URL}${requestUrl}`, requestOptions).then(response => response.text())
      .then(result => {
        let response = JSON.parse(result)
        console.log("response", response)
        if (response?.statusCode == '200') {
          NavigationService.navigate("Home");
          Toast.show({
            type: "success",
            text1: `${response.message}`,
            topOffset: 60,
          });
        } else {
          Toast.show({
            type: "error",
            text1: `${"Failed to submit pre order"}`,
            topOffset: 60,
          });
        }
      })
  } catch (error) {
    console.error("Error in addPreOrder:", error);
  } finally {
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}

function* changePassword({ payload }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  console.log("working changePassword>>>>>>", payload);
  let config = {
    headers: {
      token: `Bearer ${payload?.token}`,
    },
  };
  const postData = {
    id: payload?.id,
    current_password: payload?.current_password,
    new_password: payload?.new_password,
    confirm_password: payload?.confirm_password,
  };
  const requestUrl = "/user/change/password";

  try {
    console.log("GET VORK>>>>>>>>", `${BASE_URL + requestUrl}`, postData, config);
    const response = yield axios.post(
      `${BASE_URL + requestUrl}`,
      postData,
      config
    );
    // console.log("🚀 ~ file: saga.js:676 ~ function*changePassword ~ response:", response?.data);
    if (response?.data !== null) {
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });

      if (response?.data?.message.includes("Password changed successfully")) {
        yield put({ type: "ISLOGGED", payload: false });
        yield NavigationService.goBack();
        yield AsyncStorage.removeItem("authToken");
        yield AsyncStorage.removeItem("userId");
        yield AsyncStorage.removeItem("role");
      }
    }
    yield put({ type: "SHOW_LOADING", payload: false });
  } catch (e) {
    yield put({ type: "SHOW_LOADING", payload: false });
    console.log("ERROR IN Changing password", e);
  }
}

function* removeAddress({ payload }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  // console.log("working removeAddress>>>>>>", payload);
  let config = {
    headers: {
      token: `Bearer ${payload?.token}`,
    },
  };
  const postData = {
    id: payload?.userId,
  };
  const requestUrl = "/address/remove";

  try {
    // console.log("GET REMOVE>>>>>>>>",  `${BASE_URL + requestUrl + `/${payload?.userId}`}`,  config);
    const response = yield axios.delete(
      `${BASE_URL + requestUrl + `/${payload?.tableId}`}`,
      config
    );
    // console.log("🚀 ~ file: saga.js:738 ~ function*removeAddress ~ response:",  response?.data);
    if (response?.data !== null) {
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
        topOffset: 60,
      });
      yield put({ type: "SAVE_ADDRESS", payload: [] });
      // if (response?.data?.message.includes("Password changed successfully")) {
      //   NavigationService.navigate("Home");
      //   yield AsyncStorage.removeItem("authToken");
      // }
    }
    yield put({ type: "SHOW_LOADING", payload: false });
  } catch (e) {
    yield put({ type: "SHOW_LOADING", payload: false });
    console.log("ERROR IN Remove Address", e);
  }
}

function* getUser({ payload }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  let config = {
    headers: {
      token: `Bearer ${payload?.token}`,
    },
  };
  const requestUrl = "/user/view/";
  try {
    const response = yield axios.get(
      `${BASE_URL + requestUrl + `${payload?.userId}`}`,
      config
    );
    if (response?.data !== null) {
      yield put({ type: "SET_USER", payload: response?.data?.data });
    }
    yield put({ type: "SHOW_LOADING", payload: false });
  } catch (e) {
    yield put({ type: "SHOW_LOADING", payload: false });
    console.log("ERROR IN Getting User", e);
  }
}

function* updateProfile({ payload }) {
  yield put({ type: "SHOW_LOADING", payload: true });
  const requestUrl = `/user/update`;
  let selectedPayload = new FormData();
  if (payload.imagePath?.fileName) {
    selectedPayload.append('image', {
      name: payload.imagePath?.fileName,
      type: payload.imagePath?.type,
      uri: Platform.select({
        ios: payload.imagePath?.uri?.replace('file://', ''),
        android: payload.imagePath?.uri
      }),
    })
  }
  selectedPayload.append('email_or_mobile_number', payload.email_or_mobile_number)
  selectedPayload.append('name', payload.name)
  selectedPayload.append('surname', payload.surname)
  selectedPayload.append('dob', payload.dob)
  selectedPayload.append('address', payload.address)
  selectedPayload.append('gender', payload.gender)
  selectedPayload.append('qualifications', payload.qualifications)
  selectedPayload.append('job_type', payload.job_type)
  selectedPayload.append('additional_detail', payload.additional_detail)
  selectedPayload.append('country', payload.country)
  selectedPayload.append("state", payload.state);
  selectedPayload.append("id", payload.id);
  selectedPayload.append("experience", payload.experience);
  try {
    var myHeaders = new Headers()
    myHeaders.append('token', `${'Bearer ' + payload?.token}`)
    myHeaders.append('Content-Type', 'multipart/form-data')
    myHeaders.append('Accept', 'application/json')
    var requestOptions = {
      method: 'POST',
      body: selectedPayload,
      headers: myHeaders,
      redirect: 'follow',
    };
    yield fetch(`${BASE_URL}${requestUrl}`, requestOptions).then(response => response.text())
      .then(result => {
        let response = JSON.parse(result)
        console.log("response", response)
        if (response?.statusCode == '200') {
          Toast.show({
            type: "success",
            text1: `${response?.message}`,
            topOffset: 60,
          });
          NavigationService.goBack();
        } else {
          Toast.show({
            type: "error",
            text1: `${"Failed to update your profile."}`,
            topOffset: 60,
          });
        }
      })
  } catch (error) {
    console.error("Error in update profile:", error);
  } finally {
    yield put({ type: "SHOW_LOADING", payload: false });
  }
}

function* mySaga() {
  yield takeLatest("SIGN_UP_REQUESTED", SignUp);
  yield takeLatest("LOGIN", login);
  yield takeLatest("VERIFY_OTP", verifyOtp);
  yield takeLatest("FORGOT_PASSWORD", forgotPassword);
  yield takeLatest("GET_CATEGORIES", getCategories);
  yield takeLatest("ALL_CATEGORIES", getAllCategories);
  yield takeLatest("RELATED_DATA", getRelatedData);
  yield takeLatest("GET_DETAILS_DATA", getDetails);
  yield takeLatest("ADD_PRODUCT", addProductToCart);
  yield takeLatest("GET_PRODUCTS", getProducts);
  yield takeLatest("GET_ORDERS", getOrders);
  yield takeLatest("REMOVE_PRODUCT", removeProducts);
  yield takeLatest("GET_ADDRESS", getAddress);
  yield takeLatest("ADD_ADDRESS", addAddressfun);
  yield takeLatest("SET_STATE_DATA", getState);
  yield takeLatest("LOGOUT", logout);
  yield takeLatest("ADD_PREORDER", addPreOrder);
  yield takeLatest("CHANGE_PASSWORD", changePassword);
  yield takeLatest("REMOVE_ADDRESS", removeAddress);
  yield takeLatest("GET_USER", getUser);
  yield takeLatest("UPDATE_ADDRESS", updateProfile);

}

export default mySaga;
