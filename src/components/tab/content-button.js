import React, {Component} from 'react';
import { Card, CardItem, Body, Text, Button } from 'native-base';

class TabContentButton extends Component {

  render() {
    return (
      <Button style={{paddingHorizontal:40}} bordered dark>
        <Text style={{fontWeight:'bold', fontSize:14, color:'black'}} onPress={this.props.onPress}>{this.props.text}</Text>
      </Button>
    )
  }
}

export default TabContentButton;