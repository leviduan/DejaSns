import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logIn, skipLogin, logOut} from '../actions/userAction';
import NavigationService from "../../utils/NavigationService";

class LookBookHeader extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    follow: PropTypes.bool.isRequired
  };

  render() {
    let {imageUrl, name, follow} = this.props;
    return (
      <View style={styles.headerView}>
        <View style={styles.leftView}>
          <TouchableOpacity
            style={styles.iconTouchView}
            activeOpacity={0.5}
            onPress={this._goIconDetailPage}>
            <Image style={styles.iconView}
                   source={{uri: imageUrl}}/>
            <Text style={styles.nameView} numberOfLines={1}>
              {name}
            </Text>
          </TouchableOpacity>

          <Text style={styles.dotView}> {" · "}</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this._handleFollow}>
            <Text style={follow ? styles.followView : styles.followedView}>
              {follow ? "follow" : "followed"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this._handleMoreTapped}>
          <Image style={styles.moreView}
                 source={require('../../img/more.png')}/>
        </TouchableOpacity>
      </View>
    );
  }

  _goIconDetailPage = () => {
    console.log("_gotoIconDetailPage");
    NavigationService.navigate('Influencer', { rn_account_id: 'Lucy' });
  };

  _handleFollow = () => {
    this.props.dispatch(logOut());
  };

  _handleMoreTapped = () => {
    this.props.dispatch(logOut());
  };
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftView: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconTouchView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  iconView: {
    width: 44,
    height: 44,
    alignSelf: 'center',
    borderRadius: 22,
    backgroundColor: '#EAEAEA'
  },
  nameView: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#262729',
    maxWidth: 110,
  },
  dotView: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#262729',
    marginRight: 6,
  },
  followView: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#262729',
    backgroundColor: '#EA0000'
  },
  followedView: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B5B6B7',
  },
  moreView: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
});

// redux connect
const mapStateToProps = (state, ownProps) => ({
  text: JSON.stringify(state.userStore)
});

export default connect(
  mapStateToProps
)(LookBookHeader)
