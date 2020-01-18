import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import * as DejaApi from "../../net/DejaApi";
import * as UIUtil from "../../utils/UIUtil";
import Global from '../../utils/Global';
import Toast from "../../utils/ToastProxy";

let pageNo = 0;

class MyFollowing extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: 'My Following',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            followingList: [],
            isLoading: false,
            isEnd: true,
            display: 'none',
        };
    }

    componentDidMount() {
        pageNo = 0;
        this._getMyFollowing(pageNo);
    }


    _getMyFollowing(pageNo) {

        this.loadTime = (new Date()).getTime()
        if (pageNo === 0) {
            UIUtil.showLoading();
        }

        this.setState({isLoading: true});
        DejaApi.getMyFollowing(pageNo, (response) => {
            if (response.data.ret === 0 && response.data.data !== null) {
                let dataList = response.data.data.content;
                let dataContent = [];
                let i = this.state.followingList.length;

                dataList.map((item) => {
                    dataContent.push({
                        key: i,
                        value: item
                    });
                    i++;
                });

                this.setState({
                    isEnd: response.data.data.last,
                    followingList: this.state.followingList.concat(dataContent),

                }, () => {

                });

            } else {
                Toast(response.data.msg)
            }
        }).then(() => {
            UIUtil.dismissLoading();
            this.setState({isLoading: false, display: 'flex'});
        })

    }

    render() {
        return (
            <SafeAreaView style={[styles.container,{display: this.state.display}]}>
                {this.state.followingList.length > 0 ? this._renderFollowingList() : this._renderNoFollowingView()}
            </SafeAreaView>
        );
    }

    _renderNoFollowingView() {
        return (

            <View style={styles.noFollowItemView}>
                <Image
                    style={styles.warnImage}
                    source={require('../../img/ic_warning.png')}/>

                <Text
                    style={styles.noFollowText}>
                    No following yet…
                </Text>

                <Text
                    style={styles.noFollowTipText}>
                    Follow people you are interested in.
                </Text>
                <TouchableOpacity
                    style={styles.noFollowButton}
                    activeOpacity={0.9}
                    onPress={() => {
                        this.props.navigation.navigate('HomeTabContainer');
                    }}>

                    <Text style={styles.noFollowButtonText}>
                        Browse Popular Fashion icons
                    </Text>

                </TouchableOpacity>
            </View>
        );
    }

    _renderFollowingList() {
        return (

            <FlatList
                data={this.state.followingList}
                keyExtractor={(item, index) => item.key.toString()}
                renderItem={this._renderItem.bind(this)}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.2}

            />
        );
    }

    _renderItem({item, index}) {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('HomeTabContainer');
            }}>
                <View style={styles.followItemView}>

                    <Image
                        source={{uri: item.value.avatar_local_path}}
                        style={styles.avatarImage}
                        imageStyle={{borderRadius: 20}}
                    />
                    <View
                        style={styles.followInfoView}
                    >
                        <Text
                            style={styles.nameText}
                        >
                            {item.value.display_name}
                        </Text>


                        <Text
                            style={styles.followNumberText}
                        >
                            {item.value.follower_count} Followers

                        </Text>
                    </View>

                    <Text
                        style={styles.stylesNumberText}>
                        {item.value.follower_count} Styles
                    </Text>

                </View>

                <View style={styles.itemSeparationLine}/>
            </TouchableOpacity>
        );
    }

    _renderFooter() {

        let addFootView = <View
            style={styles.footer}/>;

        if (this.state.isLoading) {
            return (
                <View>
                    <View style={styles.footerLoading}>
                        <ActivityIndicator/>
                        <Text style={styles.footerText}>
                            Loading...
                        </Text>
                    </View>

                    {addFootView}
                </View>
            );
        }
        else {
            return (
                <View>
                    {addFootView}
                </View>
            );
        }
    }

    _onEndReached() {

        let loadTime = (new Date()).getTime() - this.loadTime
        if (loadTime < 1000) return
        if (this.state.isEnd || this.state.isLoading) {
            return;
        }
        pageNo++;
        this._getMyFollowing(pageNo);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    noFollowItemView: {
        alignSelf: 'center',
        flexDirection: 'column'
    },

    warnImage: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 150
    },

    noFollowText: {
        marginTop: 15,
        alignSelf: 'center',
        fontSize: 16,
        color: 'black'
    },

    noFollowTipText: {
        marginTop: 5,
        alignSelf: 'center',
        fontSize: 14
    },

    noFollowButton: {
        height: 35,
        width: 247,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#262728',
        marginTop: 33,
    },

    noFollowButtonText: {
        fontSize: 15,
        color: '#ffffff',
    },

    followItemView: {
        flexDirection: 'row',
        height: 68,
        paddingLeft: 23,
        paddingRight: 23,
    },
    avatarImage: {
        borderRadius: 20,
        height: 40,
        width: 40,
        alignSelf: 'center',
    },
    followInfoView: {
        flexDirection: 'column',
        marginLeft: 15,
        flex: 1
    },

    nameText: {
        fontWeight: '400',
        fontSize: 16,
        color: '#000000',
        marginTop: 15
    },

    followNumberText: {
        fontSize: 14,
        color: '#B5B7B6',
        marginTop: 3
    },

    stylesNumberText: {
        fontSize: 14,
        color: '#B5B7B6',
        marginTop: 18,
        marginLeft: 10,
    },

    itemSeparationLine: {
        height: 1,
        backgroundColor: '#EAEAEA',
        marginRight: 23,
        marginLeft: 23,
    },

    footer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        height: 30
    },
    footerLoading: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    footerText: {
        color: '#999999',
        fontSize: 14,
    },
});

export default MyFollowing;
