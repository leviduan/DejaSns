import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';

import InfluencerHeader from "../../redux/components/InfluencerHeader";
import {connect} from "react-redux";
import {sendInfluencerNetTask} from "../../redux/actions/influencerAction";

let pageNo = 0;
let rn_account_id = 0;

class Influencer extends React.Component {

  componentDidMount() {
    if (this.props.navigation.state.params !== undefined && this.props.navigation.state.params.rn_account_id !== undefined) {
      rn_account_id = this.props.navigation.state.params.rn_account_id;
    }
    this.getLooksIdeas(0)
  }

  getLooksIdeas(pageNo) {
    let params = {
      accountId: 982,
      'pageNum': pageNo,
      'pageSize': 20
    };

    this.props.dispatch(sendInfluencerNetTask(params));
  }

  render() {
    return (
      <View style={styles.listView}>
        <FlatList
          data={this.props.street_snap_list}
          numColumns={2}
          columnWrapperStyle={styles.itemColumn}
          onEndReachedThreshold={0.1}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader.bind(this)}
          ListFooterComponent={this._renderFooter.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          keyExtractor={(item, index) => index}
        >
        </FlatList>
      </View>
    );
  }

  _renderHeader() {
    return (
      <InfluencerHeader
        imageUrl={"https://avatars1.githubusercontent.com/u/1439939?v=3&s=460"}
        name={"liushishi"}
        follow={false}
      />
    );
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {

      }}>
        <Image
          source={{uri: item.image.image_url}}
          style={styles.itemImage}
        />
      </TouchableOpacity>
    );
  };

  _renderFooter() {
    return (
      <View style={styles.footerLoading}/>
    );
  }

  _updateFollowStatus() {

  }

  _onEndReached() {
    // pageNo++;
    // this.getLooksIdeas(pageNo);
  }
}

// redux connect
const mapStateToProps = (state, ownProps) => ({
  street_snap_list: state.influencerStore.street_snap_list,
  is_page_end: state.influencerStore.is_page_end,
});

export default connect(
  mapStateToProps
)(Influencer)


const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  followButton: {
    backgroundColor: "#252629",
    marginTop: 10,
    height: 30,
    width: 80,
    padding: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  itemColumn: {
    marginRight: 10,
    marginLeft: 10,
  },
  itemView: {
    width: 170,
    marginTop: 10,
    marginBottom: 10
  },
  itemImage: {
    backgroundColor: '#EAEAEA',
    width: (gScreen.screenWidth - 53) / 2,
    height: (gScreen.screenWidth - 53) / 4 * 3,
    alignSelf: 'center',
  },
  headerSource: {
    height: 230,
  },
  descText: {
    textAlign: 'center',
    fontSize: 15,
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
  footerNoMore: {
    color: '#999999',
    fontSize: 14,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
});