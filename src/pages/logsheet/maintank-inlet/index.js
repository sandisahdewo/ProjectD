import React, {Component} from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Container, Content, Card } from 'native-base';
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

  deleteItem = () => {
    Alert.alert(
      'Apakah yakin akan menghapus Logsheet?',
      'Nama Transportir: F908',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    );
  }

	keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
      <Card>
        <Row style={{padding:7}}>
          <Column>
            <RowContainerContent title="Nama Transportir" content={item.nama_transportir} />
            <RowContainerContent title="Kapasitas Tangki" content={item.kapasitas_tangki} />
            <RowContainerContent title="Flow Meter Awal" content={item.flow_meter_awal} />
            <RowContainerContent title="Segel Atas" content={item.segel_atas} />
          </Column>
          <Column>
            <RowContainerContent title="Kode Unit" content={item.kode_unit} />
            <RowContainerContent title="Nomor Surat Jalan" content={item.nomor_surat_jalan} />
            <RowContainerContent title="Flow Meter Akhir" content={item.flow_meter_akhir} />
            <RowContainerContent title="Segel Bawah" content={item.segel_bawah} />
          </Column>
          <Column>
            <RowContainerContent title="Nama Driver" content={item.nama_driver} />
            <RowContainerContent title="Qty Surat Jalan" content={item.qty_surat_jalan} />
            <RowContainerContent title="Qty Flow Meter" content={item.qty_flow_meter} />
            <RowContainerContent title="Keterangan" content={item.keterangan} />
          </Column>
        </Row>
        <Vline/>
        <Row style={{paddingBottom:5, paddingRight:5}}>
          <View style={{flex:1, flexDirection:'column', alignItems:'flex-end'}}>
            <Row>
              <BtnSm buttonStyle={{marginRight:4}} title="Edit" onPress={() => this.props.navigation.navigate('LogsheetMaintankInletEdit') }></BtnSm>
              <BtnSm buttonStyle={{backgroundColor:'red'}} title="Hapus" onPress={() => this.deleteItem() }></BtnSm>
            </Row>
          </View>
        </Row>
      </Card>
  );

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <RowHeader> 
              <RowHeaderContent title="Lokasi" content="FJ8492" />
              <RowHeaderContent title="Tanggal" content="07 Mei 2019" />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="Shift" content="Siang (07:00 - 17:00)" />
              <RowHeaderContent title="Fuelman" content="Testing" />
            </RowHeader>

            <RowHeader> 
              <RowHeaderContent title="Petugas Inlet" content="Purwanto" />
            </RowHeader>
          </Card>

          <FlatList
						keyExtractor={this.keyExtractor}
						data={list}
						renderItem={this.renderItem}
					/>
          
        </Content>
        <ActionButton buttonColor="#2089dc" onPress={() => this.props.navigation.navigate('LogsheetMaintankInletCreate')}/>
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

const list = [
  {
    nama_transportir: 'F908',
    kode_unit:'F342',
    nama_driver: 'Supriono',
    kapasitas_tangki: '2000',
    nomor_surat_jalan: '032341',
    qty_surat_jalan: '93080',
    flow_meter_awal: '20000',
    flow_meter_akhir: '30000',
    qty_flow_meter: '1000',
    segel_atas: 'Ya',
    segel_bawah: 'Tidak',
    keterangan: 'Belum ada keterangan'
  },
  {
    nama_transportir: 'F908',
    kode_unit:'F342',
    nama_driver: 'Supriono',
    kapasitas_tangki: '2000',
    nomor_surat_jalan: '032341',
    qty_surat_jalan: '93080',
    flow_meter_awal: '20000',
    flow_meter_akhir: '30000',
    qty_flow_meter: '1000',
    segel_atas: 'Ya',
    segel_bawah: 'Tidak',
    keterangan: 'Belum ada keterangan'
  },
  {
    nama_transportir: 'F908',
    kode_unit:'F342',
    nama_driver: 'Supriono',
    kapasitas_tangki: '2000',
    nomor_surat_jalan: '032341',
    qty_surat_jalan: '93080',
    flow_meter_awal: '20000',
    flow_meter_akhir: '30000',
    qty_flow_meter: '1000',
    segel_atas: 'Ya',
    segel_bawah: 'Tidak',
    keterangan: 'Belum ada keterangan'
  }
];