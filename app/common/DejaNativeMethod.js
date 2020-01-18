import {NativeModules} from 'react-native';

export function sendFirebaseEvent(eventName, eventOpt = {}) {
    NativeModules.sendFirebaseEvent(eventName, eventOpt);
}
