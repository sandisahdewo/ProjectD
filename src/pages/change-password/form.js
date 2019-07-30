import React,{Component} from 'react'
import APIPetugas from '../../services/petugas'
import { Button } from 'react-native-elements'
import User from '../../storages/async-storage/user'
import {Card, Container, Content, Toast} from 'native-base'
import {View, Text, KeyboardAvoidingView} from 'react-native'
import InputText from '../../components/input/FloatingLabelWithValidation'
import InputPassword from '../../components/input/PasswordWithValidation'

export default class Form extends Component{

  constructor(props) {
    super(props)

    this.state = {
      user: {
        pegawai: {}
      },
      password: '',
      password_confirmation: '',

      validation: {
        password: '',
        password_confirmation: ''
      }
    }
  }

  componentDidMount = () => {
    this.getUserLogin()
  }

  getUserLogin = async () => {
    const user = await User.getUser()
    this.setState({user})
  }

  update = async () => {
    this.setState({
      validation: {}
    })

    const formData = {
      password,
      password_confirmation
    } = this.state

    APIPetugas.updatePassword(formData, this.state.user.id)
      .then(res => {
        Toast.show({
          text: 'Berhasil mengubah password',
          buttonText: 'Okay',
          type:'success'
        })
      })
      .catch(err => {
        const error = err.response.data
        if(err.response.status == 422) {
          this.setState({
            validation: {
              password: error.errors.password,
              password_confirmation: error.errors.password_confirmation,
            }
          })
          Toast.show({
            text: error.message,
            buttonText: 'Oops',
            type:'danger'
          })
        } else {
          Toast.show({
            text: err.message,
            buttonText: 'Oops',
            type:'danger'
          })
        }
        
      })
  }

  render() {
    return(
      <Container>
        <Content>
          <KeyboardAvoidingView behavior="padding">
            <Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <InputText disable title='Username' value={this.state.user.username} />
                  <InputPassword title='Password' onChangeText={(password) => this.setState({password})} error={this.state.validation.password} />
                  <InputPassword title='Konfirmasi Password' onChangeText={(password_confirmation) => this.setState({password_confirmation})} error={this.state.validation.password_confirmation} />
                </View>
              </View>
            </Card>
            <View style={{flex:1, height:100, marginHorizontal:5}}>
              <Button title='Perbarui' onPress={() => this.update()}></Button>
            </View>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    )
  }

}