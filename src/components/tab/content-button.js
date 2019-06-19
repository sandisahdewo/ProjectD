import React, {Component} from 'react';
import { Button } from 'react-native-elements';

class TabContentButton extends Component {

  render() {
    return (
      <Button 
        buttonStyle={{paddingHorizontal:40, borderColor:'black'}}
        title={this.props.text} 
        type="outline" 
        onPress={this.props.onPress}
        titleStyle={{color:'black'}}
      />
    )
  }
}

export default TabContentButton;