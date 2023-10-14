const intialState = {
  signUpData: {},
  otp: "",
  token: "",
  isLoading: false,
  savedEmail: "",
  savedCategories: [],
  relatedData: [],
  detailsData: [],
  userId: "",
};

const saveDataReducer = (state = intialState, action) => {
  switch (action.type) {
    case "SAVEDATA":
      return { ...state, signUpData: action.payload };

    case "SAVE_OTP":
      return { ...state, otp: action.payload };

    case "SAVE_TOKEN":
      return { ...state, token: action.payload };

    case "SHOW_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SAVE_SIGNUPDATA":
      return {
        ...state,
        savedEmail: action.payload,
      };
    case "SAVE_CATEGORIES":
      return {
        ...state,
        savedCategories: action.payload,
      };

    case "SAVE_RELATEDDATA":
      return {
        ...state,
        relatedData: action.payload,
      };

    case "SAVE_DETAILS_DATA":
      console.log(
        "SAVE_DETAILS_DATASAVE_DETAILS_DATASAVE_DETAILS_DATA",
        action.payload
      );
      return {
        ...state,
        detailsData: action.payload,
      };

    case "SAVE_USERID":
      return {
        ...state,
        userId: action.payload,
      };

    default:
      return state;
  }
};

export default saveDataReducer;
