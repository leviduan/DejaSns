import { combineReducers } from 'redux';
import userReducer from './userReducer';
import lookBookReducer from "./lookBookReducer";
import influencerReducer from "./influencerReducer";

export default combineReducers({
  userStore: userReducer,
  lookBookStore : lookBookReducer,
  influencerStore : influencerReducer,
});
