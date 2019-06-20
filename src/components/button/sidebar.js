import React, {Component} from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { Icon } from 'native-base';
import Vline from '../line';

class BtnSidebar extends Component {

  render() {
    return (
			<View>
				<TouchableWithoutFeedback onPress={this.props.onPress}>
					<View style={{flex:1, flexDirection:'row', marginVertical:5, paddingHorizontal: 5}}>
						<Icon name={this.props.iconName} type={this.props.iconType} style={{ fontSize:25, color:'#808080' }} />
						<Text style={{fontSize:18, marginLeft:15}}>{this.props.title}</Text>
					</View>
				</TouchableWithoutFeedback>
				<Vline/>
			</View>
    )
  }
}

export default BtnSidebar;