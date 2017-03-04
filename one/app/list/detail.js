/**
 * Created by chenjinxin on 2017/2/27.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import request from '../common/request';
import config from '../config';
import Video from 'react-native-video';




class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.row,
      rate: 1,
      muted: false,
      resizeMode: 'content',
      repeat: false,
      videoLoaded: false,
      videoProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,
      playing: false,
      paused: false
    };

    this._backToList = this._backToList.bind(this);
    this._onProgress = this._onProgress.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._pause = this._pause.bind(this);
    this._resume = this._resume.bind(this);
  }

  _backToList () {
    this.props.navigator.pop()
  }

  _onLoadStart() {

  }
  _onLoad() {

  }
  _onProgress(data) {
    if (!this.state.videoLoaded) {
      this.setState({
        videoLoaded : true
      })
    }

    let duration = data.playableDuration;
    let currentTime = data.currentTime;
    let percent = Number((currentTime / duration).toFixed(2));

    this.setState({
      playing: true,
      videoTotal: duration,
      currentTime: Number(data.currentTime.toFixed(2)),
      videoProgress: percent
    })
  }
  _onEnd() {
    this.setState({
      videoProgress: 1,
      playing: false,
    })
  }
  _onError() {

  }

  _rePlay() {
    this.refs.videoPlayer.seek(0)
  }

  _pause() {
    if (!this.state.paused) {
      this.setState({
        paused: true
      })
    }

  }

  _resume() {
    if (this.state.paused) {
      this.setState({
        paused: false
      })
    }
  }



  render() {
    let data = this.props.row;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>详情页面</Text>
        </View>
        <View style={styles.videoBox}>
          <Video
            ref='vodeoPlayer'
            source={{uri:'http://objheplwd.bkt.clouddn.com/test.mp4' }}
            style={styles.video}
            volume={2}
            paused={this.state.paused}
            rate={this.state.rate}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            repeat={this.state.repeat}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onProgress={this._onProgress}
            onEnd={this._onEnd}
            onError={this._onError}
            />

          {
            !this.state.videoLoaded && <ActivityIndicator color='#ee735c' style={styles.loding}/>
          }
          {
            this.state.videoLoaded && !this.state.playing
              ? <Icon
                onPress={this._rePlay}
                name='ios-play'
                style={styles.playIcon}
                size={50}
                />
              : null
          }

          {
            this.state.videoLoaded && this.state.playing
            ? <TouchableOpacity onPress={this._pause} style={styles.pasueBtn} >
                {
                  this.state.paused
                    ? <Icon
                      onPress={this._resume}
                      name='ios-play'
                      style={styles.resumeIcon}
                      size={50}
                    />
                    : <Text></Text>
                }
              </TouchableOpacity>
            : null
          }


          <View style={styles.progressBox}>
            <View style={[styles.progressBar, {width: width * this.state.videoProgress}]}>

            </View>
          </View>
        </View>
      </View>
    )
  }
}
const width = Dimensions.get('window').width;

let styles = StyleSheet.create({
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
  container: {
    backgroundColor: '#f5fcff'
  },
  viedoBox: {
    width: width,
    height: 360,
    backgroundColor:'#000'
  },
  video: {
    width: width,
    height: 360,
    backgroundColor: '#000'
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 140,
    width: width,
    alignSelf: 'center',
    backgroundColor:'transparent'
  },
  progressBox: {
    width: width,
    height: 2,
    backgroundColor: '#ccc',
  },

  progressBar: {
    width: 1,
    height: 2,
    backgroundColor: '#666'
  },
  playIcon: {
    position: 'absolute',
    top: 140,
    right: width / 2 - 30,
    width: 60,
    height:60,
    paddingTop:12,
    paddingLeft: 20,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderRadius: 23,
    borderWidth: 1,
    color: '#ed7b66'
  },

  pasueBtn: {
    width: width,
    height: 350
  },
  resumeIcon: {
    width: 60,
    height:60,
    paddingTop:12,
    paddingLeft: 20,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderRadius: 23,
    borderWidth: 1,
    alignSelf: 'center',
    color: '#ed7b66'
  },
});

export default Detail;