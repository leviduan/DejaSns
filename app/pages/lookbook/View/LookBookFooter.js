import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

export default class LookBookFooter extends Component {
  static propTypes = {
    like: PropTypes.bool.isRequired
  };

  render(){
    let {like} = this.props;
    return (
      <View style={styles.footerView}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={ this._goLike }>
          <Image style={styles.likeView}
                 source={like ? require('../../../img/ic_detail_haslike.png')
                   : require('../../../img/feedstab_heart.png')}/>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={ this._goShare }>
          <Image style={styles.shareView}
                 source={require('../../../img/ic_look_book_share.png')}/>
        </TouchableOpacity>
      </View>
  );
  }

  _goShare = () => {
    console.log("_goShare");
  };

  _goLike = () => {
    console.log("_goLike");
  };
}

const styles = StyleSheet.create({
  footerView: {
    height: 60,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  likeView: {
    width: 35,
    height: 30,
    marginLeft: 20,
    marginRight: 23,
  },
  shareView: {
    width: 30,
    height: 26,
  },
});
