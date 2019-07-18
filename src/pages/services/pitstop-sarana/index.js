import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, FlatList, Alert } from 'react-native';
import { Card, Icon, Text } from 'native-base';
import ActionButton from 'react-native-action-button';
import Row from '../../../components/row';
import BtnSm from '../../../components/button/small';
import Vline from '../../../components/line';
import ServicePitstopSarana from '../../../services/pitstop-sarana';

export default class Index extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#eeeeee',
      elevation: 0
    },
    headerTintColor: '#808080',
    title:'E-Izin',
  };

  constructor(props) {
    super(props)

    this.state = {
      list: [],
      isFetching: false
    }

  }

  componentDidMount = () => {
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
                <Text style={{fontSize:14, fontWeight:'bold'}}>Driver</Text>
                <Text style={{fontSize:12}}>{item.driver}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Tanggal</Text>
                <Text style={{fontSize:12}}>{item.tanggal_view}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>WHS Number</Text>
                <Text style={{fontSize:12}}>{item.whs_number}</Text>
              </View>
            </View>
            <View style={{flex:1, flexDirection:'column'}}>
              <View>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Fuelman</Text>
                <Text style={{fontSize:12}}>{item.fuelman}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Shift</Text>
                <Text style={{fontSize:12}}>{item.shift_view}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Location</Text>
                <Text style={{fontSize:12}}>{item.location}</Text>
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
          {(item.status == 'input' || item.status == 'rejected') && 
            <Row style={{justifyContent:'flex-end'}}>
              <BtnSm buttonStyle={{marginRight:4, backgroundColor:'#FFBF00'}} onPress={() => this.props.navigation.navigate('ServicePitstopSaranaEdit', {id: item.id})} title="Edit"></BtnSm>
              <BtnSm buttonStyle={{backgroundColor:'red'}} onPress={() => this.deleteItem(item)} title="Hapus"></BtnSm>
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
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.list}
          renderItem={this.renderItem}
          onRefresh={() => this.refreshList() }
          refreshing={this.state.isFetching}
        />
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('ServicePitstopSaranaCreate')}/>
      </View>
    );
  }

  getAllService = async () => {
    const params = {
      line : this.props.navigation.state.params.line,
      nomor : this.props.navigation.state.params.pitstopSaranaNomor
    }
    await ServicePitstopSarana.getAllService(params)
          .then(res => {
            this.setState({
              list: res,
              isFetching: false
            })
          })
          .catch(err => {
            console.log('er', err)
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
    await ServicePitstopSarana.deleteService(id)
      .then(res => {
        console.log('res', res)
        this.getAllService();
      })
      .catch(err => {
        console.log('err', err)
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