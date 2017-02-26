/**
 * Created by chenjinxin on 2017/2/26.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import request from '../common/request';
import config from '../config';


let cachedResults = {
  nextPage: 1,
  items: [],
  total: 0
}

class List extends Component {
  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
      ]),
      isLoadingTail: false,
      isRefreshing: false
    };
  }
  renderRow(row) {
    return (
      <TouchableHighlight onPress={this._onPressButton}>
        <View style={styles.item}>
          <Text style={styles.title}>{row.title}</Text>
          <Image
            source={{uri: row.thumb}}
            style={styles.thumb}
          >
          <Icon
            name='ios-play'
            size={28}
            style={styles.play}
          />
          </Image>
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon
                name='ios-heart-outline'
                size={28}
                style={styles.up}
              />
              <Text style={styles.handleText}>喜欢</Text>
            </View>
            <View style={styles.handleBox}>
              <Icon
                name='ios-chatbubbles-outline'
                size={28}
                style={styles.commentIcon}
              />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData(page = 1){

    if (page !== 0) {
      this.setState({
        isLoadingTail: true
      })
    } else {

    }
    request.get(config.api.base + config.api.creations, {
      accessToken: 'abc',
      page: page
    })
      .then(data => {
        if(data.success) {
          let items = cachedResults.items.slice();

          if (page !==0 ) {
            items = items.concat(data.data);
            cachedResults.nextPage += 1;
          } else {
            items = data.data.concat(items);
          }

          cachedResults.items = items;
          cachedResults.total = data.total;
          setTimeout(() => {
            if (page !== 0) {
              this.setState({
                dataSource:this.state.dataSource.cloneWithRows(cachedResults.items),
                isLoadingTail: false
              })
            } else {
              this.setState({
                dataSource:this.state.dataSource.cloneWithRows(cachedResults.items),
                isRefreshing: false
              })
            }

          }, 40)

        }
      })
      .catch((error) => {
        if (page !== 0) {
          this.setState({
            isLoadingTail: false
          });
        } else {
          this.setState({
            isRefreshing: false
          });
        }

        console.warn(error);
      })
  }



  _fetchMoreData() {
    if (!this._hasMore() || this.state.isLoadingTail) {
      return
    }

    let page = cachedResults.nextPage;
    this._fetchData(page)
  }

  _hasMore() {
    return cachedResults.items.length !== cachedResults.total
  }

  _renderFooter() {
    if (!this._hasMore() && cachedResults.total !== 0) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      )
    }

    if (!this.state.isLoadingTail) {
      return  <View style={styles.loadingMore} />
    }

    return (
      <ActivityIndicator
        animating={true}
        style={styles.loadingMore}
      />
    )

  }

  // 下拉刷新函数
  _onRefresh() {
    if (!this._hasMore() || this.state.isRefreshing) {
      return
    }

    this.setState({
      isRefreshing: true
    });

    this._fetchData(0)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this._renderFooter.bind(this)}
          enableEmptySections={true}
          onEndReached={this._fetchMoreData.bind(this)}
          onEndReachedThreshold={20}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor='#ff0000'
              title='Loading...'
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }
          automaticallyAdjustContentInsets={false}
        />
      </View>
    )
  }
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#f5fcff'
  },
  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  item: {
    width: screenWidth,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  thumb: {
    width: screenWidth,
    height: screenWidth * 0.5,
    resizeMode: 'cover'
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },
  handleBox:{
    padding: 10,
    flexDirection: 'row',
    width: screenWidth / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  play: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 46,
    height:46,
    paddingTop:9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderRadius: 23,
    borderWidth: 1,
    color: '#ed7b66'
  },
  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },
  up:{
    fontSize: 22,
    color: '#333'
  },
  commentIcon: {
    fontSize: 22,
    color: '#333'
  },
  loadingMore: {
    marginVertical: 20
  },
  loadingText: {
    color: '#777',
    textAlign: 'center'
  }
});

export default List;