import React, {Component} from 'react';
import Login from '../../services/login';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import Identity from '../../services/config/identity';
import { Container, Item, Input, Icon, Button, Toast } from 'native-base';

export default class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',

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
              <Button block info style={{backgroundColor:"#2089dc", height:40, paddingHorizontal:20}}
               onPress={() => this.attempt()}
              >
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}> Login </Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Container>
    );
  }

  checkTokenValid = async () => {
    let token = await Identity.getAccessToken();
    if(token !== null) {
      this.props.navigation.navigate('TabIndex');
    }
  }

  attempt = async () => {
    this.setState({
      validation: {}
    })
    const formData = {
      username: this.state.username,
      password: this.state.password
    }

    await Login.Attempt(formData)
      .then(res => {
        if(res.success) {
          Identity.setUser(res.user);
          Identity.setAccessToken(res.access_token);
          this.props.navigation.navigate('TabIndex');
        }
      })
      .catch(err => {
        const validation = err.response.data.errors;
        if(validation) {
          this.setState({
            validation: {
              username: validation.username,
              password: validation.password,
            }
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