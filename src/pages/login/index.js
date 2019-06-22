import React, {Component} from 'react';
import {
  Text, View, KeyboardAvoidingView
} from 'react-native';
import { Container, Item, Input, Icon, Button } from 'native-base';


export default class Index extends Component {
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
              <Input placeholder='Username'/>
            </Item>
            <Item>
              <Icon active name='lock' />
              <Input placeholder='Password'/>
            </Item>
            <View style={{marginTop:10}}>
              <Button block info style={{backgroundColor:"#2089dc", height:40, paddingHorizontal:20}}
               onPress={() => this.props.navigation.navigate('TabIndex')}
              >
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}> Login </Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Container>
    );
  }
}