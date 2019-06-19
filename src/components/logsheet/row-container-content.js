import React, {Component} from 'react';
import { View, Text} from 'react-native';

class RowContainerContent extends Component {

  render() {
    return (
			<View style={{marginBottom:5}}>
        <Text style={{fontSize:14, fontWeight:'bold', color:'black'}}>{this.props.title}</Text>
        <Text style={{fontSize:12, color:'black'}}>{this.props.content}</Text>
      </View>
    )
  }
}

export default RowContainerContent;