import React, {Component} from 'react';
import { Card, CardItem, Text } from 'native-base';

class TabContent extends Component {

  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text style={{fontSize:22, fontWeight:'bold', color:'black'}}>{this.props.title}</Text>
        </CardItem>
        <CardItem bordered>
          {this.props.children}
        </CardItem>
      </Card>
    )
  }
}

export default TabContent;