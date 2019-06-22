import React, {Component} from 'react';
import { Button } from 'react-native-elements';

class BtnMd extends Component {

  render() {
    return (
			<Button title={this.props.title} style={this.props.style} buttonStyle={[this.props.buttonStyle]} titleStyle={[{fontSize:14}, this.props.titleStyle]} onPress={this.props.onPress} />
    )
  }
}

export default BtnMd;