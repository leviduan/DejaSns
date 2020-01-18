import {NetInfo} from 'react-native';
import * as Code from './NetwrokCode'
import handlerError from './NetwrokCode'

import Global from '../utils/Global';

export const CONTENT_TYPE_JSON = "application/json";
export const CONTENT_TYPE_FORM = "application/x-www-form-urlencoded";
export const timeoutMs = 15000;

let instance = null;


export default class HttpManager {

  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async dejaFetch(url, method = 'GET', params = null, new_api = true, json = true, header) {
    let isConnected = await NetInfo.isConnected.fetch().done;

    if (!isConnected) {
      return {
        result: false,
        code: Code.NETWORK_ERROR,
        msg: 'network error'
      }
    }

    let headers = {};
    if (header) {
      headers = Object.assign({}, headers, header)
    }


    url = gUrl.apiHost + url;

    headers.uid = gUserInfo.uid;
    headers.sig = gUserInfo.sig;
    headers["x-dejafashion-ua"] = gUserInfo.userAgent;

    let requestParams;

    if (method !== 'GET') {
      if (json) {
        requestParams = this.formParamsJson(method, params, headers)
      } else {
        requestParams = this.formParams(method, params, headers)
      }
    } else {

      const str = [];
      for (let p in params) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
      }
      let body = null;
      if (str.length > 0) {
        body = str.join("&");
      }
      if (body != null) {
        url = url + '?' + body;
      }


      requestParams = this.formParams(method, null, headers)
    }

    let response = await this.requestWithTimeout(timeoutMs, fetch(url, requestParams));

    if (__DEV__) {
      console.log('url ', url);
      console.log('requestParams', requestParams);
      console.log('response', response);
    }

    if (response && response.status === Code.NETWORK_TIMEOUT) {
      return {
        result: false,
        code: response.status,
        data: handlerError(response.status, response.statusText),
      }
    }
    try {
      let responseJson = await response.json();

      if (response.status === 200 || response.status === 201) {
        return {
          result: true,
          code: Code.SUCCESS,
          data: responseJson,
          headers: response.headers
        }
      }
    } catch (e) {
      console.log(e, url);
      return {
        data: response._bodyText,
        result: response.ok,
        code: response.status ? response.status : Code.NETWORK_JSON_EXCEPTION,
        response
      }
    }

    return {
      result: false,
      code: response.status,
      data: handlerError(response.status, response.statusText),
    }
  }


  formParamsJson(method, params, headers) {
    const body = JSON.stringify(params);
    const req = {
      method: method,
      headers: new Headers({
        'Content-Type': CONTENT_TYPE_JSON,
        ...(headers || {})
      }),
      body
    };
    return req
  }


  formParams(method, params, headers) {
    const str = [];
    for (let p in params) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
    }
    let body = null;
    if (str.length > 0) {
      body = str.join("&");
    }
    const req = {
      method: method,
      headers: new Headers({
          'Content-Type': CONTENT_TYPE_FORM,
          ...(headers || {})
        }
      ),
      body
    };
    return req
  }


  requestWithTimeout(ms, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        resolve({
          status: Code.NETWORK_TIMEOUT,
          message: 'network timeout'
        })
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          resolve(err);
        }
      );
    })
  }
}
//export default new HttpManager();
