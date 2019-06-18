import React, {Component} from 'react';
import { View, Text, DatePickerAndroid, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { Container, Content, Card, Item, Input, Label, Picker, Icon} from 'native-base';
import { Button } from 'react-native-elements';

export default class Create extends Component {

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

	state = {
    selectedDate: null,
    selectedJenisPetugas: null
  }

  render() {
    return (
      <Container>
        <Content>
          <KeyboardAvoidingView behavior="padding">
            <Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
                <View style={{margin:5}}>
                  <Text>
                    TAB - SUB TAB
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
								<View style={{paddingVertical:5, paddingHorizontal:7}}>
									<Text style={{fontSize:18, fontWeight:'bold'}}>Pitstop Sarana</Text>
									<Text style={{fontSize:16, fontWeight:'bold'}}>Line 1</Text>
								</View>
							</View>
						</Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										SERVICES
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Driver</Label>
                      <Input/>
                    </Item>
                  </View>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Fuelman</Label>
                      <Input/>
                    </Item>
                  </View>
            
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Tanggal</Label>
                      <Input value='07-05-2019' onTouchStart={() => setDate()} />
                    </Item>
                  </View>

                  <View style={{marginBottom:7}}>
                    <Item>
											<View style={{flex:1, flexDirection:'column'}}>
                        <Label style={{fontSize:12}}>Shift</Label>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          placeholder="Select your SIM"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          style={{ width: undefined }}
                          selectedValue={this.state.selectedJenisPetugas}
                        >
                          <Picker.Item label="Siang (07:00 - 17:00)" value="key0" />
                          <Picker.Item label="Malam (17:00 - 07:00)" value="key1" />
                        </Picker>
                      </View>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										LOG SHEET FUEL
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>WHS Number</Label>
                      <Input/>
                    </Item>
                  </View>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Location</Label>
                      <Input/>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>

            <View style={{flex:1, height:100, marginHorizontal:5}}>
              <Button title='Simpan'></Button>
            </View>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const setDate = async () => {
  try {
    const {action, year, month, day} = await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(2000, 4, 25),
      maxDate: new Date()
    });
    if (action !== DatePickerAndroid.dismissedAction) {

    }
  } catch ({code, message}) {
    console.warn('Cannot open date picker', message);
  }
}