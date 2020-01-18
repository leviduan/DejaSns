import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableHighlight
} from 'react-native';
import * as DejaApi from "../../net/DejaApi";

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

export default class DejaFavouriteLooksPage extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: 'Favourite Looks',
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
        };
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
            this.setState({
                data: this.state.data.concat(responseData.movies),
                loaded: true,
            })
        })
    }

    render() {
        if (!this.state.loaded) {
          return this.renderLoadingView();
        }
    
        return (
            <SafeAreaView style={styles.container}>
            <FlatList 
                data = {this.state.data}
                renderItem = {this.renderPic}
                style = {styles.list}
                keyExtractor = {item => item.id}
                ItemSeparatorComponent={this.renderSeparator}
                numColumns ={2}
                // columnWrapperStyle={{ borderWidth: 2, borderColor: 'black' }}
            />
            </SafeAreaView>
        )
    }

    renderPic = ({ item }) => {

      let randomColor = () => {
        var r = Math.floor(Math.random() * 256)
        var g = Math.floor(Math.random() * 256)
        var b = Math.floor(Math.random() * 256)
        return `rgba(${r},${g},${b},0.5)`
      }

      const colorStyles = {
        backgroundColor: randomColor()
      }

      return (
          <View style={styles.containerItem}>
          <TouchableHighlight
            onPress = {() => this._onPress(item)}>
          <Image
            source={{uri: item.posters.thumbnail}}
            style={[styles.thumbnail, colorStyles]}
          />
          </TouchableHighlight>
          </View>
        )
      }

    renderLoadingView() {
        return (
            <View style= {styles.container}>
                <Text>
                Loading data......
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EAEAEA',
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    containerItem: {
        // flex: 1,
        width: 130,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        padding: 20,
    },
    thumbnail: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 120,
      height: 140,
    },
    list: {
      display: 'flex',
      flex: 1,
      paddingTop: 10,
      backgroundColor: '#EAEAEA',
    }
  })