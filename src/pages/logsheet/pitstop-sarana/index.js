import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, Icon, Text, Col } from 'native-base';
import ActionButton from 'react-native-action-button';
import RowHeader from '../../../components/logsheet/row-header';
import RowHeaderContent from '../../../components/logsheet/row-header-content';
import RowContainerContent from '../../../components/logsheet/row-container-content';
import Row from '../../../components/row';
import Column from '../../../components/column';
import BtnSm from '../../../components/button/small';
import Vline from '../../../components/line';

export default class Index extends Component {
  static navigationOptions = {
    drawerLabel: 'Daftar Petugas',
  };

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <RowHeader> 
              <RowHeaderContent title="Driver" content="Testing" />
              <RowHeaderContent title="Fuelman" content="Testing" />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="Tanggal" content="07 Mei 2019" />
              <RowHeaderContent title="Shift" content="Siang (07:00 - 17:00)" />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="WHS Number" content="FH09098" />
              <RowHeaderContent title="Location" content="KJ90432" />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="Total QTY Solar" content="2500000" />
            </RowHeader>
          </Card>

          <Card>
            <Row style={{padding:7}}>
              <Column>
                <RowContainerContent title="Kode Unit" content="F908" />
                <RowContainerContent title="Model Unit" content="F324" />
                <RowContainerContent title="HM/KM" content="3802138" />
              </Column>
              <Column>
                <RowContainerContent title="Qty Solar" content="200" />
                <RowContainerContent title="Jam" content="10:30" />
                <RowContainerContent title="User" content="Lamidi" />
              </Column>
              <Column>
                <RowContainerContent title="Flow Meter Awal" content="200" />
                <RowContainerContent title="Flow Meter Akhir" content="300" />
                <RowContainerContent title="Selisih Flow Meter" content="100" />
              </Column>
            </Row>
            <Vline/>
            <Row style={{padding:7}}>
              <View style={{flex:1, flexDirection:'column', alignItems:'flex-end'}}>
                <Row>
                  <BtnSm buttonStyle={{marginRight:4}} title="Edit"></BtnSm>
                  <BtnSm buttonStyle={{backgroundColor:'red'}} title="Hapus"></BtnSm>
                </Row>
              </View>
            </Row>
          </Card>

          <Card>
            <Row style={{padding:7}}>
              <Column>
                <RowContainerContent title="Kode Unit" content="F908" />
                <RowContainerContent title="Model Unit" content="F324" />
                <RowContainerContent title="HM/KM" content="3802138" />
              </Column>
              <Column>
                <RowContainerContent title="Qty Solar" content="200" />
                <RowContainerContent title="Jam" content="10:30" />
                <RowContainerContent title="User" content="Lamidi" />
              </Column>
              <Column>
                <RowContainerContent title="Flow Meter Awal" content="200" />
                <RowContainerContent title="Flow Meter Akhir" content="300" />
                <RowContainerContent title="Selisih Flow Meter" content="100" />
              </Column>
            </Row>
            <Vline/>
            <Row style={{padding:7}}>
              <View style={{flex:1, flexDirection:'column', alignItems:'flex-end'}}>
                <Row>
                  <BtnSm buttonStyle={{marginRight:4}} title="Edit"></BtnSm>
                  <BtnSm buttonStyle={{backgroundColor:'red'}} title="Hapus"></BtnSm>
                </Row>
              </View>
            </Row>
          </Card>

          <Card>
            <Row style={{padding:7}}>
              <Column>
                <RowContainerContent title="Kode Unit" content="F908" />
                <RowContainerContent title="Model Unit" content="F324" />
                <RowContainerContent title="HM/KM" content="3802138" />
              </Column>
              <Column>
                <RowContainerContent title="Qty Solar" content="200" />
                <RowContainerContent title="Jam" content="10:30" />
                <RowContainerContent title="User" content="Lamidi" />
              </Column>
              <Column>
                <RowContainerContent title="Flow Meter Awal" content="200" />
                <RowContainerContent title="Flow Meter Akhir" content="300" />
                <RowContainerContent title="Selisih Flow Meter" content="100" />
              </Column>
            </Row>
            <Vline/>
            <Row style={{padding:7}}>
              <View style={{flex:1, flexDirection:'column', alignItems:'flex-end'}}>
                <Row>
                  <BtnSm buttonStyle={{marginRight:4}} title="Edit"></BtnSm>
                  <BtnSm buttonStyle={{backgroundColor:'red'}} title="Hapus"></BtnSm>
                </Row>
              </View>
            </Row>
          </Card>
          
        </Content>
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('LogsheetCreate')}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})