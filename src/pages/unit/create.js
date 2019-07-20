import React, {Component} from 'react';
import {Card, Toast} from 'native-base';
import ServiceUnit from '../../services/unit';
import {Button} from 'react-native-elements';
import {View, KeyboardAvoidingView, Text} from 'react-native';
import InputWithValidation from '../../components/input/FloatingLabelWithValidation';

export default class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kode_unit: '',
      tipe_unit: '',
      no_polisi: '',
      jatah_solar: '',

      validation: {
        kode_unit: '',
        tipe_unit: '',
        no_polisi: '',
        jatah_solar: '',
      }
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <KeyboardAvoidingView behavior='padding'>
          <Card style={{padding:4, paddingTop:10, paddingBottom:10}}>
            <InputWithValidation title='Kode Unit' onChangeText={(kode_unit) => this.setState({kode_unit})} error={this.state.validation.kode_unit} />
            <InputWithValidation title='Tipe Unit' onChangeText={(tipe_unit) => this.setState({tipe_unit})} error={this.state.validation.tipe_unit} />
            <InputWithValidation title='No Polisi' onChangeText={(no_polisi) => this.setState({no_polisi})} error={this.state.validation.no_polisi} />
            <InputWithValidation title='Jatah Solar' onChangeText={(jatah_solar) => this.setState({jatah_solar})} error={this.state.validation.jatah_solar} />
            <View>
              <Button title='Simpan' onPress={() => this.store()}></Button>
            </View>
          </Card>
        </KeyboardAvoidingView>
      </View>
    );
  }

  store = () => {
    this.setState({
      validation: {}
    })
    const formData = {
      kode_unit, tipe_unit, no_polisi, jatah_solar
    } = this.state;

    ServiceUnit.store(formData)
      .then(res => {
        if(res.success) {
          Toast.show({
            text: 'Berhasil menyimpan unit!',
            buttonText: 'Okay',
            type:'success'
          })
          this.props.navigation.navigate('UnitIndex');
        }
      })
      .catch(err => {
        let error = err.response.data.errors;
        if(error) {
          this.setState({
            validation: {
              kode_unit: error.kode_unit,
              tipe_unit: error.tipe_unit,
              no_polisi: error.no_polisi,
              jatah_solar: error.jatah_solar,
            }
          })
        } 
        Toast.show({
          text: 'Gagal menyimpan unit!',
          buttonText: 'Okay',
          type:'danger'
        })
      })
  }
}
