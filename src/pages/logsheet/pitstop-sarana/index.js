import React, {Component} from 'react';
import Row from '../../../components/row';
import Vline from '../../../components/line';
import Column from '../../../components/column';
import BtnSm from '../../../components/button/small';
import ActionButton from 'react-native-action-button';
import { Container, Content, Card, Toast } from 'native-base';
import RowHeader from '../../../components/logsheet/row-header';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import ServicePitstopSarana from '../../../services/pitstop-sarana';
import RowHeaderContent from '../../../components/logsheet/row-header-content';
import RowContainerContent from '../../../components/logsheet/row-container-content';

export default class Index extends Component {
  static navigationOptions = {
  };

  constructor(props) {
    super(props)

    this.state = {
      driver: '',
      fuelman: '',
      tanggal: '',
      shift: '',
      whs_number: '',
      location: '',
      total_qty_solar: '',
      detail: [],
      refreshing: false
    }
  }

  componentDidMount = () => {
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
      <Row style={{padding:7}}>
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
      <Vline/>
      <Row style={{padding:7}}>
        <View style={{flex:1, flexDirection:'column', alignItems:'flex-end'}}>
          <Row>
            <BtnSm buttonStyle={{marginRight:4}} title="Edit" onPress={() => this.props.navigation.navigate('LogsheetPitstopSaranaEdit', {id: item.id, pitstopSaranaId: this.props.navigation.state.params.pitstopSaranaId } )}></BtnSm>
            <BtnSm buttonStyle={{backgroundColor:'red'}} title="Hapus" onPress={() => this.deleteLogsheet(item.id)}></BtnSm>
          </Row>
        </View>
      </Row>
    </Card>
  )

  render() {
    const pitstopSaranaId = this.props.navigation.state.params.pitstopSaranaId;

    return (
      <Container>
        <Content>
          <Card>
            <RowHeader> 
              <RowHeaderContent title="Driver" content={this.state.driver} />
              <RowHeaderContent title="Fuelman" content={this.state.fuelman} />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="Tanggal" content={this.state.tanggal} />
              <RowHeaderContent title="Shift" content={this.state.shift} />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="WHS Number" content={this.state.whs_number} />
              <RowHeaderContent title="Location" content={this.state.location} />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="Total QTY Solar" content={this.state.total_qty_solar} />
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
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('LogsheetPitstopSaranaCreate', { pitstopSaranaId: pitstopSaranaId })}/>
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
    ServicePitstopSarana.findByCreatorWithDetail(id)
      .then(res => {
        this.setState({
          driver: res.driver,
          fuelman: res.fuelman,
          tanggal: res.tanggal_view,
          shift: res.shift_view,
          whs_number: res.whs_number,
          location: res.location,
          total_qty_solar: String(res.total_qty_solar),
          detail: res.detail,
          refreshing: false
        })
      })
      .catch(err => {
        console.log('err', err)
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
            ServicePitstopSarana.deleteLogsheet(id)
            .then(res => {
              if(res.success) {
                Toast.show({
                  text: 'Berhasil menghapus logsheet!',
                  buttonText: 'Okay',
                  type:'success'
                })
                this.handleRefresh();
              } else {
                Toast.show({
                  text: 'Gagal menghapus logsheet!',
                  buttonText: 'Okay',
                  type:'success'
                })
              }
            })
            .catch(err => {
              Toast.show({
                text: err.message,
                buttonText: 'Okay',
                type:'danger'
              })
            })
          }
        },
      ],
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})