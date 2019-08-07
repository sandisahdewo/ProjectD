import React, {Component} from 'react';

import { format } from 'date-fns';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements';
import ServiceUnit from '../../../services/unit';
import Loading from '../../../components/loading'
import BarCodeScanner from '../../../components/camera/scan-barcode'
import ServicePitstopSarana from '../../../services/pitstop-sarana'
import { Container, Content, Card, Item, Label, Icon, Input, Toast, Textarea } from 'native-base';
import InputFloatingLabelWithValidation from '../../../components/input/FloatingLabelWithValidation'
import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';

export default class Create extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('scanBarcodeOpen') ? 'Scan QR Code' : 'Tambah Logsheet',
      headerLeft: (
        navigation.getParam('scanBarcodeOpen') 
        ? 
        <TouchableWithoutFeedback onPress={navigation.getParam('toggleScanBarcode')}>
          <Icon name='close' style={{color:'white', paddingLeft:20, fontSize:24}} />
        </TouchableWithoutFeedback>
        :
        <TouchableWithoutFeedback>
          <Icon name='arrow-back' style={{color:'white', paddingLeft:20, fontSize:24}} />
        </TouchableWithoutFeedback>
      )
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false,

      tanggal: '',
      jam: '',

      kode_unit: '',
      tipe_unit: '',
      hm_km: '',
      no_polisi: '',
      jatah_solar: '',
      nama_user: '',
      qty_solar: '',
      flow_meter_awal: '',
      flow_meter_akhir: '',
      selisih_flow_meter: '',
      keterangan: '',

      unitNotFound: false,
      listUnit: [],

      validation: {
        kode_unit: '',
        tipe_unit: '',
        hm_km: '',
        no_polisi: '',
        jatah_solar: '',
        nama_user: '',
        qty_solar: '',
        flow_meter_awal: '',
        flow_meter_akhir: '',
        selisih_flow_meter: '',
      },

      scanBarcodeOpen: false,
      barcode: '',

      pitstopSaranaLine: this.props.navigation.state.params.pitstopSaranaLine,
      pitstopSaranaNomor: this.props.navigation.state.params.pitstopSaranaNomor,
      pitstopSaranaId: this.props.navigation.state.params.pitstopSaranaId
    }
  }

  componentDidMount = () => {
    this.props.navigation.addListener('willFocus', 
      () => {
        this.setState({
          tanggal: format(new Date(), 'DD-MM-YYYY'),
          jam: format(new Date(), 'HH:mm:ss'),
        })
        this.findLastLogsheet()
      }
    )
  }

  keyExtractorModal = (item, index) => index.toString()

  renderItemModal = ({item}) => (
    <TouchableWithoutFeedback onPress={() => {this.setSelectedUnit(item); this.toggleModalFindUnit()} }>
      <View style={{borderColor:'#808080', padding:5, borderBottomWidth:0.5}}>
        <Text>{item.kode_unit}</Text>
        <Text>{item.no_polisi}</Text>
        <Text>{item.tipe_unit}</Text>
        <Text>{item.jatah_solar}</Text>
      </View>
    </TouchableWithoutFeedback>
  )

  render() {
    return (
      <View style={{flex:1}}>
        { this.state.scanBarcodeOpen &&
          <BarCodeScanner handleOnBarCodeRead={(barcode) => this.handleOnBarCodeRead(barcode)}/>
        }
        {! this.state.scanBarcodeOpen &&
        <Container>
          <Content>
            <Loading loading={this.state.loading} />
            <KeyboardAvoidingView behavior="padding">
              <Card style={{marginLeft:5, marginRight:5}}>
                <View style={{flex:1}}>
                  <View style={{margin:5}}>
                    <Text>
                      WAKTU
                    </Text>
                  </View>
                  <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                  <View style={{marginTop:10, marginHorizontal:6}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                      <View style={{flex:1, marginBottom:7}}>
                        <Item floatingLabel>
                          <Label style={{fontSize:12}}>Tanggal</Label>
                          <Input value={this.state.tanggal} />
                        </Item>
                      </View>
                      <View style={{flex:1, marginBottom:7}}>
                        <Item floatingLabel>
                          <Label style={{fontSize:12}}>Jam</Label>
                          <Input value={this.state.jam} onTouchStart={() => setTime() } />
                        </Item>
                      </View>
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
                    <InputFloatingLabelWithValidation title='Kode Unit' onTouchStart={ () => this.toggleModalFindUnit() } value={this.state.kode_unit} error={this.state.validation.kode_unit} />
                    <InputFloatingLabelWithValidation title='Model Unit' value={this.state.tipe_unit} error={this.state.validation.driver} disabled />
                    <InputFloatingLabelWithValidation title='No Polisi' value={this.state.no_polisi} error={this.state.validation.no_polisi} disabled />
                    <InputFloatingLabelWithValidation title='HM/KM' onChangeText={(hm_km) => this.setState({hm_km}) } value={this.state.hm_km} keyboardType='number-pad' error={this.state.validation.hm_km} />
                  </View>
                </View>
              </Card>

              <Card style={{marginLeft:5, marginRight:5}}>
                <View style={{flex:1}}>
                  <View style={{margin:5}}>
                    <Text>
                      SOLAR
                    </Text>
                  </View>
                  <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                  <View style={{marginTop:10, marginHorizontal:6}}>
                    <InputFloatingLabelWithValidation title='Jatah Solar' value={this.state.jatah_solar} error={this.state.validation.jatah_solar} disabled/>

                    <InputFloatingLabelWithValidation title='QTY Solar' onChangeText={(qty_solar) => this.setState({qty_solar})} error={this.state.validation.qty_solar} keyboardType='number-pad'/>
                  </View>
                </View>
              </Card>

              <Card style={{marginLeft:5, marginRight:5}}>
                <View style={{flex:1}}>
                  <View style={{margin:5}}>
                    <Text>
                      USER
                    </Text>
                  </View>
                  <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                  <View style={{marginTop:10, marginHorizontal:6}}>
                    <InputFloatingLabelWithValidation title='Nama User' onChangeText={(nama_user) => this.setState({nama_user})} error={this.state.validation.nama_user}/>
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
                    <InputFloatingLabelWithValidation title='Flow Meter Awal' value={this.state.flow_meter_awal} onChangeText={(flow_meter_awal) => this.setFlowMeterAwal(flow_meter_awal) } error={this.state.validation.flow_meter_awal} keyboardType='number-pad'/>
                    <InputFloatingLabelWithValidation title='Flow Meter Akhir' onChangeText={(flow_meter_akhir) => this.setFlowMeterAkhir(flow_meter_akhir) } error={this.state.validation.flow_meter_akhir} keyboardType='number-pad'/>
                    <InputFloatingLabelWithValidation title='Selisih Flow Meter' value={this.state.selisih_flow_meter} error={this.state.validation.flow_meter_akhir} disabled/>
                  </View>
                </View>
              </Card>

              <Card style={{marginLeft:5, marginRight:5}}>
                <View style={{flex:1}}>
                  <View style={{margin:5}}>
                    <Text>
                      KETERANGAN
                    </Text>
                  </View>
                  <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                  <View style={{marginTop:10, marginHorizontal:6}}>
                    <Textarea onChangeText={(keterangan) => this.setState({keterangan})} rowSpan={3} />
                  </View>
                </View>
              </Card>

              <View style={{flex:1, height:100, marginHorizontal:5}}>
                <Button title='Simpan' onPress={() => this.store()}></Button>
              </View>

              <Modal isVisible={this.state.showModal} 
                style={styles.bottomModal}
                swipeDirection={['right', 'down']}
                onSwipeComplete={() => this.toggleModalFindUnit()}
              >
                <View style={{flex:1, paddingHorizontal:8, paddingBottom:8, backgroundColor:'white'}}>
                  <View style={{flexDirection:'row', padding:10}}>
                    <TouchableWithoutFeedback onPress={() => this.toggleModalFindUnit() }>
                      <Icon name='ios-close' style={{fontSize:35, color: '#808080'}} />
                    </TouchableWithoutFeedback>
                      <Text style={{fontSize:18, marginLeft:10, marginTop:5}}>Cari atau Scan Barcode Unit</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{flex:8}}>
                      <Item regular>
                        <Icon name='search' style={{color: '#C0C0C0'}} />
                        <Input placeholder='Tulis min 3 karakter' onChangeText={(query) => this.searchUnit(query) } />
                      </Item>
                    </View>
                    <View style={{flex:2, marginLeft:10}}>
                      <Button 
                        buttonStyle={{backgroundColor:'white', borderColor:'#C0C0C0', borderWidth:1}}
                        icon={
                          <Icon name='qrcode' type='FontAwesome' style={{fontSize:35, color: '#C0C0C0'}} />
                        }
                        onPress={() => this.toggleScanBarcode()}
                      />
                    </View>
                  </View>
                  <View>
                    <FlatList
                      keyExtractor={this.keyExtractorModal}
                      data={this.state.listUnit}
                      renderItem={this.renderItemModal}
                    />
                    {(this.state.unitNotFound) &&
                      <View>
                        <Text>Data Unit tidak ditemukan, coba cari dengan kata kunci lainnya.</Text>
                      </View>
                    }
                  </View>
                </View>
              </Modal>
            <View style={{paddingHorizontal:8, paddingBottom:8, backgroundColor:'white'}}></View>
            </KeyboardAvoidingView>
          </Content>
        </Container>
        }
      </View>
    );
  }

  findLastLogsheet = () => {
    this.setLoading()
    const pitstopSaranaLine = this.state.pitstopSaranaLine;
    const pitstopSaranaNomor = this.state.pitstopSaranaNomor;
    ServicePitstopSarana.findLastLogsheet(pitstopSaranaLine, pitstopSaranaNomor)
      .then(res => {
        this.setState({
          flow_meter_awal: String(res.flow_meter_akhir)
        })
        this.unsetLoading()
      })
      .catch(err => {
        this.unsetLoading()
      })
  }

  toggleModalFindUnit = () => {
    this.setState({ 
      listUnit: [],
      showModal: !this.state.showModal 
    })
  }

  searchUnit = (query) => {
    if(query.length >= 3) {
      this.setLoading()
      ServiceUnit.search(query)
      .then(res => {
        if(res.length > 0) {
          this.setState({ 
            listUnit: res,
            unitNotFound: false 
          })
          this.unsetLoading()
        } else {
          this.setState({
            unitNotFound: true,
            listUnit: []
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
  }

  findUnitByKode = (kode) => {
    console.log('kode unit', kode)
    this.setLoading()
    ServiceUnit.findByKode(kode)
      .then(res => {
        console.log('ress', res)
        if(res.success) {
          this.setSelectedUnit(res.data)
          this.unsetLoading()
        } else {
          Toast.show({
            text: 'Data Unit tidak ditemukan.',
            buttonText: 'Okay',
            type:'danger'
          })
          this.setState({
            kode_unit: '',
            tipe_unit: '',
            no_polisi: '',
            jatah_solar: ''
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

  toggleScanBarcode = () => {
    console.log('toggle scan barcode')
    this.setState({
      scanBarcodeOpen: !this.state.scanBarcodeOpen
    }, () => {
      this.props.navigation.setParams({ 
        scanBarcodeOpen: this.state.scanBarcodeOpen, 
        toggleScanBarcode: this.toggleScanBarcode,
      })
    })
  }

  handleOnBarCodeRead = (barcode) => {
      if(barcode.data != null) {
        this.toggleScanBarcode()
        this.toggleModalFindUnit()
        this.findUnitByKode(barcode.data)
      }
  }

  setSelectedUnit = (item) => {
    this.setState({
      kode_unit: item.kode_unit,
      tipe_unit: item.tipe_unit,
      no_polisi: item.no_polisi,
      jatah_solar: item.jatah_solar
    })
  }

  setFlowMeterAwal = (flow_meter_awal) => {
    this.setState({flow_meter_awal}, () => {
      this.countSelisihFlowMeter();
    });
  }

  setFlowMeterAkhir = (flow_meter_akhir) => {
    this.setState({flow_meter_akhir}, () => {
      this.countSelisihFlowMeter();
    });
  }

  countSelisihFlowMeter = () => {
    let akhir = this.state.flow_meter_akhir;
    let awal = this.state.flow_meter_awal;
    if(awal.length > 0 && akhir > awal) {
      let selisih = akhir-awal;
      this.setState({ selisih_flow_meter: selisih.toString() })
      console.log(selisih)
    } else {
      this.setState({ selisih_flow_meter: '0' })
    }
  }

  store = () => {
    this.setLoading()
    const pitstopSaranaId = this.state.pitstopSaranaId;
    const formData = {
      pitstop_sarana_id: pitstopSaranaId,
      jam: this.state.jam,
      kode_unit: this.state.kode_unit,
      hm_km: this.state.hm_km,
      qty_solar: this.state.qty_solar,
      jatah_solar: this.state.jatah_solar,
      nama_user: this.state.nama_user,
      flow_meter_awal: this.state.flow_meter_awal,
      flow_meter_akhir: this.state.flow_meter_akhir,
      selisih_flow_meter: this.state.selisih_flow_meter,
      keterangan: this.state.keterangan,
    }

    ServicePitstopSarana.storeLogsheet(formData)
      .then(res => {
        if(res.success) {
          Toast.show({
            text: 'Berhasil menyimpan logsheet pitstop sarana!',
            buttonText: 'Okay',
            type:'success'
          })
          this.resetForm()
          this.unsetLoading()
          this.props.navigation.push('LogsheetPitstopSaranaIndex', {
            pitstopSaranaId: this.state.pitstopSaranaId,
            pitstopSaranaLine: this.state.pitstopSaranaLine,
            pitstopSaranaNomor: this.state.pitstopSaranaNomor,
          })
        }
      })
      .catch(err => {
        let error = err.response.data.errors;
        if(error) {
          this.setState({
            validation: {
              kode_unit: error.kode_unit,
              tipe_unit: '',
              hm_km: error.hm_km,
              no_polisi: '',
              jatah_solar: '',
              nama_user: error.nama_user,
              qty_solar: error.qty_solar,
              flow_meter_awal: error.flow_meter_awal,
              flow_meter_akhir: error.flow_meter_akhir,
              selisih_flow_meter: '',
            }
          })
          this.unsetLoading()
        } else {
          Toast.show({
            text: 'Gagal menyimpan logsheet pitstop sarana!',
            buttonText: 'Okay',
            type:'danger'
          })
          this.unsetLoading()
        }
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

  resetForm = () => {
    this.setState({
      kode_unit: '',
      tipe_unit: '',
      hm_km: '',
      no_polisi: '',
      jatah_solar: '',
      nama_user: '',
      qty_solar: '',
      flow_meter_awal: '',
      flow_meter_akhir: '',
      selisih_flow_meter: '',
      keterangan: '',

      validation: {}
    }, () => {
      this.findLastLogsheet()
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