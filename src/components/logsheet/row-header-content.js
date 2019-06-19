import React, {Component} from 'react';
import { View, Text } from 'react-native';

class RowHeaderContent extends Component {

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <Text style={{fontSize:12, fontWeight:'bold', color:'black'}}>{this.props.title}</Text>
        <Text style={{fontSize:14, color:'black'}}>{this.props.content}</Text>
      </View>
    )
  }
}

export default RowHeaderContent;

