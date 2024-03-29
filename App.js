import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Root } from 'native-base';
import Router from './src/router/index';

export default class App extends Component {
  render() {
    return (
      <Root>
        <Router/>
      </Root>
    )
  }
}
