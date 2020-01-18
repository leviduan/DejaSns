import React from 'react';
import {Easing, Animated,Image,TouchableOpacity} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import Splash from './pages/Splash';
import Lookbook from './pages/lookbook/Lookbook';
import Saved from './pages/saved/Saved';
import Me from './pages/me/Me';

import NavigationService from "./utils/NavigationService";
import Influencer from "./pages/lookbook/Influencer";
import StylingIdeas from "./pages/lookbook/StylingIdeas";
import ItemListPage from "./pages/lookbook/ItemListPage";
import MyFollowing from "./pages/me/MyFollowing";
import ProductDetails from "./pages/details/ProductDetails";
import DejaSettingPage from "./pages/me/DejaSettingPage"
import DejaAboutDejaPage from "./pages/me/DejaAboutDejaPage"
import DejaTermsOfServicePage from "./pages/me/DejaTermsOfServicePage"
import DejaFavouriteLooksPage from "./pages/me/DejaFavouriteLooksPage"

const LookBookStack = createStackNavigator(
    {
        Lookbook: {screen: Lookbook, navigationOptions: {headerLeft: null}},
        ProductDetails: {screen: ProductDetails},
        Influencer: {screen: Influencer},
        StylingIdeas: {screen: StylingIdeas},
        ItemListPage: {screen: ItemListPage},
    },
    {
        mode: 'card',
        defaultNavigationOptions: ({ navigation }) => ({
            gesturesEnabled: true,
            headerStyle: {
                backgroundColor: "#262729",
                borderBottomWidth: 0,
                elevation: 0,
            },
            headerTitleStyle: {
                color: '#FFFFFF',
                fontSize: 17,
                alignSelf: 'center',
                fontWeight: 'normal',
            },
            headerLeft: (
                <TouchableOpacity
                    style={{height: 30, justifyContent: 'center'}}
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Image
                        source={require('./img/ic_back.png')} style={{
                        height: 19,
                        width: 10,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginLeft: 22,
                        marginRight: 22
                    }}
                    />
                </TouchableOpacity>
            ),
        }),
    }
);

const MeStack = createStackNavigator(
    {
        MeSubPage: {
            screen: Me,
        },
        MyFollowing: {
            screen: MyFollowing,
        },
        DejaSettingPage: {
            screen: DejaSettingPage,
        },
        DejaAboutDejaPage: {
            screen: DejaAboutDejaPage,
        },
        DejaTermsOfServicePage: {
            screen: DejaTermsOfServicePage,
        },
        DejaFavouriteLooksPage: {
            screen: DejaFavouriteLooksPage,
        }
    },
    {
        mode: 'card',
        defaultNavigationOptions: ({ navigation }) => ({
            gesturesEnabled: true,
            headerStyle: {
                backgroundColor: "#262729",
                borderBottomWidth: 0,
                elevation: 0,
            },
            headerTitleStyle: {
                color: '#FFFFFF',
                fontSize: 17,
                alignSelf: 'center',
                fontWeight: 'normal',
            },
            headerLeft: (
                <TouchableOpacity
                    style={{height: 30, justifyContent: 'center'}}
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Image
                        source={require('./img/ic_back.png')} style={{
                        height: 19,
                        width: 10,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginLeft: 22,
                        marginRight: 22
                    }}
                    />
                </TouchableOpacity>
            ),
        }),
    }
);

const HomeTabContainer = createBottomTabNavigator(
    {
        LookBookStack: {
            screen: LookBookStack,
            navigationOptions: ({ navigation }) => ({
                title: 'Lookbook',
                tabBarVisible: navigation.state.index === 0,
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require('./img/ic_home_lookbook_focused.png')
                            : require('./img/ic_home_lookbook_normal.png')}
                        style={{width: 24, height: 23, tintColor: tintColor}}
                    />
                )
            })
        },
        Saved: {
            screen: Saved,
            navigationOptions: ({ navigation }) => ({
                title: 'Saved',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Image
                        source={focused ? require('./img/ic_home_lookbook_focused.png')
                            : require('./img/ic_home_lookbook_normal.png')}
                        style={{ width: 24, height: 23, tintColor: tintColor }}
                    />
                )
            })
        },
        MePage: {
            screen: MeStack,
            navigationOptions: ({ navigation }) => ({
                title: 'Me',
                tabBarVisible: navigation.state.index === 0,
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require('./img/ic_homepage_me_pressed.png')
                            : require('./img/ic_homepage_me_normal.png')}
                        style={{width: 22, height: 23, tintColor: tintColor}}
                    />
                )
            })
        },
    }, {
        tabBarOptions: {
            animationEnabled: true,
            activeTintColor: '#ef533e',
            inactiveTintColor: '#999999',
            labelStyle: {
                fontSize: 12,
            },
        },
        style: {
            backgroundColor: '#ffffff'
        },
        indicatorStyle: {
            opacity: 0
        },
        tabStyle: {
            padding: 0
        },
    });


const RootStack = createSwitchNavigator(
    {
        Splash: {
            screen: Splash,
            navigationOptions: {
                header: null
            }
        },
        HomeTabContainer: {
            screen: HomeTabContainer,
            navigationOptions: {
                animationEnabled: true
            }
        },
    }, 
    {
        mode: 'card',
    }
);

function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.routeName;
}


const AppContainer = createAppContainer(RootStack);

export default class Root extends React.Component {


    constructor(props) {
        super(props);
        gBuildMode.isDevMode = props.isDevMode;
        gBuildMode.isTestMode = props.isTestMode;
        // gUrl.apiHost = props.apiHost
        // if (props.isTestMode) {
        //     gUrl.apiHost = "http://cloud-dp.deja.fashion"
        // }
        // else if (props.isDevMode) {
        //     gUrl.apiHost = "http://cloud-dt.deja.fashion"
        // }
    }


    render() {
        return <AppContainer
            ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = getActiveRouteName(currentState);
                const prevScreen = getActiveRouteName(prevState);

                if (prevScreen !== currentScreen) {

                }
            }}/>;
    }
}