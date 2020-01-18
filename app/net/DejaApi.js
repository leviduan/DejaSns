import HttpManager from './HttpManager'
import * as ApiAddress from './ApiAddress'
import Toast from '../utils/ToastProxy'
import queryString from 'query-string';
import * as URLUtil from "../utils/URLUtil";

export const HTTP_GET = 'GET';
export const HTTP_POST = 'POST';
export const HTTP_PUT = 'PUT';
export const HTTP_DELETE = 'DELETE';


let httpManagerInstance = new HttpManager();

////////////////////////////////////////////////////////////////////////////////////////////
//                          Account
////////////////////////////////////////////////////////////////////////////////////////////

export const accountRegister = async ( callback) => {
    let res = await httpManagerInstance.dejaFetch(ApiAddress.ACCOUNT_REGISTER, HTTP_POST);

    if (res.data.ret) {

        Toast(res.data.msg);
    }
    else {
        callback(res)
    }

};


////////////////////////////////////////////////////////////////////////////////////////////
//                          Details
////////////////////////////////////////////////////////////////////////////////////////////

export const getItemDetails = async (shopItemId, shopItemGroupId, callback) => {

    let params = {
        shopItemId: shopItemId,
        shopItemGroupId: shopItemGroupId,
    };

    let res = await httpManagerInstance.dejaFetch(URLUtil.urlFormat(ApiAddress.SHOP_ITEM,params), HTTP_GET);
    if (res.data.ret) {
        Toast(res.data.msg);
    }
    else {
        callback(res)
    }
};


////////////////////////////////////////////////////////////////////////////////////////////
//                          Me
////////////////////////////////////////////////////////////////////////////////////////////

export const getMyFollowing = async (pageNum, callback) => {

    let params = {
        'page': pageNum,
        'pageSize': 50
    };

    let res = await httpManagerInstance.dejaFetch(ApiAddress.MY_FLOOOWINGS, HTTP_GET, params);
    if (res.data.ret) {
        Toast(res.data.msg);
    }
    else {
        callback(res)
    }
};


/**
 * 通用Get RequestNetTask
 * @param url
 * @param params：dict
 * @param callback
 * @returns {Promise<void>}
 */
export const getRequest = async (url, params, callback) => {
  if (params) {
    url += '?' + queryString.stringify(params)
  }
  let res = await httpManagerInstance.dejaFetch(url);
  if (res.data.ret) {
    Toast(res.data.msg);
  }
  else {
    callback(res)
  }
};


export const postRequest = async (url, params, callback) => {
  let res = await httpManagerInstance.dejaFetch(url, HTTP_POST, params);
  if (res.data.ret) {
    Toast(res.data.msg);
  }
  else {
    callback(res)
  }
};






