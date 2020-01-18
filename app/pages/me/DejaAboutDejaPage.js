import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    Linking
} from 'react-native';
import * as DejaApi from "../../net/DejaApi";

export default class DejaAboutDejaPage extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: 'About Deja',
        };
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
               <Image
                    source={require('../../img/aboutdejalogo.png')} style={{
                        height: 100,
                        width: 100,
                        alignSelf: 'center',
                        marginTop: 50,
                }}/>
                <Text style={styles.versionTextStyle}>V7.4.0</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA'
    },
    versionTextStyle: {
        fontSize: 16,
        marginTop: 20,
        alignSelf: 'center',
        color: 'red'
    }
})