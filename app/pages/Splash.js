import React from 'react';
import {View, Text, Image,StyleSheet,AsyncStorage,StatusBar} from 'react-native';

import Global from '../utils/Global';
import * as DejaApi from "../net/DejaApi";
import Toast from "../utils/ToastProxy";
import * as Constant from "../utils/Constant";
import BaseComponent from "../common/BaseComponent";

class Splash extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {navigate} = this.props.navigation;

        AsyncStorage.getItem(Constant.USER_INFO_UID)
            .then(
                (result)=> {
                    if (result == null) {
                        DejaApi.accountRegister( (response) => {
                            if (response.data.ret === 0) {
                                gUserInfo.uid = response.data.uid
                                AsyncStorage.setItem(Constant.USER_INFO_UID, gUserInfo.uid )

                            } else {
                                Toast(response.data.msg)
                            }
                        }).then(() => {

                            this.timer = setTimeout(() => {
                                navigate('HomeTabContainer');
                                StatusBar.setHidden(false);
                            }, 1000);
                        })
                    }
                    else
                    {
                        //gUserInfo.uid = result
                        this.timer = setTimeout(() => {
                            navigate('HomeTabContainer');
                            StatusBar.setHidden(false);
                        }, 1000);
                    }

                }
            ).catch((error)=> {
            console.log('error:' + error.message);
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#262729"
                    hidden={true}
                />
                <Image style={styles.logo} source={require('../img/ic_splash.png')} />

                <Text>{ gUrl.apiHost}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    logo: {
        width: 158,
        height: 60,
    },
});


export default Splash;
