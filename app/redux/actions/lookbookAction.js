import * as TYPES from "./types";
import * as DejaApi from "../../net/DejaApi";

export function sendLookBookNetTask(params){
  return (dispatch) => {
    dispatch({'type': TYPES.LookBook_Loading});

    DejaApi.getRequest('/shop/lookbook', params, (response) => {
      if (response.data.ret === 0) {
        dispatch({'type': TYPES.LookBook_Success, lookbook: response.data.data});
      }
      else {
        dispatch({'type': TYPES.LookBook_Error, user: response.data.msg});
      }
    });
  }
}