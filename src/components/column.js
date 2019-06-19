import React, {Component} from 'react';
import { View } from 'react-native';

class Column extends Component {

  render() {
    return (
			<View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
        {this.props.children}
      </View>
    )
  }
}

export default Column;