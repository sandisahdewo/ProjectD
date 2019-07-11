import React, {Component} from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Container, Body, Content, Icon } from 'native-base';
import TabContent from '../../components/tab/content'
import TabContentButton from '../../components/tab/content-button'

export default class Index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableHighlight onPress={() => navigation.openDrawer() }>
          <View style={{marginLeft: 15}}>
            <Icon name="ios-menu" size={28} style={{ color:'white' }}/>
          </View>
        </TouchableHighlight>
      ),
    }
  };

  render() {
    return (
      <Container>
        <Content>

          <TabContent title="Maintank Inlet">
            <Body style={style.tabContentBody}>
              <TabContentButton text="Line 1" onPress={() => this.props.navigation.navigate('ServiceMaintankInletIndex', { line: 'Line 1' })}/>
              <TabContentButton text="Line 2" onPress={() => this.props.navigation.navigate('ServiceMaintankInletIndex', { line: 'Line 2' })} />
            </Body>
          </TabContent>

          <TabContent title="Pitstop Sarana 1">
            <Body style={style.tabContentBody}>
              <TabContentButton text="Line 1" onPress={() => this.props.navigation.navigate('ServicePitstopSaranaIndex', { line: 'Line 1' })}/>
              <TabContentButton text="Line 2" onPress={() => this.props.navigation.navigate('ServicePitstopSaranaIndex', { line: 'Line 2' })} />
            </Body>
          </TabContent>

          <TabContent title="Pitstop Sarana 2">
            <Body style={style.tabContentBody}>
              <TabContentButton text="Line 1"/>
              <TabContentButton text="Line 2"/>
            </Body>
          </TabContent>

          <TabContent title="Maintank Outlet">
            <View style={{flex:1}}>
              <Body style={{flexDirection:'row', justifyContent:'space-between', marginBottom:15}}>
                <TabContentButton text="Line 1"/>
                <TabContentButton text="Line 2"/>
              </Body>
              <Body style={style.tabContentBody}>
                <TabContentButton text="Line 3"/>
                <TabContentButton text="Line 4"/>
              </Body>
            </View>
          </TabContent>

        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  tabContentBody: {
    flexDirection:'row', 
    justifyContent:'space-between'
  }
})