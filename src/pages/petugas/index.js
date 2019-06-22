import React, {Component} from 'react';
import { View, StyleSheet, TouchableHighlight, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Card, Icon, Text } from 'native-base';
import { Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

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

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <Card>
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('PetugasEdit')}>
        <View style={{flex:1, paddingHorizontal:10, paddingVertical:10}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'column', paddingRight:15}}>
              <View>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Nama</Text>
                <Text style={{fontSize:12}}>{item.nama}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal Lahir</Text>
                <Text style={{fontSize:12}}>{item.tanggal_lahir}</Text>
              </View>
            </View>
            <View style={{flexDirection:'column'}}>
              <View>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Alamat</Text>
                <Text style={{fontSize:12}}>{item.alamat}</Text>
              </View>
            </View>
          </View>

          <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', borderTopColor:'black', borderTopWidth:0.5, paddingTop:5}}>
            <View style={{flexDirection:'column'}}>
              {(item.status == 'active') &&
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                  <Icon name='checkmark' style={{fontSize:19, marginRight:10, color:'green'}} />
                  <Text style={{fontSize:14, color:'green'}}>Active</Text>
                </View>
              }{(item.status == 'non-active') &&
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                  <Icon name='close' style={{fontSize:19, marginRight:10, color:'red'}} />
                  <Text style={{fontSize:14, color:'red'}}>Non Active</Text>
                </View>
              }
            </View>
            <View style={{flexDirection:'column'}}>
              {(item.status == 'active') &&
                <Button title="Disable?" icon={{ name:'close', size:19, color:'white' }} fontSize={8} buttonStyle={{padding:3, paddingRight:10, backgroundColor:'red', borderRadius:0}} />
              }{(item.status == 'non-active') &&
                <Button title="Activate?" icon={{ name:'check', size:19, color:'white' }} fontSize={8} buttonStyle={{padding:3, paddingRight:10, backgroundColor:'green', borderRadius:0}} />
              }
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Card>
  );

  render() {
    return (
      <Container>
        <Content>
          <FlatList
						keyExtractor={this.keyExtractor}
						data={list}
						renderItem={this.renderItem}
					/>
        </Content>
          <ActionButton buttonColor="#2089dc" onPress={() => this.props.navigation.navigate('PetugasCreate')} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})

const list = [
  {
    nama: 'Sandi Sahdewo',
    alamat: 'Wateskroyo, Besuki, Tulungagung', 
    tanggal_lahir: '09 Januari 1995',
    status: 'active'
  },
  {
    nama: 'Sandi Sahdewo',
    alamat: 'Wateskroyo, Besuki, Tulungagung', 
    tanggal_lahir: '09 Januari 1995',
    status: 'non-active'
  }
];