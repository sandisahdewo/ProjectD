import React, {Component} from 'react';
import { View, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { ListItem } from 'react-native-elements';

export default class Index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableHighlight onPress={() => navigation.openDrawer() }>
          <View style={{marginLeft: 15}}>
            <Icon name="ios-menu" size={28} style={{ color:'white' }}/>
          </View>
        </TouchableHighlight>
      ),
    }
	};
	
	list = [
		{
			title: 'Pitstop Sarana 1',
      action: 'ApprovalPitstopSaranaIndex',
      params: { pitstopSaranaNomor:1 }
		},
		{
			title: 'Pitstop Sarana 2',
      action: 'ApprovalPitstopSaranaIndex',
      params: { pitstopSaranaNomor:2 }
		},
	];

	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => (
		<ListItem
			title={item.title}
			titleStyle={{color:'#808080'}}
			containerStyle={{borderBottomColor:'black', borderBottomWidth:0.5, marginHorizontal:4}}
			onPress={() => this.props.navigation.navigate(`${item.action}`, item.params)}
			rightIcon={
				<Icon name="angle-right" type='FontAwesome5' size={20} style={{ color:'#808080' }}/>
			}
		/>
	)

  render() {
    return (
      <Container>
        <Content>
					<FlatList
						keyExtractor={this.keyExtractor}
						data={this.list}
						renderItem={this.renderItem}
					/>
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  tabContentBody: {
    flexDirection:'row', 
    justifyContent:'space-between'
  }
})