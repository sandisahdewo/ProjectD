import React, {Component} from 'react';
import { View, Text, DatePickerAndroid, KeyboardAvoidingView, TouchableHighlight, TimePickerAndroid } from 'react-native';
import { Container, Content, Card, Item, Input, Label, Icon} from 'native-base';
import { Button } from 'react-native-elements';

export default class Create extends Component {

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
										WAKTU
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
									<View style={{flex:1, flexDirection:'row'}}>
										<View style={{flex:1, marginBottom:7}}>
											<Item floatingLabel>
												<Label style={{fontSize:12}}>Tanggal</Label>
												<Input value="20-06-2019" />
											</Item>
										</View>
										<View style={{flex:1, marginBottom:7}}>
											<Item floatingLabel>
												<Label style={{fontSize:12}}>Jam</Label>
												<Input onTouchStart={() => setTime() } />
											</Item>
										</View>
									</View>
                </View>
              </View>
            </Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										UNIT
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Kode Unit</Label>
                      <Input/>
                    </Item>
                  </View>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Model Unit</Label>
                      <Input/>
                    </Item>
                  </View>
									<View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>HM/KM</Label>
                      <Input keyboardType='number-pad'/>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										SOLAR
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>QTY Solar</Label>
                      <Input keyboardType='number-pad'/>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										FLOW METER
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Flow Meter Awal</Label>
                      <Input keyboardType='number-pad'/>
                    </Item>
                  </View>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Flow Meter Akhir</Label>
                      <Input keyboardType='number-pad'/>
                    </Item>
                  </View>
									<View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Selisih Flow Meter</Label>
                      <Input value="0"/>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										NO POLISI
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>No Polisi</Label>
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

const setTime = async () => {
  try {
		const {action, hour, minute} = await TimePickerAndroid.open({
			hour: 14,
			minute: 0,
			is24Hour: true, // Will display '2 PM'
		});
		if (action !== TimePickerAndroid.dismissedAction) {
			// Selected hour (0-23), minute (0-59)
		}
	} catch ({code, message}) {
		console.warn('Cannot open time picker', message);
	}
}