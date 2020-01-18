'use strict';

import * as TYPES from "../actions/types";
const initialState = {
  look_book_list: [],
  is_page_end: false,
};

export default function lookBookReducer(state=initialState, action) {

  switch (action.type) {
    case TYPES.LookBook_Loading:
      return {
        ...state,
      };

    case TYPES.LookBook_Success:
      return {
        ...state,
        look_book_list: action.lookbook.look_book_list,
        is_page_end: false
      };

    default:
      return state;
  }
}