import React, {Component} from 'react';

import { format } from 'date-fns';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements';
import ServiceUnit from '../../../services/unit';
import ServicePitstopSarana from '../../../services/pitstop-sarana';
import { Container, Content, Card, Item, Label, Icon, Input, Toast, Textarea } from 'native-base';
import InputFloatingLabelWithValidation from '../../../components/input/FloatingLabelWithValidation'
import { View, Text, KeyboardAvoidingView, StyleSheet, TimePickerAndroid, FlatList, TouchableWithoutFeedback } from 'react-native';

export default class Create extends Component {

  constructor(props) {
    super(props)

    this.state = {
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
      }
    }
  }

  componentDidMount = () => {
    this.setState({
      tanggal: format(new Date(), 'DD-MM-YYYY'),
      jam: format(new Date(), 'HH:mm:ss'),
    })
    this.findLastLogsheet()
  }

  keyExtractorModal = (item, index) => index.toString()

  renderItemModal = ({item}) => (
    <TouchableWithoutFeedback onPress={() => this.setSelectedUnit(item) }>
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
      <Container>
        <Content>
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
                  <Text style={{fontSize:18, marginLeft:10, marginTop:5}}>Cari & Pilih Unit</Text>
                </View>
                <View>
                  <Item regular>
                    <Icon name='search' type='Feather' style={{color: '#808080'}} />
                    <Input placeholder='Tulis min 3 karakter' onChangeText={(query) => this.searchUnit(query) } />
                  </Item>
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
    );
  }

  findLastLogsheet = () => {
    ServicePitstopSarana.findLastLogsheet()
      .then(res => {
        this.setState({
          flow_meter_awal: String(res.flow_meter_akhir)
        })
      })
      .catch(err => {})
  }

  toggleModalFindUnit = () => {
    this.setState({ 
      listUnit: [],
      showModal: !this.state.showModal 
    })
  }

  searchUnit = (query) => {
    if(query.length >= 3) {
      ServiceUnit.search(query)
      .then(res => {
        if(res.length > 0) {
          this.setState({ 
            listUnit: res,
            unitNotFound: false 
          })
        } else {
          this.setState({
            unitNotFound: true,
            listUnit: []
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
  }

  setSelectedUnit = (item) => {
    this.setState({
      kode_unit: item.kode_unit,
      tipe_unit: item.tipe_unit,
      no_polisi: item.no_polisi,
      jatah_solar: item.jatah_solar
    }, () => {
      this.toggleModalFindUnit();
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
    } else {
      this.setState({ selisih_flow_meter: '0' })
    }
  }

  store = () => {
    const pitstopSaranaId = this.props.navigation.state.params.pitstopSaranaId;
    console.log('sarana id di create', pitstopSaranaId)
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
          this.props.navigation.push('LogsheetPitstopSaranaIndex', {pitstopSaranaId: pitstopSaranaId})
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
        } else {
          Toast.show({
            text: 'Gagal menyimpan logsheet pitstop sarana!',
            buttonText: 'Okay',
            type:'danger'
          })
        }
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