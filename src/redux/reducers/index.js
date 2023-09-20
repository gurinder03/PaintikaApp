import {combineReducers} from 'redux';
import saveDataReducer from './saveData';

const rootReducer = combineReducers({
  saveDataReducer,
});

export default rootReducer;
