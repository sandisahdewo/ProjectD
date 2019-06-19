import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, Icon, Text } from 'native-base';
import { Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

export default class Index extends Component {
  static navigationOptions = {
    drawerLabel: 'Daftar Petugas',
  };

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <View style={{flex:1, paddingHorizontal:10, paddingVertical:10}}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'column', paddingRight:15}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Nama</Text>
                    <Text style={{fontSize:12}}>Sandi Sahdewo</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal Lahir</Text>
                    <Text style={{fontSize:12}}>09 Januari 1998</Text>
                  </View>
                </View>
                <View style={{flexDirection:'column'}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Alamat</Text>
                    <Text style={{fontSize:12}}>Wateskroyo, Besuki, Tulungagung</Text>
                  </View>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', borderTopColor:'black', borderTopWidth:0.5, paddingTop:5}}>
                <View style={{flexDirection:'column'}}>
                  <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <Icon name='checkmark' style={{fontSize:19, marginRight:10, color:'green'}} />
                    <Text style={{fontSize:14, color:'green'}}>Active</Text>
                  </View>
                </View>
                <View style={{flexDirection:'column'}}>
                  <Button title="Disabled" icon={{ name:'close', size:19, color:'white' }} fontSize={8} buttonStyle={{padding:3, paddingRight:10, backgroundColor:'red', borderRadius:0}} />
                </View>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{flex:1, paddingHorizontal:10, paddingVertical:10}}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'column', paddingRight:15}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Nama</Text>
                    <Text style={{fontSize:12}}>Sandi Sahdewo</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal Lahir</Text>
                    <Text style={{fontSize:12}}>09 Januari 1998</Text>
                  </View>
                </View>
                <View style={{flexDirection:'column'}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Alamat</Text>
                    <Text style={{fontSize:12}}>Wateskroyo, Besuki, Tulungagung</Text>
                  </View>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', borderTopColor:'black', borderTopWidth:0.5, paddingTop:5}}>
                <View style={{flexDirection:'column'}}>
                  <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <Icon name='close' style={{fontSize:19, marginRight:10, color:'red'}} />
                    <Text style={{fontSize:14, color:'red'}}>Disabled</Text>
                  </View>
                </View>
                <View style={{flexDirection:'column'}}>
                  <Button title="Activated" icon={{ name:'check', size:19, color:'white' }} fontSize={8} buttonStyle={{padding:3, paddingRight:10, backgroundColor:'green', borderRadius:0}} />
                </View>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{flex:1, paddingHorizontal:10, paddingVertical:10}}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'column', paddingRight:15}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Nama</Text>
                    <Text style={{fontSize:12}}>Sandi Sahdewo</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal Lahir</Text>
                    <Text style={{fontSize:12}}>09 Januari 1998</Text>
                  </View>
                </View>
                <View style={{flexDirection:'column'}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Alamat</Text>
                    <Text style={{fontSize:12}}>Wateskroyo, Besuki, Tulungagung</Text>
                  </View>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', borderTopColor:'black', borderTopWidth:0.5, paddingTop:5}}>
                <View style={{flexDirection:'column'}}>
                  <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <Icon name='close' style={{fontSize:19, marginRight:10, color:'red'}} />
                    <Text style={{fontSize:14, color:'red'}}>Disabled</Text>
                  </View>
                </View>
                <View style={{flexDirection:'column'}}>
                  <Button title="Activated" icon={{ name:'check', size:19, color:'white' }} fontSize={8} buttonStyle={{padding:3, paddingRight:10, backgroundColor:'green', borderRadius:0}} />
                </View>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{flex:1, paddingHorizontal:10, paddingVertical:10}}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'column', paddingRight:15}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Nama</Text>
                    <Text style={{fontSize:12}}>Sandi Sahdewo</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal Lahir</Text>
                    <Text style={{fontSize:12}}>09 Januari 1998</Text>
                  </View>
                </View>
                <View style={{flexDirection:'column'}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Alamat</Text>
                    <Text style={{fontSize:12}}>Wateskroyo, Besuki, Tulungagung</Text>
                  </View>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', borderTopColor:'black', borderTopWidth:0.5, paddingTop:5}}>
                <View style={{flexDirection:'column'}}>
                  <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <Icon name='close' style={{fontSize:19, marginRight:10, color:'red'}} />
                    <Text style={{fontSize:14, color:'red'}}>Disabled</Text>
                  </View>
                </View>
                <View style={{flexDirection:'column'}}>
                  <Button title="Activated" icon={{ name:'check', size:19, color:'white' }} fontSize={8} buttonStyle={{padding:3, paddingRight:10, backgroundColor:'green', borderRadius:0}} />
                </View>
              </View>
            </View>
          </Card>

        </Content>
          <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('PetugasCreate')} />
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