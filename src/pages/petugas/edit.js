import React, {Component} from 'react';
import { View, StyleSheet, Text, DatePickerAndroid, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Card, Item, Input, Label, Picker, Icon, Toast} from 'native-base';
import { Button } from 'react-native-elements';
import axios from 'axios'
import ServicePetugas from '../../services/petugas'

export default class Edit extends Component {
  static navigationOptions = {
    drawerLabel: 'Edit Petugas',
  };

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      nama: '',
      username: '',
      tanggal_lahir: '',
      no_hp: '',
      email: '',
      peran: 'fuelman',
    }
  }

  componentDidMount() {
    this.find();
  }

  find = async () => {
    petugasId = this.props.navigation.state.params.petugasId;
    ServicePetugas.findPetugasById(petugasId)
      .then(res => {
        this.setState({
          id: res.id,
          nama: res.nama,
          username: res.username,
          tanggal_lahir: res.tanggal_lahir,
          no_hp: res.no_hp,
          email: res.email,
          peran: res.peran
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  updatePetugas = async () => {
    const formData = {
      id: this.state.id,
      nama: this.state.nama,
      username: this.state.username,
      tanggal_lahir: this.state.tanggal_lahir,
      no_hp: this.state.no_hp,
      email: this.state.email,
      peran: this.state.peran
    }
    
    await ServicePetugas.updatePetugas(formData, this.state.id)
        .then(response => {
          Toast.show({
            text: 'Berhasil memperbarui petugas!',
            buttonText: 'Okay',
            type:'success'
          })
          this.props.navigation.navigate('PetugasIndex')
        })
        .catch(error => {
          Toast.show({
            text: error.message,
            buttonText: 'Okay',
            type:'danger'
          })
        })
  }

  setDateAndroid = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
      date: new Date(),
      maxDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ tanggal_lahir: `${day}-${month + 1}-${year}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

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
                      <Input
                        value={this.state.nama}
                        onChangeText={(nama) => this.setState({nama})}
                      />
                    </Item>
                  </View>
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Username</Label>
                      <Input
                        value={this.state.username}
                        onChangeText={(username) => this.setState({username})}
                      />
                    </Item>
                  </View>

                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Email</Label>
                      <Input 
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                      />
                    </Item>
                  </View>
            
                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>Tanggal Lahir</Label>
                      <Input 
                        value={this.state.tanggal_lahir}
                        showSoftInputOnFocus={false} 
                        onTouchStart={() => this.setDateAndroid()} 
                      />
                    </Item>
                  </View>

                  <View style={{marginBottom:7}}>
                    <Item floatingLabel>
                      <Label style={{fontSize:12}}>No HP</Label>
                      <Input 
                        keyboardType='number-pad' 
                        value={this.state.no_hp}
                        onChangeText={(no_hp) => this.setState({no_hp})}
                      />
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
                          placeholder="Pilih Peran Petugas"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          style={{ width: undefined }}
                          selectedValue={this.state.peran}
                          onValueChange={(peran) => this.setState({peran})}
                        >
                          <Picker.Item label="Fuelman" value="fuelman" />
                          <Picker.Item label="Pengawas" value="pengawas" />
                          <Picker.Item label="Admin" value="admin" />
                        </Picker>
                      </View>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>
            <View style={{flex:1, height:100, marginHorizontal:5}}>
              <Button title='Perbarui' onPress={() => this.updatePetugas()}></Button>
            </View>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}