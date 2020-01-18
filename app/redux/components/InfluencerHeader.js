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

class InfluencerHeader extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    follow: PropTypes.bool.isRequired
  };

  render() {
    let {imageUrl, name, follow} = this.props;
    return (
      <View style={styles.headerView}>
        <Image
          style={styles.avatarImage}
          source={{uri: imageUrl}}/>

        <Text style={styles.nameView}>
          {name}
        </Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.followButton}
          onPress={() => {
            this._handleFollow()
          }}>
          <Text style={follow ? styles.followView : styles.followedView}>
            {follow ? "follow" : "followed"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _handleFollow = () => {
    this.props.dispatch(logOut());
  };
}

const styles = StyleSheet.create({
  headerView: {
    height: 230,
    flexDirection: 'column',
    alignItems: 'center',
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
    marginLeft: 23,
  },
  avatarImage: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  nameView: {
    textAlign: 'center',
    lineHeight: 40,
    color: '#262729',
    height: 40,
    fontSize: 20,
  },
  followButton: {

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
    color: '#262729',
  },
});

// redux connect
const mapStateToProps = (state, ownProps) => ({
  text: JSON.stringify(state.userStore)
});

export default connect(
  mapStateToProps
)(InfluencerHeader)
