import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
            <TouchableWithoutFeedback style={{backgroundColor:'blue'}} onPress={() => this.props.navigation.navigate('LogsheetPitstopSaranaIndex')}>
              <View style={{flex:1, paddingHorizontal:10, paddingVertical:10}}>
                <View>
                  <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontWeight:'bold'}}>Pitstop Sarana</Text>
                    <Text style={{fontWeight:'bold'}}>Line 1</Text>
                  </View>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc', marginVertical:5}}></View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={{flex:1, flexDirection:'column', paddingRight:15}}>
                    <View>
                      <Text style={{fontSize:14, fontWeight:'bold'}}>Driver</Text>
                      <Text style={{fontSize:12}}>Sandi Sahdewo</Text>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal</Text>
                      <Text style={{fontSize:12}}>09 Mei 2019</Text>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{fontSize:14, fontWeight:'bold'}}>WHS Number</Text>
                      <Text style={{fontSize:12}}>FH09091</Text>
                    </View>
                  </View>
                  <View style={{flex:1, flexDirection:'column'}}>
                    <View>
                      <Text style={{fontSize:14, fontWeight:'bold'}}>Fuelman</Text>
                      <Text style={{fontSize:12}}>Agus Adi</Text>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{fontSize:14, fontWeight:'bold'}}>Shift</Text>
                      <Text style={{fontSize:12}}>Siang (07:00 - 17:00)</Text>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{fontSize:14, fontWeight:'bold'}}>Location</Text>
                      <Text style={{fontSize:12}}>KH989</Text>
                    </View>
                  </View>
                </View>

                <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', borderTopColor:'black', borderTopWidth:0.5, paddingTop:5}}>
                  <View style={{flex:1, flexDirection:'column'}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                      <Icon name='checkmark' style={{fontSize:19, marginRight:10, color:'green'}} />
                      <Text style={{fontSize:14, color:'green'}}>Approved</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Card>

          <Card>
            <View style={{flex:1, paddingHorizontal:10, paddingVertical:10}}>
              <View>
								<View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{fontWeight:'bold'}}>Pitstop Sarana</Text>
                  <Text style={{fontWeight:'bold'}}>Line 1</Text>
                </View>
							</View>
              <View style={{borderBottomWidth:1, borderBottomColor:'#ccc', marginVertical:5}}></View>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flex:1, flexDirection:'column', paddingRight:15}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Driver</Text>
                    <Text style={{fontSize:12}}>Sandi Sahdewo</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal</Text>
                    <Text style={{fontSize:12}}>09 Mei 2019</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>WHS Number</Text>
                    <Text style={{fontSize:12}}>FH09091</Text>
                  </View>
                </View>
                <View style={{flex:1, flexDirection:'column'}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Fuelman</Text>
                    <Text style={{fontSize:12}}>Agus Adi</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Shift</Text>
                    <Text style={{fontSize:12}}>Siang (07:00 - 17:00)</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Location</Text>
                    <Text style={{fontSize:12}}>KH989</Text>
                  </View>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', borderTopColor:'black', borderTopWidth:0.5, paddingTop:5}}>
                <View style={{flexDirection:'column'}}>
                  <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <Icon name='close' style={{fontSize:19, marginRight:10, color:'red'}} />
                    <Text style={{fontSize:14, color:'red'}}>Rejected</Text>
                  </View>
                </View>
                <View style={{flex:1, flexDirection:'column', alignItems:'flex-end'}}>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <Button title="Edit" buttonStyle={{paddingVertical:1, backgroundColor:'#FFBF00'}} titleStyle={{fontSize:14}} />
                    <Button title="Hapus" buttonStyle={{paddingVertical:1, backgroundColor:'red', marginLeft:5}} titleStyle={{fontSize:14}} />
                  </View>
                </View>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{flex:1, paddingHorizontal:10, paddingVertical:10}}>
              <View>
								<View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{fontWeight:'bold'}}>Pitstop Sarana</Text>
                  <Text style={{fontWeight:'bold'}}>Line 1</Text>
                </View>
							</View>
              <View style={{borderBottomWidth:1, borderBottomColor:'#ccc', marginVertical:5}}></View>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flex:1, flexDirection:'column', paddingRight:15}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Driver</Text>
                    <Text style={{fontSize:12}}>Sandi Sahdewo</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal</Text>
                    <Text style={{fontSize:12}}>09 Mei 2019</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>WHS Number</Text>
                    <Text style={{fontSize:12}}>FH09091</Text>
                  </View>
                </View>
                <View style={{flex:1, flexDirection:'column'}}>
                  <View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Fuelman</Text>
                    <Text style={{fontSize:12}}>Agus Adi</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Shift</Text>
                    <Text style={{fontSize:12}}>Siang (07:00 - 17:00)</Text>
                  </View>
                  <View style={{marginTop:10}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>Location</Text>
                    <Text style={{fontSize:12}}>KH989</Text>
                  </View>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', borderTopColor:'black', borderTopWidth:0.5, paddingTop:5}}>
                <View style={{flex:1, flexDirection:'column'}}>
                  <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <Icon name='create' style={{fontSize:19, marginRight:10, color:'blue'}} />
                    <Text style={{fontSize:14, color:'blue'}}>Input</Text>
                  </View>
                </View>
                <View style={{flex:1, flexDirection:'column', alignItems:'flex-end'}}>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <Button title="Edit" buttonStyle={{paddingVertical:1, backgroundColor:'#FFBF00'}} titleStyle={{fontSize:14}} />
                    <Button title="Hapus" buttonStyle={{paddingVertical:1, backgroundColor:'red', marginLeft:5}} titleStyle={{fontSize:14}} />
                  </View>
                </View>
              </View>
            </View>
          </Card>

        </Content>
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('ServiceCreate')}/>
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