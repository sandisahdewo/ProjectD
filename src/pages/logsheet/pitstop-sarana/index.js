import React, {Component} from 'react';
import Row from '../../../components/row';
import Vline from '../../../components/line';
import Column from '../../../components/column';
import Loading from '../../../components/loading'
import BtnSm from '../../../components/button/small';
import ActionButton from 'react-native-action-button';
import { Container, Content, Card, Toast, Icon } from 'native-base';
import RowHeader from '../../../components/logsheet/row-header';
import { View, StyleSheet, FlatList, Alert, TouchableWithoutFeedback } from 'react-native';
import ServicePitstopSarana from '../../../services/pitstop-sarana';
import RowHeaderContent from '../../../components/logsheet/row-header-content';
import RowContainerContent from '../../../components/logsheet/row-container-content';

let _this;

export default class Index extends Component {
  static navigationOptions = {
    headerLeft: (
      <TouchableWithoutFeedback onPress={() => _this.props.navigation.navigate('ServicePitstopSaranaIndex', {pitstopSaranaId: _this.props.navigation.state.params.pitstopSaranaId } )} >
        <Icon name='arrow-back' style={{color:'white', paddingLeft:20, fontSize:24}} />
      </TouchableWithoutFeedback>
    )
  };

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      id: '',
      driver: '',
      fuelman: '',
      tanggal: '',
      shift: '',
      whs_number: '',
      location: '',
      status: '',
      total_qty_solar: '',
      total_selisih_flow_meter: '',
      detail: [],
      refreshing: false
    }
  }

  componentDidMount = () => {
    _this = this;
    const pitstopSaranaId = this.props.navigation.state.params.pitstopSaranaId;

    this.props.navigation.addListener('willFocus', 
      () => {
        this.findByCreatorWithDetail(pitstopSaranaId);
      }
    )
  }

	keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <Card>
      <Row style={{paddingTop:7, paddingLeft:7, paddingRight:7}}>
        <Column>
          <RowContainerContent title="Kode Unit" content={item.kode_unit} />
          <RowContainerContent title="Model Unit" content={item.model_unit} />
          <RowContainerContent title="HM/KM" content={item.hm_km} />
        </Column>
        <Column>
          <RowContainerContent title="Qty Solar" content={item.qty_solar} />
          <RowContainerContent title="Jam" content={item.jam} />
          <RowContainerContent title="User" content={item.nama_user} />
        </Column>
        <Column>
          <RowContainerContent title="Flow Meter Awal" content={item.flow_meter_awal} />
          <RowContainerContent title="Flow Meter Akhir" content={item.flow_meter_akhir} />
          <RowContainerContent title="Selisih Flow Meter" content={item.qty_flow_meter} />
        </Column>
      </Row>
      <Row style={{paddingLeft:7}}>
        <Column>
          <RowContainerContent title="Keterangan" content={item.keterangan} />
        </Column>
      </Row>
      <Vline/>
      <Row style={{padding:7}}>
        { this.state.status == 'input' &&
          <View style={{flex:1, flexDirection:'column', alignItems:'flex-end'}}>
            <Row>
              <BtnSm buttonStyle={{marginRight:4}} title="Edit" onPress={() => this.props.navigation.navigate('LogsheetPitstopSaranaEdit', {id: item.id, pitstopSaranaId: this.props.navigation.state.params.pitstopSaranaId } )}></BtnSm>
              <BtnSm buttonStyle={{backgroundColor:'red'}} title="Hapus" onPress={() => this.deleteLogsheet(item.id)}></BtnSm>
            </Row>
          </View>
        } 
        { this.state.status == 'rejected' &&
          <View style={{flex:1, flexDirection:'column', alignItems:'flex-end'}}>
            <Row>
              <BtnSm buttonStyle={{marginRight:4}} title="Edit" onPress={() => this.props.navigation.navigate('LogsheetPitstopSaranaEdit', {id: item.id, pitstopSaranaId: this.props.navigation.state.params.pitstopSaranaId } )}></BtnSm>
              <BtnSm buttonStyle={{backgroundColor:'red'}} title="Hapus" onPress={() => this.deleteLogsheet(item.id)}></BtnSm>
            </Row>
          </View>
        } 
      </Row>
    </Card>
  )

  render() {
    const pitstopSaranaId = this.props.navigation.state.params.pitstopSaranaId;
    const pitstopSaranaLine = this.props.navigation.state.params.pitstopSaranaLine;
    const pitstopSaranaNomor = this.props.navigation.state.params.pitstopSaranaNomor;
    const buttonAdd = this.state.detail.length == 0 ? true : false;
    const buttonAddAndApprove = this.state.status == 'input' || this.state.status == 'rejected' && this.state.detail.length < 30 && this.state.detail.length >= 1 ? true : false;
    const buttonApprove = this.state.detail.length == 30 ? true : false;

    return (
      <Container>
        <Content>
          <Loading loading={this.state.loading}/>
          <Card style={{borderColor:'#696969', borderRadius:3, borderWidth:1}}>
            <RowHeader> 
              <RowHeaderContent title="Fuelman" content={this.state.fuelman} />
              <RowHeaderContent title="WHS Number" content={this.state.whs_number} />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="Tanggal" content={this.state.tanggal} />
              <RowHeaderContent title="Location" content={this.state.location} />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="Shift" content={this.state.shift} />
              <RowHeaderContent title="Total QTY Solar" content={this.state.total_qty_solar} />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="Total Selisih Flow Meter" content={this.state.total_selisih_flow_meter} />
            </RowHeader>
          </Card>

          <FlatList 
            keyExtractor={this.keyExtractor}
            data={this.state.detail}
            renderItem={this.renderItem}
            onRefresh={() => this.handleRefresh() }
            refreshing={this.state.refreshing}
          />

        </Content>
        { buttonAddAndApprove &&
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='green' onPress={() => this.confirmFinishInputLogsheetWhenNotCompleteRecord()} >
              <Icon name='checkmark' style={{color:'white'}} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='blue' onPress={() => this.props.navigation.push('LogsheetPitstopSaranaCreate', { pitstopSaranaId: pitstopSaranaId, pitstopSaranaLine:pitstopSaranaLine, pitstopSaranaNomor:pitstopSaranaNomor })} >
              <Icon name='add' style={{color:'white'}} />
            </ActionButton.Item>
          </ActionButton>
        }
        { buttonApprove &&
          <ActionButton buttonColor="green" renderIcon={() => (<Icon name='checkmark' style={{color:'white'}} />)} onPress={() => this.finishInputDetail()}/>
        }
        { buttonAdd &&
          <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.push('LogsheetPitstopSaranaCreate', { pitstopSaranaId: pitstopSaranaId, pitstopSaranaLine:pitstopSaranaLine, pitstopSaranaNomor:pitstopSaranaNomor })}/>
        }
      </Container>
    );
  }

  handleRefresh = () => {
    const pitstopSaranaId = this.props.navigation.state.params.pitstopSaranaId;

    this.setState({ refreshing: true }, () => {
      this.findByCreatorWithDetail(pitstopSaranaId)
    })
  }

  findByCreatorWithDetail = (id) => {
    this.setLoading()
    ServicePitstopSarana.findByCreatorWithDetail(id)
      .then(res => {
        this.setState({
          id: res.id,
          driver: res.driver,
          fuelman: res.fuelman,
          tanggal: res.tanggal_view,
          shift: res.shift_view,
          whs_number: res.whs_number,
          location: res.location,
          status: res.status,
          total_qty_solar: String(res.total_qty_solar),
          total_selisih_flow_meter: String(res.selisih_flow_meter),
          detail: res.detail,
          refreshing: false
        })
        this.unsetLoading()
      })
      .catch(err => {
        this.unsetLoading()
      })
  }

  deleteLogsheet = (id) => {
    Alert.alert(
      'Apakah yakin akan menghapus Logsheet?',
      ``,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => {
            this.setLoading()
            ServicePitstopSarana.deleteLogsheet(id)
            .then(res => {
              if(res.success) {
                Toast.show({
                  text: 'Berhasil menghapus logsheet!',
                  buttonText: 'Okay',
                  type:'success'
                })
                this.handleRefresh();
                this.unsetLoading()
              } else {
                Toast.show({
                  text: 'Gagal menghapus logsheet!',
                  buttonText: 'Okay',
                  type:'success'
                })
                this.unsetLoading()
              }
            })
            .catch(err => {
              Toast.show({
                text: err.message,
                buttonText: 'Okay',
                type:'danger'
              })
              this.unsetLoading()
            })
          }
        },
      ],
    );
  }

  confirmFinishInputLogsheetWhenNotCompleteRecord = () => {
    Alert.alert(
      'Apakah yakin akan menyetujui input logsheet?',
      ``,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => this.finishInputDetail()
        }
      ]
    )
    }

  finishInputDetail = () => {
    this.setLoading()
    const pitstopSaranaId = this.props.navigation.state.params.pitstopSaranaId

    ServicePitstopSarana.finishInputDetail(pitstopSaranaId)
      .then(res => {
        if(res.success) {
          this.props.navigation.push('LogsheetPitstopSaranaIndex', { pitstopSaranaId:res.data.id })
        }
      })
      .catch(err => {
        Toast.show({
          text: err.message,
          buttonText: 'Okay',
          type:'danger'
        })
      })

      this.unsetLoading()
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