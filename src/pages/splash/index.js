import React, {Component} from 'react'
import {View, Text} from 'react-native'
import User from '../../storages/async-storage/user'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.checkUserHasLogin()
  }

  checkUserHasLogin = async () => {
    let user = await User.getAccessToken()
    if(user) this.props.navigation.navigate('App')
    else this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Loading...</Text>
      </View>
    )
  }
}