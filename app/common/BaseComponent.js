import React from 'react';
import {ToastAndroid,BackHandler} from 'react-native';

let lastBackPressed = 0;

export default class BaseComponent extends React.Component {

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onBackButtonPressAndroid = () => {
        let now = new Date().getTime();
        if(now - lastBackPressed < 2500) {
            BackHandler.exitApp()
            return false;
        }
        lastBackPressed = now;
        ToastAndroid.show('press back again to confirm leaving',ToastAndroid.SHORT);
        return true;
    };

}