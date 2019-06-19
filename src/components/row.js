import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';

class Row extends Component {

  render() {
    return (
			<View style={[styles.default,  this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  default: {
    flex:1, 
    flexDirection:'row', 
    justifyContent:'space-between'
  }
});

export default Row;