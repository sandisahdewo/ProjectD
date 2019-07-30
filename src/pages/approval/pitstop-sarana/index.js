import React, {Component} from 'react'

import Modal from "react-native-modal"
import Row from '../../../components/row'
import Vline from '../../../components/line'
import { Button } from 'react-native-elements'
import Column from '../../../components/column'
import ServicePitstopSarana from '../../../services/pitstop-sarana'
import RowContainerContent from '../../../components/logsheet/row-container-content'
import { Card, Icon, Text, Item, Label, Picker } from 'native-base'
import DateFloatingLabelWithValidation from '../../../components/input/DateFloatingLabelWithValidation'
import { View, StyleSheet, Alert, FlatList, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import { format } from 'date-fns'
import Loading from '../../../components/loading'

let self = null

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
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      filter_shift: '',
      filter_tanggal: '',
      filter_status: '',
      listPitstopSarana: [],
      dataFound: true,
      isModalVisible: false
    }
  }

  componentDidMount() {
    self = this
    this.setState({
      filter_tanggal: format(new Date(), 'DD-MM-YYYY'),
      filter_shift: 'siang',
      filter_status: '',
      dataFound: true
    })
    this.props.navigation.addListener('willFocus', 
      () => {
        this.getWithFilter()
      }
    )
  }


  deleteItem = () => {
    Alert.alert(
      'Apakah yakin akan menghapus Pitstop Sarana?',
      '',
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

	keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <Card>
      <TouchableWithoutFeedback 
        onPress={() => this.props.navigation.navigate('ApprovalPitstopSaranaDetail', {
           pitstopSaranaId:item.id, 
           pitstopSaranaNomor: this.props.navigation.state.params.pitstopSaranaNomor })
        }>
        <View style={{flex:1, paddingHorizontal:7, paddingVertical:5}}>
          <View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{fontWeight:'bold'}}>Pitstop Sarana {item.nomor}</Text>
              <Text style={{fontWeight:'bold'}}>{item.line}</Text>
            </View>
          </View>
          <Vline/>
          <Row>
            <Column style={{paddingRight:15}}>
              {/* <RowContainerContent title="Driver" content={item.driver}/> */}
              <RowContainerContent title="Fuelman" content={item.fuelman}/>
              <RowContainerContent title="Tanggal" content={item.tanggal}/>
              <RowContainerContent title="Shift" content={item.shift}/>
            </Column>
            <Column>
              <RowContainerContent title="WHS Number" content={item.whs_number}/>
              <RowContainerContent title="Location" content={item.location}/>
              <RowContainerContent title="Total QTY Solar" content={item.total_qty_solar}/>
              {/* <RowContainerContent title="" content=""/> */}
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
            { (item.status == 'finish-input') &&
            <Row style={{justifyContent:'flex-start'}}>
              <Icon name='checkmark' style={{fontSize:19, marginRight:10, color:'blue'}} />
                <Text style={{fontSize:14, color:'blue'}}>Finish Input</Text>
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
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.listPitstopSarana}
              renderItem={this.renderItem}
            />
          </View>
        }
        <View>
          <Modal isVisible={this.state.isModalVisible} 
            swipeDirection={['right', 'down']}
            style={styles.bottomModal}
            onSwipeComplete={() => this.toggleModal()}
          >
          <View style={{paddingHorizontal:8, paddingBottom:8, backgroundColor:'white', borderRadius:8}}>
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
                      onValueChange={(filter_shift) => this.setState({filter_shift})}
                      selectedValue={this.state.filter_shift}
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
                      onValueChange={(filter_status) => this.setState({filter_status})}
                      selectedValue={this.state.filter_status}
                    >
                      <Picker.Item label="Input" value="input" />
                      <Picker.Item label="Finish Input" value="finish-input" />
                      <Picker.Item label="Approved" value="approved" />
                      <Picker.Item label="Rejected" value="rejected" />
                    </Picker>
                  </View>
                </Item>
              </View>
              <Button title="Terapkan" onPress={() => { this.toggleModal(); this.getWithFilter() }} />
            </View>
          </Modal>
        </View>
      </View>
    );
  }

  getWithFilter = () => {
    const pitstopSaranaNomor = this.props.navigation.state.params.pitstopSaranaNomor;
    const params = {
      nomor: pitstopSaranaNomor,
      tanggal: this.state.filter_tanggal,
      shift: this.state.filter_shift,
      status: this.state.filter_status
    };
    ServicePitstopSarana.getServiceIgnoreLineWithParams(params)
      .then(res => {
        if(res <= 0) {
          this.setState({
            listPitstopSarana: [],
            dataFound: false,
            loading: false
          })
        } else {
          this.setState({
            listPitstopSarana: res,
            dataFound: true,
            loading: false
          })
        }
      })
      .catch(err => {

      })
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
