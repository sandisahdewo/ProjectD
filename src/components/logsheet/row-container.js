import React, {Component} from 'react';
import { View } from 'react-native';

class RowContainer extends Component {

  render() {
    return (
			<View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flex:1, flexDirection:'column', paddingRight:15}}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default RowContainer;