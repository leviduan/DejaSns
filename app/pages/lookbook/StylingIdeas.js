import React from 'react';
import {View, Text,    StyleSheet, FlatList, Image, NativeEventEmitter, NativeModules, DeviceEventEmitter} from 'react-native';
import LookBookCell from './View/LookBookCell'
let nativeBridge = NativeModules.BridgeModule;
const DejaEventEmitter = new NativeEventEmitter(nativeBridge);

export default  class StylingIdeas extends React.Component {
  static navigationOptions = {
    title: 'Lookbook',
    tabBarIcon: ({focused, tintColor}) => (
      <Image
        source={focused ? require('../../img/ic_home_lookbook_focused.png')
          : require('../../img/ic_home_lookbook_normal.png')}
        style={{width: 24, height: 23, tintColor: tintColor}}
      />
    )
  };

  constructor(props) {
    super(props);


  }

  componentDidMount() {
    // this.subscription = DejaEventEmitter.addListener('appsflyerConversion', (e: Event) => {
    //     alert(e)
    // });
  }

  componentWillUnmount() {
    // this.subscription.remove();
  }

  render() {
    // debugger;
    return (
      <View style={styles.containerFlex}>
        <View style={styles.navigationBar}>
        </View>
        <FlatList
          data={[{key: 'a'}, {key: 'b'},{key: 'c'}, {key: 'd'},{key: 'e'}, {key: 'f'}]}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={(data, index) => (
            {length: 226, offset: 226 * index, index}
          )}
        >
        </FlatList>
      </View>
    );
  }

  _keyExtractor = (item, index) => item.key;

  _renderItem = ({item}) => (
    <LookBookCell style={styles.itemView}/>
  );

}

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  navigationBar: {
    backgroundColor: '#262729',
    height: 106,
  },
  imageViewBackgroundColor: {
    backgroundColor: '#EAEAEA',
  },
  bigImage: {
    width: '100%',
    height: 375,
    alignSelf: 'center',
    backgroundColor: '#EAEAEA',
  },
  itemColumn: {
    marginRight: 10,
    marginLeft: 10,
  },
  itemView: {
    width: 375,
    height: 375,
  },

  itemLikeSeparateLine: {
    width: 1,
    height: 20,
    alignSelf: 'center',
    backgroundColor: '#F2F2F2',
    justifyContent: 'center'
  },
  itemLikeButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },



  bigImageSource: {
    position: 'absolute',
    fontSize: 12,
    color: '#B5B7B6',
    alignSelf: 'flex-end',
    right: 9,
    marginTop: 350,
  },
  footerNoMore: {
    color: '#999999',
    fontSize: 14,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

  footerLoading: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  textLoading: {
    color: '#999999',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#262729',
    marginTop: 16,
  },
  textName: {
    color: '#262729',
    fontSize: 14,
    marginLeft: 13.5,
    marginRight: 13.5,
  },
  textOriginalPrice: {
    color: '#B5B7B6',
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  textCurrentPrice: {
    color: '#F81F34',
    fontSize: 14,
  },

  viewPrice: {
    flexDirection: 'row',
    marginLeft: 13.5,
  },
});
