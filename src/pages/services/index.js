import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';

export default class Index extends Component {
  static navigationOptions = {
    drawerLabel: 'Tab',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button 
          title="Go to Tab"
          onPress={() => navigate('TabIndex')}
          ></Button>
          <Button 
          color="#ccc"
          title="Open Drawer"
          onPress={() => this.props.navigation.openDrawer()}
          ></Button>
      </View>
    );
  }
}
