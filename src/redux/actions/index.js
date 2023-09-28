import * as ActionTypes from "../../constants/ActionTypes";

export const saveSignInData = (payload) => {
  return { type: ActionTypes.SAVEDATA, payload };
};

export const signUp = (payload) => {
  return {
    type: ActionTypes.SIGN_UP_REQUESTED,
    payload: payload,
  };
};
export const saveOTP = (payload) => {
  return {
    type: ActionTypes.SAVE_OTP,
    payload: payload,
  };
};

export const login = (payload) => {
  return {
    type: ActionTypes.LOGIN,
    payload: payload,
  };
};

export const saveToken = (payload) => {
  return {
    type: ActionTypes.SAVE_TOKEN,
    payload: payload,
  };
};

export const verifyOTP = (payload) => {
  return {
    type: ActionTypes.VERIFY_OTP,
    payload: payload,
  };
};

export const forgotPassword = (payload) => {
  return {
    type: ActionTypes.FORGOT_PASSWORD,
    payload: payload,
  };
};

export const getCategories = (payload) => {
  return {
    type: ActionTypes.GET_CATEGORIES,
    payload: payload,
  };
};

export const getRelatedData = (payload) => {
  return {
    type: ActionTypes.RELATED_DATA,
    payload: payload,
  };
};
