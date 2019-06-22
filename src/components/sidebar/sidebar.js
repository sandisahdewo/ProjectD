import React from "react";
import { Container, Content, Text, Thumbnail, View, Icon } from "native-base";
import { TouchableWithoutFeedback } from 'react-native';
import BtnSidebar from '../../components/button/sidebar';

export default class SideBar extends React.Component {

  testing = () => {
    console.warn('Testing')
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{flex:1, backgroundColor: '#3C8DBC', height: 150, paddingTop: 20}}>
            <View style={{ flex:1, flexDirection:'column', alignItems:'center' }}>
              <Thumbnail large source={{uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}} />
              <Text style={{ paddingTop:5, fontSize:16, color:'white' }}>
                Sandi Sahdewo
              </Text>
            </View>
          </View>
          <View style={{flex:1, marginVertical:7, marginHorizontal: 10}}>
            <BtnSidebar onPress={() => this.props.navigation.navigate('TabIndex')} title="Tab" iconName="briefcase" />
            <BtnSidebar onPress={() => this.props.navigation.navigate('ApprovalIndex')} title="Approval" iconName="checkmark" />
            <BtnSidebar onPress={() => this.props.navigation.navigate('PetugasIndex')} title="Petugas" iconName="person" />
            {/* <BtnSidebar onPress={() => this.props.navigation.navigate('TabIndex')} title="Ganti Password" iconName="key" /> */}
          </View>
        </Content>
      </Container>
    );
  }

}