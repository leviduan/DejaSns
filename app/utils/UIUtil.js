import {
    Dimensions,
    Platform
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

export function showLoading(timeOut = 10000) {
    global.mLoadingComponentRef && global.mLoadingComponentRef.showLoading();
    this.timerLoading = setTimeout(() => {
        this.dismissLoading();
    }, timeOut);

}

export function dismissLoading() {
    global.mLoadingComponentRef && global.mLoadingComponentRef.dismissLoading();
    this.timerLoading && clearTimeout(this.timerLoading);

}

export function getStatusBarBackground()
{
    return Platform.OS === "ios" ? '#262729' : '#000000';
}
