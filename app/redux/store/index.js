'use strict';
// 数据持久化工具
// import { AsyncStorage } from 'react-native';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers/index';
import { createLogger }from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();

export default () => {
  let store = createStore(rootReducer, applyMiddleware(logger, thunk));
  return { store }
}


