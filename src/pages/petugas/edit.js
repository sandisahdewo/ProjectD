import React, {Component} from 'react';
import { View, StyleSheet, Text, DatePickerAndroid, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Card, Item, Input, Label, Picker, Icon} from 'native-base';
import { Button } from 'react-native-elements';

export default class Edit extends Component {
  static navigationOptions = {
    drawerLabel: 'Edit Petugas',
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
                    DATA DIRI
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Nama</Label>
                      <Input/>
                    </Item>
                  </View>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Username</Label>
                      <Input/>
                    </Item>
                  </View>
            
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Tanggal Lahir</Label>
                      <Input showSoftInputOnFocus={false} onTouchStart={() => setDate()} />
                    </Item>
                  </View>

                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>No HP</Label>
                      <Input keyboardType='number-pad' />
                    </Item>
                  </View>
                </View>
              </View>
            </Card>
            <Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
                <View style={{margin:5}}>
                  <Text>
                    PETUGAS
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginHorizontal:6}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <View style={{marginBottom:7}}>
                    <Item>
                      <View style={{flex:1, flexDirection:'column'}}>
                        <Label style={{fontSize:12}}>Jenis Karyawan</Label>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          placeholder="Select your SIM"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          style={{ width: undefined }}
                          selectedValue={this.state.selectedJenisPetugas}
                        >
                          <Picker.Item label="Fuelman" value="key0" />
                          <Picker.Item label="Pengawas" value="key1" />
                        </Picker>
                      </View>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>
            <View style={{flex:1, height:100, marginHorizontal:5}}>
              <Button title='Perbarui'></Button>
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