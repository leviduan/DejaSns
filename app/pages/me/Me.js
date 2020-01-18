import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Linking} from 'react-native';
import MyFollowing from "./MyFollowing";
import DejaSettingPage from "./DejaSettingPage"
import DejaFavouriteLooksPage from "./DejaFavouriteLooksPage"

const ME_MY_FOLLOWING_INDEX = 0;
const ME_SETTING_INDEX = 1;
const ME_CONTACT_US_INDEX = 2;
const FAVOURITE_LOOKS = 3;


const profileImages = {
    myFollowingIcon: require('../../img/ic_my_following.png'),
    contactUsIcon: require('../../img/ic_content_us.png'),
    settingIcon: require('../../img/ic_my_following.png'),
};

class Me extends React.Component {

    static navigationOptions = {
        title: 'Me',
        headerLeft: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    _renderItem = ({item}) => (
        <MeTabItem
            onPressItem={this._onPressItem}
            title={item.title}
            id={item.id}
            name={item.name}
        />
    );

    _onPressItem = (id) => {

        if (id === ME_MY_FOLLOWING_INDEX) {
            this.props.navigation.navigate('MyFollowing')
        }
        else if (id === ME_SETTING_INDEX) {
            this.props.navigation.navigate('DejaSettingPage')
        }
        else if (id === ME_CONTACT_US_INDEX) {
            Linking.canOpenURL('mailto:suiyun@me.com').then(supported => {
                if (!supported) {
                    console.log('Can\'t handle');
                } else {
                    return Linking.openURL('mailto:suiyun@me.com');
                }
            }).catch(err => console.warn('An error occurred', err));
        }
        else if (id === FAVOURITE_LOOKS) {
            this.props.navigation.navigate('DejaFavouriteLooksPage')
        }
    };

    _renderHeader = () => (
        <View>
            <Image
                source={require('../../img/profile_bg.png')}
                style={styles.userProfileBg}
            />

            <Image
                source={require('../../img/ic_account_icon.png')}
                style={styles.userAvatar}
                imageStyle={{resizeMode: 'contain'}}/>

            <Text style={styles.userNameText}>
                Login
            </Text>
        </View>
    );

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList bounces = {false}
                    data={[
                        {
                            "id": ME_MY_FOLLOWING_INDEX,
                            "name": "Followings"
                        },
                        {
                            "id": ME_SETTING_INDEX,
                            "name": "Settings"
                        },
                        {
                            "id": ME_CONTACT_US_INDEX,
                            "name": "Contact Us"
                        },
                        {
                            "id": FAVOURITE_LOOKS,
                            "name": "Favourite Looks"
                        }
                    ]}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this._renderItem}
                    ListHeaderComponent={this._renderHeader}
                />
            </SafeAreaView>
        );
    }
}

class MeTabItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {

        let imageName = profileImages.myFollowingIcon;
        if (this.props.id === ME_MY_FOLLOWING_INDEX) {
            imageName = profileImages.myFollowingIcon;
        }
        else if (this.props.id === ME_CONTACT_US_INDEX) {
            imageName = profileImages.contactUsIcon;
        }
        else if (this.props.id === ME_SETTING_INDEX) {
            imageName = profileImages.settingIcon;
        }


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

    homeTabImage:{

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
        height: 50
    },

    itemSeparationLine: {
        height: 1,
        backgroundColor: '#EAEAEA',
    },

    itemView: {
        flexDirection: 'row',
        height: '100%'
    },

    itemImage: {
        height: 23,
        width: 23,
        marginLeft: 23,
        alignSelf: 'center',
    },

    itemText: {
        fontSize: 15,
        marginLeft: 15,
        color: "#262729",
        alignSelf: 'center',
    },
});

export default Me;
