import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import LookBookCell from './View/LookBookCell'
import {connect} from "react-redux";
import {sendLookBookNetTask} from '../../redux/actions/lookbookAction';
import PropTypes from "prop-types";

class Lookbook extends React.Component {
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

  static propTypes = {
    look_book_list: PropTypes.array.isRequired,
    is_page_end: PropTypes.bool.isRequired
  };

  componentDidMount() {
    let params = {
      page: 0,
    };

    this.props.dispatch(sendLookBookNetTask(params));
  }

  render() {
    return (
      <View style={styles.containerFlex}>
        <View style={styles.navigationBar}>
        </View>
        <FlatList
          data={ this.props.look_book_list }
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

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item, index}) => {
    if (item.type === 10) {
      return (
        <LookBookCell
          style={styles.itemView}
          index={index}
          type={10}
        />
      );
    }
    else {
      return (
        <View style={styles.followListCell}/>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  look_book_list: state.lookBookStore.look_book_list,
  is_page_end: state.lookBookStore.is_page_end,
});

export default connect(
  mapStateToProps
)(Lookbook)


const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  navigationBar: {
    backgroundColor: '#262729',
    // height: 106,
    height: 0,
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

  followListCell: {
    width: 375,
    height: 375,
    backgroundColor: '#EA00EA',
  },
});
