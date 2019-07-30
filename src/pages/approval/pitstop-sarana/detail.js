import React, {Component} from 'react';
import Row from '../../../components/row';
import Column from '../../../components/column';
import { FlatList, Alert, Text, View } from 'react-native';
import RowHeader from '../../../components/logsheet/row-header';
import ServicePitstopSarana from '../../../services/pitstop-sarana';
import { Container, Content, Card, Button, Icon, Toast } from 'native-base';
import RowHeaderContent from '../../../components/logsheet/row-header-content';
import RowContainerContent from '../../../components/logsheet/row-container-content';
import Loading from '../../../components/loading'

export default class Detail extends Component {
  static navigationOptions = {
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
      total_qty_solar: '',
      status: '',
      total_selisih_flow_meter: '',
      detail: [],
      refreshing: false
    }
  }

  componentDidMount = () => {
    const pitstopSaranaId = this.props.navigation.state.params.pitstopSaranaId;
    const pitstopSaranaNomor = this.props.navigation.state.params.pitstopSaranaNomor;
    this.findWithDetail(pitstopSaranaId);
  }

  approveItem = (id) => {
    Alert.alert(
      'Apakah yakin akan menyetujui Logsheet?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.approve(id) },
      ],
    );
  }

  rejectItem = (id) => {
    Alert.alert(
      'Apakah yakin akan tidak menyetujui Logsheet?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.reject(id) },
      ],
    );
  }

	keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
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
      </Card>
  );

  render() {
    const showRejectButton = this.state.status == 'finish-input' ? true : false;
    const showApproveButton = this.state.status == 'finish-input' || this.state.status == 'rejected' ? true : false;
    const showDownloadButton = this.state.status == 'approved' ? true : false;

    return (
      <Container>
        <Content>
          <Loading loading={this.state.loading}/>
          <Card>
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
					/>

          <View style={{flex:1, flexDirection:'row', marginBottom:2}}>
          {showApproveButton && 
            <View style={{flex:1, margin:4}}>
              <Button iconLeft full success onPress={() => this.approveItem(this.state.id) }>
                <Icon name='checkmark' />
                <Text style={{color:'white', fontSize:16, marginLeft:5}}>Approve</Text>
              </Button>
            </View>
          }
          {showRejectButton && 
            <View style={{flex:1, margin:4}}>
              <Button iconLeft full danger onPress={() => this.rejectItem(this.state.id) }>
                <Icon name='close' />
                <Text style={{color:'white', fontSize:16, marginLeft:5}}>Reject</Text>
              </Button>
            </View>
          }
          {showDownloadButton && 
            <View style={{flex:1, margin:4}}>
              <Button iconLeft full success onPress={() => this.downloadExcel(this.state.id) }>
                <Icon name='file-excel-o' type='FontAwesome' />
                <Text style={{color:'white', fontSize:16, marginLeft:5}}>Download Excel</Text>
              </Button>
              <Button iconLeft full success onPress={() => this.downloadPDF(this.state.id) } style={{marginTop:10, backgroundColor:'#1E90FF'}}>
                <Icon name='file-pdf-o' type='FontAwesome' />
                <Text style={{color:'white', fontSize:16, marginLeft:5}}>Download PDF</Text>
              </Button>
            </View>
          }
          </View>
        </Content>
      </Container>
    );
  }

  findWithDetail = (id) => {
    ServicePitstopSarana.findServiceWithDetail(id)
      .then(res => {
        this.setState({
          loading: false,
          id: res.id,
          driver: res.driver,
          fuelman: res.fuelman,
          tanggal: res.tanggal_view,
          shift: res.shift_view,
          whs_number: res.whs_number,
          location: res.location,
          total_qty_solar: String(res.total_qty_solar),
          status: res.status,
          total_selisih_flow_meter: String(res.selisih_flow_meter),
          detail: res.detail,
        })
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  approve = (id) => {
    this.setLoading()
    const pitstopSaranaNomor = this.props.navigation.state.params.pitstopSaranaNomor;
    ServicePitstopSarana.approve(id)
      .then(res => {
        if(res.success) {
          Toast.show({
            text: 'Berhasil approve pitstop sarana!',
            buttonText: 'Okay',
            type:'success'
          })
          this.props.navigation.navigate('ApprovalPitstopSaranaIndex', { pitstopSaranaNomor : pitstopSaranaNomor })
        } else {
          Toast.show({
            text: 'Gagal approve pitstop sarana!',
            buttonText: 'Okay',
            type:'danger'
          })
        }
        this.unsetLoading()
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

  reject = (id) => {
    this.setLoading()
    const pitstopSaranaNomor = this.props.navigation.state.params.pitstopSaranaNomor;

    ServicePitstopSarana.reject(id)
    .then(res => {
      if(res.success) {
        Toast.show({
          text: 'Berhasil reject pitstop sarana!',
          buttonText: 'Okay',
          type:'success'
        })
        this.props.navigation.navigate('ApprovalPitstopSaranaIndex', { pitstopSaranaNomor : pitstopSaranaNomor })
      } else {
        Toast.show({
          text: 'Gagal reject pitstop sarana!',
          buttonText: 'Okay',
          type:'danger'
        })
      }
      this.unsetLoading()
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

  downloadExcel = (id) => {
    this.setLoading()
    const title = `pitstop-sarana ${this.state.fuelman} ${this.state.tanggal} ${this.state.shift}.xlsx`;
    ServicePitstopSarana.exportExcel(id, title)
      .then(res => {
        Toast.show({
          text: 'Berhasil export laporan pitstop sarana!',
          buttonText: 'Okay',
          type:'success'
        })
        this.unsetLoading()
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

  downloadPDF = (id) => {
    this.setLoading()
    const title = `pitstop-sarana ${this.state.fuelman} ${this.state.tanggal} ${this.state.shift}.pdf`;
    ServicePitstopSarana.exportPDF(id, title)
      .then(res => {
        Toast.show({
          text: 'Berhasil export PDF pitstop sarana!',
          buttonText: 'Okay',
          type:'success'
        })
        this.unsetLoading()
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