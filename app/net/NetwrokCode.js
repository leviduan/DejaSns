import Toast from '../utils/ToastProxy'

export const NETWORK_ERROR = 1;

export const NETWORK_TIMEOUT = 2;

export const NETWORK_JSON_EXCEPTION = 3;

export const SUCCESS = 200;

export default function (code, statusText) {
    switch (code) {
        case 401:
            Toast('401 Unauthorized');
            return "401 Unauthorized";
        case 403:
            Toast('No authority');
            return "No authority";
        case 404:
            Toast('Request Not Found');
            return "Request Not Found";
        case 410:
            Toast('410 Gone');
            return "410 Gone";
        case NETWORK_TIMEOUT:
            Toast('network timeout');
            return 'network timeout';
        default:
            if (statusText) {
                Toast(statusText);
            } else {
                Toast('UnKnow');
            }
            return "UnKnow"
    }

}