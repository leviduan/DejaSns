import * as TYPES from "../actions/types";

const initialState = {
  street_snap_list: [],
  is_page_end: false,
};

export default function influencerReducer(state=initialState, action) {
  switch (action.type) {
    case TYPES.Influencer_Success:
      return {
        ...state,
        street_snap_list: action.influencer.street_snap_list,
        is_page_end: false
      };

    default:
      return state;
  }
}