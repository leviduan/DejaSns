import React from 'react';
import * as CacheManager from 'react-native-http-cache'
import DejaAboutDejaPage from "./DejaAboutDejaPage"
import DejaTermsOfServicePage from "./DejaTermsOfServicePage"
import * as DejaApi from "../../net/DejaApi";
import { createStackNavigator, NavigationActions } from 'react-navigation';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Linking,
    Alert
} from 'react-native';

const SETTING_CLEAR_CACHE = 0;
const ABOUT_DEJA = 1;
const RATE_US_IN_THE_APPSTORE = 2;
const LIKE_US_ON_FACEBOOK = 3
const FOLLOW_US_ON_INSTAGRAM = 4
const TERMS_OF_SERVICE = 5
const CONTACT_US = 6
const DATASOURCE = [
    {
        "id": SETTING_CLEAR_CACHE,
        "name": "Clear image cache"
    },
    {
        "id": ABOUT_DEJA,
        "name": "About Deja"
    },
    {
        "id": RATE_US_IN_THE_APPSTORE,
        "name": "Rate us in the App Store"
    },
    {
        "id": LIKE_US_ON_FACEBOOK,
        "name": "Like us on Facebook"
    },
    {
        "id": FOLLOW_US_ON_INSTAGRAM,
        "name": "Follow us on the Instagram"
    },
    {
        "id": TERMS_OF_SERVICE,
        "name": "Terms of service"
    },
    {
        "id": CONTACT_US,
        "name": "Contact us"
    },
]


export default class DejaSettingPage extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: 'Setting',
            tabBarVisible: (navigation.state.params && navigation.state.params.hideTabBar) === true,
            animationEnabled: true
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            data : DATASOURCE,
            cache: 12.4,
        }
    }

    componentDidMount() {
        this.getCacheSize()
    }


    componentWillMount() {
        const setParamsAction = NavigationActions.setParams({
            params: {hideTabBar: true}
        });
        this.props.navigation.dispatch(setParamsAction);
    }

    componentWillUnmount() {
        const setParamsAction = NavigationActions.setParams({
            params: {hideTabBar: false}
          });
          this.props.navigation.dispatch(setParamsAction);
    }

    _onPressItem = (id) => {
        if (id === SETTING_CLEAR_CACHE) {
            this.clearCacheSize()
            this.setState({cache: 0})
        }
        if (id === ABOUT_DEJA) {
            this.props.navigation.navigate('DejaAboutDejaPage')
        }
        if (id === LIKE_US_ON_FACEBOOK) {
            this._handleEnterFacebookPress()
        }
        if (id === RATE_US_IN_THE_APPSTORE) {
            this._handleEnterAppstorePress()
        }
        if (id === FOLLOW_US_ON_INSTAGRAM) {
            this._handleEnterInstagramPress()
        }
        if (id === TERMS_OF_SERVICE) {
            this.props.navigation.navigate('DejaTermsOfServicePage')
        }
        if (id === CONTACT_US) {
            Linking.canOpenURL('mailto:suiyun@me.com').then(supported => {
                if (!supported) {
                    console.log('Can\'t handle');
                } else {
                    return Linking.openURL('mailto:suiyun@me.com');
                }
            }).catch(err => console.warn('An error occurred', err));
        }
        return 
    };

    _handleEnterFacebookPress = () => {
        Linking.openURL('https://m.facebook.com/profile.php?id=358351671023124');
    };

    _handleEnterAppstorePress = () => {
        Linking.openURL('https://itunes.apple.com/sg/app/deja-fashion/id1415604888?mt=8');
    };

    _handleEnterInstagramPress = () => {
        Linking.openURL('https://www.instagram.com/deja.fashion/');
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList style={styles.flatList}
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    extraData={this.state}
                />
            </SafeAreaView>
        );
    }

    _renderItem = ({item}) => (
        <MeTabItem
            onPressItem={this._onPressItem}
            title={item.title}
            id={item.id}
            name={item.name}
            cache={this.state.cache}
        />
    );

    async getCacheSize() {
        const data = await CacheManager.getCacheSize();
        const size = data / (1024 * 1024);
        this.setState({ cache: size.toFixed(2)});
    }

    async clearCacheSize() {
        await CacheManager.clearCache();
        // this.getCacheSize();
        // 这里貌似清除不能全部清除为0，这里直接写死0即可。
        this.setState({cacheSize: '0M'});
        alert('清除缓存成功');
    }
}

class MeTabItem extends React.PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        let imageName = require('../../img/ic_right_arrow.png')
        return (
            <TouchableOpacity activeOpacity={0.9}
                              style={styles.itemButton}
                              onPress={this._onPress}>
                {this.props.id ?
                    <View style={styles.itemSeparationLine}/>
                    :
                    null
                }
                <View style={styles.itemView}>                    
                    <Text style={styles.itemText}>
                        {this.props.name}
                    </Text>
                    {this.props.id !== 0 ?
                        <Image
                            source={imageName}
                            style={styles.itemImage}
                        />
                        :
                        <Text style={styles.cacheTextStyle}>
                            {this.props.cache}M
                        </Text>
                    }
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA'
    },
    flatList: {
        flex: 1,
        marginTop: 40,
    },
    topNavigationView:{
        justifyContent: 'center',
        alignItems:'center',
        height: 45,
        backgroundColor: "#262729"
    },

    topNavigationText:{
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'center',
    },

    userProfileBg: {
        width: '100%',
        height: 150,
    },

    userAvatar: {
        width: 60,
        height: 60,
        position: 'absolute',
        marginTop: 20,
        alignSelf: 'center',
    },

    userNameText: {
        fontSize: 15,
        marginTop: 95,
        position: 'absolute',
        color: '#FFFFFF',
        alignSelf: 'center',
    },

    itemButton: {
        backgroundColor: "#FFFFFF",
        height: 50,
    },

    itemSeparationLine: {
        height: 1,
        backgroundColor: '#EAEAEA',
    },

    itemView: {
        position: 'relative',
        flexDirection: 'row',
        height: '100%',
    },
    itemImage: {
        height: 10,
        width: 10,
        marginLeft: 'auto',
        marginRight: 20,
        alignSelf: 'center',
    },
    itemText: {
        fontSize: 15,
        marginLeft: 15,
        color: "#262729",
        alignSelf: 'center',
    },
    cacheTextStyle: {
        fontSize: 12,
        color: "#7a7b7c",
        marginLeft: 'auto',
        marginRight: 20,
        alignSelf: 'center',
    },
});