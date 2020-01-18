import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Share,
    Platform,
    Linking,
} from 'react-native';
import * as DejaApi from "../../net/DejaApi";
import * as UIUtil from "../../utils/UIUtil";
import Global from '../../utils/Global';
import Toast from "../../utils/ToastProxy";
import Swiper from 'react-native-swiper';

let pageNo = 0;
let _this = null;
let sharePage = "http://www.deja.fashion/product_share/index.html?product_id=";

class ProductDetails extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: navigation.getParam('itemName', ''),
            headerLeft: (
                <TouchableOpacity
                    style={{height: 30, justifyContent: 'center'}}
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Image
                        source={require('../../img/ic_back.png')} style={{
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

            headerRight: (
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        style={{height: 30, justifyContent: 'center'}}
                        onPress={() => {
                            {
                                if (Platform.OS === 'android') {
                                    _this._shareMessage()
                                }else
                                {
                                    _this._shareText()
                                }
                            }
                        }}>
                        <Image
                            source={require('../../img/ic_product_detail_share.png')} style={{
                            height: 15,
                            width: 18,
                            marginRight: 23
                        }}
                        />
                    </TouchableOpacity>
                </View>
            ),
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            currentShopItemId: "",
            currentShopItemIndex: 0,
            shopItems: [],
            isLoading: false,
            isEnd: true,
            display: 'none',
            descriptionDisplay: 'none',
            sizeDisplay: 'none',
            compositionDisplay: 'none',
            deliveryDisplay: 'none',
        };
    }

    componentDidMount() {
        pageNo = 0;
        _this = this;
        this._getProductDetail(pageNo);
    }


    _getProductDetail(pageNo) {

        this.loadTime = (new Date()).getTime()
        if (pageNo === 0) {
            UIUtil.showLoading();
        }

        this.setState({isLoading: true});
        // "5780690","uniqlo_414194"
        // "5779361","topshop_27N09QBLK"
        // "5779951","boohoo_DZZ94561"

        DejaApi.getItemDetails(this.props.navigation.state.params.shopItemId,
            this.props.navigation.state.params.shopItemGroupId, (response) => {
            if (response.data.ret === 0 && response.data.data !== null) {

                this.setState({
                    currentShopItemId: response.data.data.currently_shop_item_id,
                    shopItems: response.data.data.shop_items,
                }, () => {
                });

                this._onPressProductColorItem(response.data.data.currently_shop_item_id)

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
            <SafeAreaView style={[styles.container, {display: this.state.display}]}>

                {this.state.shopItems.length > 0 ? this._renderProductDetails() : null}

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 55,
                    width: '100%'
                }}>

                    <TouchableOpacity
                        style={{
                            height: 55,
                            width: 101,
                            backgroundColor: "#FAFAFA",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => {

                        }}>
                        <Image
                            source={require('../../img/ic_detail_haslike.png')} style={{
                            height: 19.5,
                            width: 23,
                        }}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{
                            height: 55,
                            flex: 1,
                            backgroundColor: "#262729",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            Linking.canOpenURL('dejafashion://').then(supported => {
                                if (supported) {
                                    Linking.openURL('dejafashion://');
                                } else {
                                    Linking.openURL("https://dejafashion.onelink.me/K3CV");
                                }
                            });

                        }}>
                        <Text
                            style={{
                                color: '#ffffff',
                                fontSize: 16,
                                fontWeight: '400',
                            }}>Shop Now</Text>
                    </TouchableOpacity>


                </View>

            </SafeAreaView>
        );
    }

    _renderProductDetails() {
        return (
            <FlatList
                numColumns={2}
                columnWrapperStyle={{
                    marginRight: 10,
                    marginLeft: 10,
                }}
                data={this.state.shopItems}
                keyExtractor={(item, index) => item.shop_item_id.toString()}
                renderItem={this._renderItem.bind(this)}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.2}

            />
        );
    }

    _renderHeader = () => (
        <View>
            {this.state.shopItems.length > 0 ? this._renderProductPicture() : null}
            {this.state.shopItems.length > 0 ? this._renderProductColors() : null}
            {this.state.shopItems.length > 0 ? this._renderProductInfo() : null}
        </View>
    );


    _renderProductPicture() {
        let productPictures = [];
        this.state.shopItems[this.state.currentShopItemIndex].images.forEach(function (item) {

            productPictures.push(<View key={item.image_url}>
                <Image
                    source={{uri: item.image_url}}
                    style={{
                        width: gScreen.screenWidth,
                        height: gScreen.screenWidth * 400 / 375,
                        alignSelf: 'center',
                        backgroundColor: '#EAEAEA'
                    }}
                />
            </View>)

        });

        return (
            <Swiper
                style={{height: gScreen.screenWidth * 400 / 375}}
                width={gScreen.screenWidth}
                activeDot={<View style={{
                    backgroundColor: '#000000',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    bottom: gScreen.screenWidth * 400 / 375 - 50,
                }}/>}
                dot={<View style={{
                    backgroundColor: '#000000',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    justifyContent: 'center',
                    bottom: gScreen.screenWidth * 400 / 375 - 50,

                }}>
                    <View style={{
                        backgroundColor: '#ffffff',
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        alignSelf: 'center',
                    }}/>
                </View>}
            >
                {productPictures}
            </Swiper>
        )
    }

    _renderProductColors() {
        return (
            <View style={{width: '100%', height: 50, backgroundColor: 'rgba(256,256,256,0) ', bottom: 50}}>
                <FlatList
                    data={this.state.shopItems}
                    horizontal
                    extraData={this.state}
                    keyExtractor={(item, index) => item.shop_item_id.toString()}
                    renderItem={this._renderProductColorItem}
                    style={{
                        backgroundColor: '#ffffff',
                        opacity: 0.95
                    }}
                    showsHorizontalScrollIndicator={false}

                />
            </View>
        );
    }

    _renderProductColorItem = ({item, index}) => (
        <ProductColorItem
            id={item.shop_item_id}
            onPressItem={this._onPressProductColorItem}
            selected={this._isChosenColor(item.shop_item_id)}
            name={item.color}
            index={index}
        />
    );

    _isChosenColor = (id) => {
        if (this.state.currentShopItemId === id)
            return (true);
        return (false);
    }

    _onPressProductColorItem = (id) => {
        let i = 0;
        this.state.shopItems.forEach(function (item) {
            if (item.shop_item_id === id) {
                _this.setState({
                    currentShopItemId: id,
                    currentShopItemIndex: i,
                }, () => {

                });

                _this.props.navigation.setParams({itemName: item.shop_item_name})
            }
            i++;
        });
    };

    _renderProductInfo() {

        let current_price = 2700;
        let original_price = 5400
        let currency = "S$"

        return (
            <View style={{backgroundColor: 'withe', top: -40}}>
                {current_price < original_price && current_price > 0 ?
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 23,
                        alignItems: 'flex-end'
                    }}>
                        <Text
                            style={{
                                color: '#F81F34',
                                fontSize: 20,
                                fontWeight: '400',
                            }}>{currency} {(current_price / 100).toFixed(2)}</Text>
                        <Text
                            style={{
                                color: '#B5B7B6',
                                fontSize: 14,
                                textDecorationLine: 'line-through',
                                marginLeft: 10,
                            }}>{currency} {(original_price / 100).toFixed(2)}</Text>
                    </View>
                    :
                    <Text
                        style={{
                            color: '#262729',
                            fontSize: 20,
                            marginLeft: 23,
                            fontWeight: '400',
                        }}>{currency} {(original_price / 100).toFixed(2)}</Text>
                }

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 23,
                    marginTop: 6,
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: '#F81F34',
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                    }}/>
                    <Text
                        style={{
                            color: '#262729',
                            fontSize: 12,
                            marginLeft: 4,
                        }}>38% off</Text>

                    <View style={{
                        backgroundColor: '#F81F34',
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        marginLeft: 23,
                    }}/>
                    <Text
                        style={{
                            color: '#262729',
                            fontSize: 12,
                            marginLeft: 4,
                        }}>Deliver in 3 days</Text>
                </View>

                <View style={{
                    height: 1,
                    backgroundColor: '#EAEAEA',
                    marginRight: 23,
                    marginLeft: 23,
                    marginTop: 12,
                }}/>

                <TouchableOpacity
                    style={{height: 30, justifyContent: 'center', marginTop: 10}}
                    onPress={() => {

                    }}>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 23,
                        marginRight: 23,
                        alignItems: 'center',
                    }}>
                        <Text
                            style={{
                                color: '#262729',
                                fontSize: 15,
                                fontWeight: '400',
                            }}>Zara</Text>

                        <View style={{
                            flex: 1,
                        }}/>

                        <Image
                            source={require('../../img/ic_right_arrow.png')} style={{
                            height: 18,
                            width: 12,
                        }}
                        />
                    </View>
                </TouchableOpacity>


                <View style={{
                    height: 8,
                    backgroundColor: '#EAEAEA',
                    marginTop: 12,
                }}/>

                <TouchableOpacity
                    style={{height: 30, justifyContent: 'center', marginTop: 15}}
                    onPress={() => {
                        this.setState(previousState => ({
                            descriptionDisplay: previousState.descriptionDisplay === 'none' ? 'flex' : 'none',
                        }));
                    }}>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 23,
                        marginRight: 23,
                        alignItems: 'center',
                    }}>
                        <Text
                            style={{
                                color: '#262729',
                                fontSize: 15,
                            }}>Description </Text>

                        <View style={{
                            flex: 1,
                        }}/>

                        <Image
                            source={require('../../img/ic_right_arrow.png')} style={{
                            height: 18,
                            width: 12,
                            transform: [{rotate: this.state.descriptionDisplay === 'none' ? '0deg' : '90deg'}]
                        }}
                        />
                    </View>
                </TouchableOpacity>

                <Text
                    style={{
                        color: '#818181',
                        fontSize: 15,
                        marginLeft: 23,
                        marginRight: 23,
                        marginTop: 11,
                        display: this.state.descriptionDisplay
                    }}>Dress in flowing twill with macrame lace yoke featuring star-shapred pattern. Straight line,
                    round neck, short-sleeved. Visible metal zip on the back. </Text>

                <View style={{
                    height: 1,
                    backgroundColor: '#EAEAEA',
                    marginRight: 23,
                    marginLeft: 23,
                    marginTop: 20,
                }}/>


                <TouchableOpacity
                    style={{height: 30, justifyContent: 'center', marginTop: 15}}
                    onPress={() => {
                        this.setState(previousState => ({
                            sizeDisplay: previousState.sizeDisplay === 'none' ? 'flex' : 'none',
                        }));
                    }}>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 23,
                        marginRight: 23,
                        alignItems: 'center',
                    }}>
                        <Text
                            style={{
                                color: '#262729',
                                fontSize: 15,
                            }}>Size Guide</Text>

                        <View style={{
                            flex: 1,
                        }}/>

                        <Image
                            source={require('../../img/ic_right_arrow.png')} style={{
                            height: 18,
                            width: 12,
                            transform: [{rotate: this.state.sizeDisplay === 'none' ? '0deg' : '90deg'}]
                        }}
                        />
                    </View>
                </TouchableOpacity>

                <Text
                    style={{
                        color: '#818181',
                        fontSize: 15,
                        marginLeft: 23,
                        marginRight: 23,
                        marginTop: 11,
                        display: this.state.sizeDisplay
                    }}>Dress in flowing twill with macrame lace yoke featuring star-shapred pattern. Straight line,
                    round neck, short-sleeved. Visible metal zip on the back. </Text>

                <View style={{
                    height: 1,
                    backgroundColor: '#EAEAEA',
                    marginRight: 23,
                    marginLeft: 23,
                    marginTop: 20,
                }}/>


                <TouchableOpacity
                    style={{height: 30, justifyContent: 'center', marginTop: 15}}
                    onPress={() => {
                        this.setState(previousState => ({
                            compositionDisplay: previousState.compositionDisplay === 'none' ? 'flex' : 'none',
                        }));
                    }}>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 23,
                        marginRight: 23,
                        height: '100%',
                        alignItems: 'center',
                    }}>
                        <Text
                            style={{
                                color: '#262729',
                                fontSize: 15,
                            }}>Composition and Care</Text>

                        <View style={{
                            flex: 1,
                        }}/>

                        <Image
                            source={require('../../img/ic_right_arrow.png')} style={{
                            height: 18,
                            width: 12,
                            transform: [{rotate: this.state.compositionDisplay === 'none' ? '0deg' : '90deg'}]
                        }}
                        />
                    </View>
                </TouchableOpacity>

                <Text
                    style={{
                        color: '#818181',
                        fontSize: 15,
                        marginLeft: 23,
                        marginRight: 23,
                        marginTop: 11,
                        display: this.state.compositionDisplay
                    }}>Dress in flowing twill with macrame lace yoke featuring star-shapred pattern. Straight line,
                    round neck, short-sleeved. Visible metal zip on the back. </Text>

                <View style={{
                    height: 1,
                    backgroundColor: '#EAEAEA',
                    marginRight: 23,
                    marginLeft: 23,
                    marginTop: 20,
                }}/>

                <TouchableOpacity
                    style={{height: 30, justifyContent: 'center', marginTop: 15}}
                    onPress={() => {
                        this.setState(previousState => ({
                            deliveryDisplay: previousState.deliveryDisplay === 'none' ? 'flex' : 'none',
                        }));
                    }}>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 23,
                        marginRight: 23,
                        alignItems: 'center',
                    }}>
                        <Text
                            style={{
                                color: '#262729',
                                fontSize: 15,
                            }}>Delivery & Return</Text>

                        <View style={{
                            flex: 1,
                        }}/>

                        <Image
                            source={require('../../img/ic_right_arrow.png')} style={{
                            height: 18,
                            width: 12,
                            transform: [{rotate: this.state.deliveryDisplay === 'none' ? '0deg' : '90deg'}]
                        }}
                        />
                    </View>
                </TouchableOpacity>

                <Text
                    style={{
                        color: '#818181',
                        fontSize: 15,
                        marginLeft: 23,
                        marginRight: 23,
                        marginTop: 11,
                        display: this.state.deliveryDisplay
                    }}>Dress in flowing twill with macrame lace yoke featuring star-shapred pattern. Straight line,
                    round neck, short-sleeved. Visible metal zip on the back. </Text>

                <View style={{
                    height: 1,
                    backgroundColor: '#EAEAEA',
                    marginRight: 23,
                    marginLeft: 23,
                    marginTop: 20,
                }}/>

                <View style={{
                    height: 8,
                    backgroundColor: '#EAEAEA',
                    marginTop: 20,
                }}/>

                <Text
                    style={{
                        color: '#262729',
                        fontSize: 15,
                        fontWeight: '400',
                        marginLeft: 23,
                        marginTop: 20,
                    }}>Styling Ideas</Text>

            </View>
        )
    }

    _renderItem({item, index}) {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('HomeTabContainer');
            }}>
                <View style={{
                    width: UIUtil.screenW / 2 - 10,
                    marginTop: index > 1 ? 20 : -20
                }}>
                    <Image
                        source={{uri: item.images[0].image_url}}
                        style={{
                            width: UIUtil.screenW / 2 - 37,
                            height: (UIUtil.screenW / 2 - 37) * 4 / 3,
                            alignSelf: 'center',
                        }}
                    />

                </View>
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
        //this._getProductDetail(pageNo);
    }


    _shareMessage() {

        Share.share({
            title: 'Deja Fashion',
            message: sharePage + this.state.currentShopItemId,
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }

    _shareText() {
        Share.share({
            url: sharePage + this.state.currentShopItemId,
        })
            .then(this._showResult)
            .catch((error) => this.setState({share_result: 'error: ' + error.message}));
    }

    _showResult(result) {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({share_result: 'shared with an activityType: ' + result.activityType});

            } else {
                this.setState({share_result: 'shared'});
                Toast("'Shared'")
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({share_result: 'dismissed'});
            Toast("'Dismissed'")
        }
    }

}


class ProductColorItem extends React.PureComponent {

    render() {
        return (
            <TouchableOpacity activeOpacity={0.9}
                              style={{
                                  backgroundColor: "#252629",
                                  padding: 1,
                                  marginLeft: this.props.index === 0 ? 23 : 10,
                                  marginRight: this.props.index === _this.state.shopItems.length - 1 ? 23 : 0,
                                  marginTop: 10,
                                  height: 30
                              }}
                              onPress={() => {
                                  this.props.onPressItem(this.props.id)
                              }}>
                <View style={{
                    backgroundColor: this.props.selected ? "#262729" : "#FFFFFF",
                    paddingLeft: 10,
                    paddingRight: 10,
                    height: '100%',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: this.props.selected ? "#FFFFFF" : "#262729"
                    }}>
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
        backgroundColor: '#ffffff'
    },

    footer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        height: 30,
        marginBottom: 60,
    },

    footerLoading: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 60,
    },

    footerText: {
        color: '#999999',
        fontSize: 14,
    },
});

export default ProductDetails;
