const intialState = {
  signUpData: {},
  otp: "",
  token: "",
  isLoading: false,
  savedEmail: "",
  savedCategories: [],
  allCategories: [],
  relatedData: [],
  detailsData: [],
  userId: "",
  cartList: null,
  reponseBackData: [],
  addressData: [],
  userData: [],
  stateData: [],
  isLogged: false,
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
    case "ALL_CATEGORIES":
      return {
        ...state,
        allCategories: action.payload,
      };
    case "SAVE_RELATEDDATA":
      return {
        ...state,
        relatedData: action.payload,
      };

    case "SAVE_DETAILS_DATA":
      // console.log("SAVE_DETAILS_DATASAVE_DETAILS_DATASAVE_DETAILS_DATA", action.payload);
      return {
        ...state,
        detailsData: action.payload,
      };

    case "SET_STATE_DATA":
      return {
        ...state,
        stateData: action.payload,
      };

    case "SAVE_USERID":
      return {
        ...state,
        userId: action.payload,
      };
    case "ISLOGGED":
      return {
        ...state,
        isLogged: action.payload,
      };

    case "SAVE_CART":
      return {
        ...state,
        cartList: action.payload,
      };

    case "RETURN_GET_DATA":
      return {
        ...state,
        reponseBackData: action.payload,
      };

    case "SAVE_ADDRESS":
      // console.log("ADRRES IN REDUCER::::::::", action.payload);
      return {
        ...state,
        addressData: action.payload,
      };

    case "SET_USER":
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default saveDataReducer;
