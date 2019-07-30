import React, {Component} from 'react';
import Login from '../../services/login';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import User from '../../storages/async-storage/user';
import { Container, Item, Input, Icon, Button, Toast } from 'native-base';

export default class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loginLoading: false,

      validation: {
        username: '',
        password: ''
      }
    }

    this.checkTokenValid();
  }

  render() {
    return (
      <Container>
        <View style={{justifyContent:'center', flex:1, paddingHorizontal:15}}>
          <KeyboardAvoidingView behavior="padding">
            <View style={{justifyContent: 'center', marginBottom:30, flexDirection:'row'}}>
              <Icon style={{fontSize:50, paddingRight:10}} active name='cube' />
              <Text style={{fontSize:40, color:'black'}}>Project-D</Text>
            </View>
            <Item>
              <Icon active name='person' />
              <Input placeholder='Username' onChangeText={(username) => this.setState({username}) }/>
            </Item>
            <Text style={{fontSize:12, color:'red'}}>{this.state.validation.username}</Text>
            <Item>
              <Icon active name='lock' />
              <Input secureTextEntry placeholder='Password' onChangeText={(password) => this.setState({password}) }/>
            </Item>
            <Text style={{fontSize:12, color:'red'}}>{this.state.validation.password}</Text>
            <View style={{marginTop:10}}>
              <Button disabled={this.state.loginLoading} block info style={{backgroundColor:"#2089dc", height:40, paddingHorizontal:20}}
               onPress={() => this.attempt()}
              >
                { this.state.loginLoading ?
                  <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}> Loading... </Text>
                  :
                  <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}> Login </Text>
                }
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Container>
    );
  }

  checkTokenValid = async () => {
    let token = await User.getAccessToken();
    if(token !== null) {
      this.props.navigation.navigate('TabIndex');
    }
  }

  attempt = async () => {
    this.setState({
      validation: {},
      loginLoading: true
    })
    const formData = {
      username: this.state.username,
      password: this.state.password
    }

    await Login.Attempt(formData)
      .then(res => {
        if(res.success) {
          User.setUser(res.user);
          User.setAccessToken(res.access_token);
          this.props.navigation.navigate('TabIndex');
        } else {
          Toast.show({
            text: 'Username & password salah',
            buttonText: 'Oops',
            type:'danger'
          })
          this.setState({
            loginLoading: false
          })
        }
      })
      .catch(err => {
        const validation = err.response.data.errors;
        if(validation) {
          this.setState({
            validation: {
              username: validation.username,
              password: validation.password,
            },
            loginLoading: false
          })
        } else {
          Toast.show({
            text: err.message,
            buttonText: 'Okay',
            type:'danger'
          })
        }
      })
  }
}