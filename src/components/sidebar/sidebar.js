import React from "react";
import { Container, Content, Text, Thumbnail, View } from "native-base";
import BtnSidebar from '../../components/button/sidebar';
import User from '../../storages/async-storage/user'

export default class SideBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {
        petugas: {}
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

  logout = async() => {
    await User.removeAccessToken()
    await User.removeUser()

    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{flex:1, backgroundColor: '#3C8DBC', height: 150, paddingTop: 20}}>
            <View style={{ flex:1, flexDirection:'column', alignItems:'center' }}>
              <Thumbnail large source={{uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}} />
              <Text style={{ paddingTop:5, fontSize:16, color:'white' }}>
                {this.state.user.petugas.nama}
              </Text>
              <Text style={{fontSize:12, color:'white' }}>
                {this.state.user.peran_view }
              </Text>
            </View>
          </View>
          <View style={{flex:1, marginVertical:7, marginHorizontal: 10}}>
            <BtnSidebar onPress={() => this.props.navigation.navigate('TabIndex')} title="Tab" iconName="briefcase" />
            <BtnSidebar onPress={() => this.props.navigation.navigate('ApprovalIndex')} title="Approval" iconName="checkmark" />
            <BtnSidebar onPress={() => this.props.navigation.navigate('PetugasIndex')} title="Petugas" iconName="person" />
            <BtnSidebar onPress={() => this.props.navigation.navigate('UnitIndex')} title="Unit" iconName="car" />
            <BtnSidebar onPress={() => this.logout()} title="Logout" iconName="power"/>
          </View>
        </Content>
      </Container>
    );
  }

}