import React, {Component} from 'react';
import { format } from 'date-fns'
import Modal from "react-native-modal";
import Row from '../../../components/row';
import Vline from '../../../components/line';
import { Button } from 'react-native-elements';
import BtnSm from '../../../components/button/small';
import ActionButton from 'react-native-action-button';
import ServicePitstopSarana from '../../../services/pitstop-sarana';
import { Card, Icon, Text, Item, Input, Label, Picker } from 'native-base';
import DateFloatingLabelWithValidation from '../../../components/input/DateFloatingLabelWithValidation';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, FlatList, Alert } from 'react-native';
import Loading from '../../../components/loading';

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

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      list: [],
      dataFound: true,
      isFetching: false,
      toggleModal: false,
      isLoading: true,

      // filter
      filter_tanggal: '',
      filter_shift: '',
      filter_status: 'input'
    }

  }

  componentDidMount = () => {
    self = this;
    
    this.setState({
      filter_tanggal: format(new Date(), 'DD-MM-YYYY'),
    })

    this.props.navigation.addListener('willFocus', 
      () => {
        this.getAllService();
      }
    )
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <Card>
      <TouchableWithoutFeedback style={{backgroundColor:'blue'}} onPress={() => this.props.navigation.navigate('LogsheetPitstopSaranaIndex', { pitstopSaranaId:item.id })}>
        <View style={{flex:1, paddingHorizontal:10, paddingVertical:10}}>
          <View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{fontWeight:'bold'}}>Pitstop Sarana</Text>
              <Text style={{fontWeight:'bold'}}>{item.line}</Text>
            </View>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#ccc', marginVertical:5}}></View>
          <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flex:1, flexDirection:'column', paddingRight:15}}>
              <View>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Fuelman</Text>
                <Text style={{fontSize:12}}>{item.fuelman}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal</Text>
                <Text style={{fontSize:12}}>{item.tanggal_view}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Shift</Text>
                <Text style={{fontSize:12}}>{item.shift_view}</Text>
              </View>
            </View>
            <View style={{flex:1, flexDirection:'column'}}>
              <View>
                <Text style={{fontSize:14, fontWeight:'bold'}}>WHS Number</Text>
                <Text style={{fontSize:12}}>{item.whs_number}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Location</Text>
                <Text style={{fontSize:12}}>{item.location}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}></Text>
                <Text style={{fontSize:12}}></Text>
              </View>
            </View>
          </View>
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
            { (item.status == 'finish-input') &&
            <Row style={{justifyContent:'flex-start'}}>
              <Icon name='checkmark' style={{fontSize:19, marginRight:10, color:'blue'}} />
                <Text style={{fontSize:14, color:'blue'}}>Finish Input</Text>
            </Row>
            }
          {(item.status == 'input' || item.status == 'rejected') && 
            <Row style={{justifyContent:'flex-end'}}>
              <BtnSm buttonStyle={{marginRight:4, backgroundColor:'#FFBF00'}} onPress={() => this.props.navigation.navigate('ServicePitstopSaranaEdit', {id: item.id})} title="Edit"></BtnSm>
              {/* <BtnSm buttonStyle={{backgroundColor:'red'}} onPress={() => this.deleteItem(item)} title="Hapus"></BtnSm> */}
            </Row>
          }
          </Row>
        </View>
      </TouchableWithoutFeedback>
    </Card>
  )

  render() {
    return (
      <View style={{flex:1}}>
        <Loading loading={this.state.loading}/>
        {!this.state.dataFound && 
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Tidak ada data untuk ditampilkan</Text>
          </View>
        }

        {this.state.dataFound &&
          <View style={{flex:1}}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.list}
              renderItem={this.renderItem}
              onRefresh={() => this.refreshList() }
              refreshing={this.state.isFetching}
            />
          </View>
        }

        {/* Modal untuk filter di bawah */}
        <View>
          <Modal isVisible={this.state.toggleModal} 
            swipeDirection={['right', 'down']}
            style={{justifyContent: 'flex-end', margin: 0}}
            onSwipeComplete={() => this.toggleModal()}
          >
          <View style={{paddingHorizontal:8, paddingBottom:8, backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10 }}>
            <View style={{marginBottom:7}}>
              <View style={{height:40, marginBottom:7}}>
                <Row style={{borderBottomColor:'#808080', justifyContent:'flex-start', alignItems:'center', borderBottomWidth:0.4}}>
                  <TouchableWithoutFeedback onPress={() => this.toggleModal()}>
                    <Icon name='close' style={{fontSize:20, marginRight:10, color:'black'}} />
                  </TouchableWithoutFeedback>
                  <Text style={{fontSize:18}}>Filter Data</Text>
                </Row>
              </View>
              <DateFloatingLabelWithValidation value={this.state.filter_tanggal} title='Tanggal' onSelected={(filter_tanggal) => this.setState({filter_tanggal})}/>
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
                      selectedValue={this.state.filter_shift}
                      onValueChange={(filter_shift) => this.setState({filter_shift})}
                    >
                      <Picker.Item label="Siang (07:00 - 17:00)" value="siang" />
                      <Picker.Item label="Malam (17:00 - 07:00)" value="malam" />
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
                      selectedValue={this.state.filter_status}
                      onValueChange={(filter_status) => this.setState({filter_status})}
                    >
                      <Picker.Item label="Input" value="input" />
                      <Picker.Item label="Finish Input" value="finish-input" />
                      <Picker.Item label="Approved" value="approved" />
                      <Picker.Item label="Rejected" value="rejected" />
                    </Picker>
                  </View>
                </Item>
              </View>
              <Button title="Terapkan" onPress={() => { this.toggleModal(); this.getAllService() }} />
            </View>
          </Modal>
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('ServicePitstopSaranaCreate', {line: this.props.navigation.state.params.line, pitstopSaranaNomor: this.props.navigation.state.params.pitstopSaranaNomor})}/>
      </View>
    );
  }

  getAllService = async () => {
    this.setLoading()
    this.setState({
      dataFound:true,
      list:[],
    })
    const params = {
      line : this.props.navigation.state.params.line,
      nomor : this.props.navigation.state.params.pitstopSaranaNomor,
      tanggal: this.state.filter_tanggal,
      shift: this.state.filter_shift,
      status: this.state.filter_status
    }
    await ServicePitstopSarana.getAllService(params)
          .then(res => {
            if(res.length > 0) {
              this.setState({
                list: res,
                isFetching: false,
                dataFound: true
              })
              this.unsetLoading()
            } else {
              this.setState({
                dataFound:false,
                list: [],
              })
              this.unsetLoading()
            }
          })
          .catch(err => {
            console.log('er', err)
            this.unsetLoading()
          })
  }

  refreshList = () => {
    this.setState({isFetching:true})
    this.getAllService();
  }

  deleteItem = (item) => {
    Alert.alert(
      'Apakah yakin akan menghapus Pitstop Sarana?',
      `Menghapus service juga akan menghapus logsheet yang berhubungan`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => this.delete(item.id)
        },
      ],
    );
  }

  delete = async (id) => {
    this.setLoading()
    await ServicePitstopSarana.deleteService(id)
      .then(res => {
        console.log('res', res)
        this.getAllService();
      })
      .catch(err => {
        console.log('err', err)
        this.unsetLoading()
      })
  }

  toggleModal = () => {
    this.setState({ toggleModal: !this.state.toggleModal })
  }

  setLoading = () => {
    this.setState({
      loading: true
    })
  }

  unsetLoading = () => {
    this.setState({
      loading: false
    })
  }

}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})