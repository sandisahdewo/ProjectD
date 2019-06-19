import React, {Component} from 'react';
import { View } from 'react-native';

class RowHeader extends Component {

  render() {
    return (
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', margin:4}}>
        {this.props.children}
      </View>
    )
  }
}

export default RowHeader;