import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/index.js';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import mySaga from '../../saga/saga.js';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);
export const persistor = persistStore(store);
