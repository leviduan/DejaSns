import * as DejaApi from "../../net/DejaApi";
import * as TYPES from "./types";

export function sendInfluencerNetTask(params){
  return (dispatch) => {
    dispatch({'type': TYPES.Influencer_Loading});

    DejaApi.getRequest('/shop/star/street_snaps', params, (response) => {

      if (response.data.ret === 0) {
        dispatch({'type': TYPES.Influencer_Success, influencer: response.data.data});
      }
      else {
        // dispatch({'type': TYPES.LookBook_Error, user: response.data.msg});
      }
    });
  }
}