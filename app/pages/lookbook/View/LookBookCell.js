import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  Button, StyleSheet,
} from 'react-native'

import LookBookHeader from "../../../redux/components/LookBookHeader";
import LookBookFooter from "./LookBookFooter";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class LookBookCell extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  };

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <LookBookHeader imageUrl={ this.props.look_book.street_snap.street_snap_account_detail.avatar}
                        name={this.props.look_book.street_snap.street_snap_account_detail.name}
                        follow={false}
        />
        <Image
          style={styles.snapView}
          source={{uri: this.props.look_book.street_snap.image_info.image_url}}/>
        <LookBookFooter like={false}/>
        <View style={styles.grayView}/>
      </View>
    )
  }
}

// redux connect
const mapStateToProps = (state, ownProps) => ({
  look_book: state.lookBookStore.look_book_list[ownProps.index],
});

export default connect(
  mapStateToProps
)(LookBookCell)


const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#FFF999',
    marginTop: 30,
  },
  snapView: {
    width: 375,
    height: 375,
    alignSelf: 'center',
    backgroundColor: '#EAEAEA',
  },
  grayView : {
    height: 10,
    backgroundColor: '#EAEAEA',
  }
});

