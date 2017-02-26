/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import List from './app/list/list';
import Edit from './app/edit/edit';
import Account from './app/account/account';

export default class one extends Component {
  constructor(){
    super();
    this.state = {
      selectedTab: 'find'
    };
  }
  render() {
    return (
      <TabBarIOS
        tintColor="#ee735c">
        <Icon.TabBarItem
          iconName='ios-videocam-outline'
          selectedIconName='ios-videocam'
          selected={this.state.selectedTab == 'find'}
          onPress={() => {
          this.setState({
            selectedTab: 'find',
          });
        }}>
          <List ></List>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-recording-outline'
          selectedIconName='ios-recording'
          selected={this.state.selectedTab == 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list'
            });
        }}>
          <Edit ></Edit>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-more-outline'
          selectedIconName='ios-more'
          selected={this.state.selectedTab == 'account'}
            onPress={() => {
            this.setState({
              selectedTab: 'account'
            });
        }}>
          <Account ></Account>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('one', () => one);
