import React, {Component} from 'react';
import {Card, Toast} from 'native-base';
import ServiceUnit from '../../services/unit';
import {Button} from 'react-native-elements';
import {View, KeyboardAvoidingView, Alert} from 'react-native';
import InputWithValidation from '../../components/input/FloatingLabelWithValidation';

export default class Edit extends Component {
  
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

  componentDidMount = () => {
    this.find();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <KeyboardAvoidingView behavior='padding'>
          <Card style={{padding:4, paddingTop:10, paddingBottom:10}}>
            <InputWithValidation title='Kode Unit' value={this.state.kode_unit} onChangeText={(kode_unit) => this.setState({kode_unit})} error={this.state.validation.kode_unit} />
            <InputWithValidation title='Tipe Unit' value={this.state.tipe_unit} onChangeText={(tipe_unit) => this.setState({tipe_unit})} error={this.state.validation.tipe_unit} />
            <InputWithValidation title='No Polisi' value={this.state.no_polisi} onChangeText={(no_polisi) => this.setState({no_polisi})} error={this.state.validation.no_polisi} />
            <InputWithValidation title='Jatah Solar' value={this.state.jatah_solar} onChangeText={(jatah_solar) => this.setState({jatah_solar})} error={this.state.validation.jatah_solar} />
            <View>
              <Button title='Perbarui' onPress={() => this.update()}></Button>
            </View>
            <View style={{marginTop:7}}>
              <Button title='Hapus' buttonStyle={{backgroundColor:'red'}} onPress={() => this.destroy()}></Button>
            </View>
          </Card>
        </KeyboardAvoidingView>
      </View>
    );
  }

  find = () => {
    const id = this.props.navigation.state.params.unitId;
    ServiceUnit.find(id)
      .then(res => {
        this.setState({
          kode_unit: res.kode_unit,
          tipe_unit: res.tipe_unit,
          no_polisi: res.no_polisi,
          jatah_solar: res.jatah_solar
        })
      })
      .catch(err => {
        Toast.show({
          text: err.message,
          buttonText: 'Okay',
          type:'danger'
        })
      })
  }

  update = () => {
    this.setState({
      validation: {}
    })
    const id = this.props.navigation.state.params.unitId;
    const formData = { kode_unit, tipe_unit, no_polisi, jatah_solar } = this.state;

    ServiceUnit.update(id, formData)
      .then(res => {
        if(res.success) {
          Toast.show({
            text: 'Berhasil memperbarui unit!',
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
          text: 'Gagal memperbarui unit!',
          buttonText: 'Okay',
          type:'danger'
        })
      })
  }

  destroy = () => {
    const id = this.props.navigation.state.params.unitId;
    Alert.alert(
      'Apakah yakin akan menghapus unit?',
      ``,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => {
            ServiceUnit.destroy(id)
            .then(res => {
              if(res.success) {
                Toast.show({
                  text: 'Berhasil menghapus unit!',
                  buttonText: 'Okay',
                  type:'success'
                })
                this.props.navigation.navigate('UnitIndex');
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
