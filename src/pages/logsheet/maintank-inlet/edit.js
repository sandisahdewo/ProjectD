import React, {Component} from 'react';
import { View, Text, KeyboardAvoidingView, TimePickerAndroid } from 'react-native';
import { Container, Content, Card, Item, Input, Label, CheckBox, Body, ListItem} from 'native-base';
import { Button } from 'react-native-elements';
import Row from '../../../components/row';

export default class Edit extends Component {

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
										TRANSPORTIR
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Nama Transportir</Label>
                      <Input/>
                    </Item>
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
                      <Label style={{fontSize:12}}>Nama Driver</Label>
                      <Input/>
                    </Item>
                  </View>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Kapasitas Tangki</Label>
                      <Input keyboardType='number-pad'/>
                    </Item>
                  </View>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Nomor Surat Jalan</Label>
                      <Input/>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										KONDISI SEGEL
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <Row style={{marginBottom:10}}>
                    <Row style={{justifyContent:'flex-start'}}>
                      <CheckBox checked={true} color='green' />
                      <View style={{marginLeft:25}}>
                        <Text>Atas</Text>
                      </View>
                    </Row>
                    <Row style={{justifyContent:'flex-start'}}>
                      <CheckBox checked={false} color='green' />
                      <View style={{marginLeft:25}}>
                        <Text>Bawah</Text>
                      </View>
                    </Row>
                  </Row>
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
                      <Label style={{fontSize:12}}>Awal</Label>
                      <Input keyboardType='number-pad'/>
                    </Item>
                  </View>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Akhir</Label>
                      <Input keyboardType='number-pad'/>
                    </Item>
                  </View>
									<View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>QTY</Label>
                      <Input value="0"/>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <Item floatingLabel>
                    <Label style={{fontSize:12}}>QTY Surat Jalan</Label>
                    <Input/>
                  </Item>
                  <Item floatingLabel style={{marginTop:7}}>
                    <Label style={{fontSize:12}}>Keterangan</Label>
                    <Input multiline/>
                  </Item>
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