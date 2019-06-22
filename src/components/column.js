import React, {Component} from 'react';
import { View } from 'react-native';

class Column extends Component {

  render() {
    let justifyContent = (this.props.justifyContent) ? this.props.justifyContent : 'space-between';
    return (
			<View style={[{flex:1, flexDirection:'column', justifyContent:justifyContent}, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

export default Column;