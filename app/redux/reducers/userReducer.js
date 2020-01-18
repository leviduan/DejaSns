'use strict';

import * as TYPES from '../actions/types';

const initialState = {
  isLoggedIn: false,
  user: {},
  status: null,
};
// reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state（上面两个文件可以看着两个reducer）。
export default function userReducer(state=initialState, action){

  switch(action.type){
    case TYPES.LOGGED_DOING:
      return {
        ...state,
        status: 'doing'
      };

    case TYPES.LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        status: 'done'
      };

    case TYPES.LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: action.user,
        status: null
      };
    case TYPES.LOGGED_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        status: 'error'
      };

    default:
      return state;
  }

}

