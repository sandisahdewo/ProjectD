import React, {Component} from 'react';
import { View, StyleSheet, Alert, DatePickerAndroid, FlatList, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Card, Icon, Text, Item, Input, Label, Picker } from 'native-base';
import { Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import RowContainerContent from '../../../components/logsheet/row-container-content';
import Column from '../../../components/column';
import Row from '../../../components/row';
import Vline from '../../../components/line';
import BtnSm from '../../../components/button/small';
import Modal from "react-native-modal";

let self = null;

export default class Index extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableHighlight onPress={() => self.toggleModal() }>
          <View style={{marginRight: 15}}>
            <Icon name="funnel" size={28} style={{ color:'white' }}/>
          </View>
        </TouchableHighlight>
      ),
    }
  };

  componentDidMount() {
		self = this;
  }

  state = {
    selectedDate: null,
    isModalVisible: false
  }

  deleteItem = () => {
    Alert.alert(
      'Apakah yakin akan menghapus Maintank Inlet?',
      'Line 1 \nLokasi: FH090098',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    );
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  list = [
    {
      subtab: 'Line 1',
      lokasi: 'FH09089',
      shift: 'Siang (07:00 - 17:00)',
      tanggal: '09 Mei 2019',
      petugas_inlet: 'Puryanto',
      status: 'approved'
    },
    {
      subtab: 'Line 1',
      lokasi: 'FH09089',
      shift: 'Siang (07:00 - 17:00)',
      tanggal: '09 Mei 2019',
      petugas_inlet: 'Puryanto',
      status: 'rejected'
    },
    {
      subtab: 'Line 1',
      lokasi: 'FH09089',
      shift: 'Siang (07:00 - 17:00)',
      tanggal: '09 Mei 2019',
      petugas_inlet: 'Puryanto',
      status: 'input'
    }
  ];

	keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <Card>
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('LogsheetMaintankInletIndex')}>
        <View style={{flex:1, paddingHorizontal:7, paddingVertical:5}}>
          <View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{fontWeight:'bold'}}>{item.subtab}</Text>
            </View>
          </View>
          <Vline/>
          <Row>
            <Column style={{paddingRight:15}}>
              <RowContainerContent title="Lokasi" content={item.lokasi}/>
              <RowContainerContent title="Shift" content={item.shift}/>
            </Column>
            <Column>
              <RowContainerContent title="Tanggal" content={item.tanggal}/>
              <RowContainerContent title="Petugas Inlet" content={item.petugas_inlet}/>
            </Column>
          </Row>
          <Vline/>
          <Row style={{padding:3}}>
            {(item.status == 'approved') && 
              <Row style={{justifyContent:'flex-start'}}>
                <Icon name='checkmark' style={{fontSize:19, marginRight:10, color:'green'}} />
                <Text style={{fontSize:14, color:'green'}}>Approved</Text>
              </Row>
            }{ (item.status == 'rejected') &&
              <Row style={{justifyContent:'flex-start'}}>
                <Icon name='close' style={{fontSize:19, marginRight:10, color:'red'}} />
                  <Text style={{fontSize:14, color:'red'}}>Rejected</Text>
              </Row>
            }{ (item.status == 'input') &&
            <Row style={{justifyContent:'flex-start'}}>
              <Icon name='create' style={{fontSize:19, marginRight:10, color:'blue'}} />
                <Text style={{fontSize:14, color:'blue'}}>Input</Text>
            </Row>
          }
          {(item.status == 'input' || item.status == 'rejected') && 
            <Row style={{justifyContent:'flex-end'}}>
              <BtnSm buttonStyle={{marginRight:4, backgroundColor:'#FFBF00'}} onPress={() => this.props.navigation.navigate('ServiceMaintankInletEdit')} title="Edit"></BtnSm>
              <BtnSm buttonStyle={{backgroundColor:'red'}} onPress={() => this.deleteItem()} title="Hapus"></BtnSm>
            </Row>
          }
          </Row>
        </View>
      </TouchableWithoutFeedback>
    </Card>
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

          {/* Modal untuk filter di bawah */}
          <Modal isVisible={this.state.isModalVisible} 
            swipeDirection={['right', 'down']}
            style={styles.bottomModal}
            onSwipeComplete={() => this.toggleModal()}
          >
          <View style={{paddingHorizontal:8, paddingBottom:8, backgroundColor:'white'}}>
            <View style={{marginBottom:7}}>
              <View style={{height:40, marginBottom:7}}>
                <Row style={{borderBottomColor:'#808080', justifyContent:'flex-start', alignItems:'center', borderBottomWidth:0.4}}>
                  <TouchableWithoutFeedback onPress={() => this.toggleModal()}>
                    <Icon name='close' style={{fontSize:30, marginRight:10, color:'black'}} />
                  </TouchableWithoutFeedback>
                  <Text style={{fontSize:20}}>Filter Data</Text>
                </Row>
              </View>
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
                      placeholder="Pilih Shift"
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
              <View style={{marginBottom:7}}>
                <Item>
                  <View style={{flex:1, flexDirection:'column'}}>
                    <Label style={{fontSize:12}}>Status</Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder="Pilih Status"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      style={{ width: undefined }}
                      selectedValue={this.state.selectedJenisPetugas}
                    >
                      <Picker.Item label="Approved" value="key0" />
                      <Picker.Item label="Rejected" value="key1" />
                    </Picker>
                  </View>
                </Item>
              </View>
              <Button title="Terapkan" onPress={this.toggleModal} />
            </View>
          </Modal>
        </Content>
        <ActionButton buttonColor="#2089dc" onPress={() => this.props.navigation.navigate('ServiceMaintankInletCreate')}/>
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
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})

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