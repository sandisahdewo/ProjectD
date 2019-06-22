import React, {Component} from 'react';
import { Card, CardItem, Text } from 'native-base';

class ListContent extends Component {

  render() {
    return (
			<Card>
        <CardItem header bordered>
          <Text style={{fontSize:22, fontWeight:'bold', color:'black'}}>{this.props.title}</Text>
        </CardItem>
      </Card>
    )
  }
}

export default ListContent;