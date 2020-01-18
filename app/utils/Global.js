import {Dimensions,Platform,StatusBar,PixelRatio} from  'react-native';

const {width, height} = Dimensions.get('window');
const  OS = Platform.OS;
const ios = (OS === 'ios');
const android = (OS === 'android');


global.gScreen = {
    screenWidth:width,
    screenHeight:height,
}

global.gDevice = {
    ios:ios,
    android:android,
}

global.gUrl = {
    apiHost:"http://cloud-dp.deja.fashion",
}

global.gUserInfo = {
    uid:"261681",
    sig:"",
    userAgent:"iOS/10.2.1 CiOS/201901031050 Encoding/UTF-8 Lang/zh-Hans-SG Morange/7.3.3 Caps/0 PI/f30791a4d5ebee0071959796c25d0d6c Domain/(null) DeviceBrand/Apple DeviceModel/iPhone_6 DeviceVersion/10.2.1 ClientType/CiOS ClientBuild/7.3.3.201901031050 appID/com.dejafashion.product ScreenWidth/750 ScreenHeight/1334 Mcc/460 Mnc/01",
}

global.gBuildMode = {
    isTestMode:false,
    isDevMode:false,
}
