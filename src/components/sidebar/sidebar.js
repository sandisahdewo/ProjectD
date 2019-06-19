import React from "react";
import { Container, Content, Text, Thumbnail, View, Icon } from "native-base";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const routes = ["Home", "Chat", "Profile"];
export default class SideBar extends React.Component {
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

            <View style={{flex:1, flexDirection:'row', marginVertical:5, paddingHorizontal: 5}}>
              <Icon name="briefcase" style={{ fontSize:25 }} />
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('TabIndex')}>
                <Text style={{fontSize:18, marginLeft:15}}>Tab</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={{borderBottomColor: 'black', borderBottomWidth: 0.5}}></View>

            <View style={{flex:1, flexDirection:'row', marginVertical:5, paddingHorizontal: 5}}>
              <Icon name="person" style={{ fontSize:25 }} />
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('PetugasIndex')}>
                <Text style={{fontSize:18, marginLeft:15}}>Petugas</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={{borderBottomColor: 'black', borderBottomWidth: 0.5}}></View>

            <View style={{flex:1, flexDirection:'row', marginVertical:5, paddingHorizontal: 5}}>
              <Icon name="key" style={{ fontSize:25 }} />
              <Text style={{fontSize:18, marginLeft:15}}>Ganti Password</Text>
            </View>
            
            <View style={{borderBottomColor: 'black', borderBottomWidth: 0.5}}></View>

          </View>
        </Content>
      </Container>
    );
  }
}