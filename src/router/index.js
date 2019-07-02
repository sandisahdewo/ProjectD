import React from 'react';
import Login from "../pages/login/index";
import Tab from "../pages/tab/index";

import ServicePitstopSaranaIndex from "../pages/services/pitstop-sarana/index";
import ServicePitstopSaranaCreate from "../pages/services/pitstop-sarana/create";
import LogsheetPitstopSaranaIndex from "../pages/logsheet/pitstop-sarana/index";
import LogsheetPitstopSaranaCreate from "../pages/logsheet/pitstop-sarana/create";

import ServiceMaintankInletIndex from "../pages/services/maintank-inlet/index";
import ServiceMaintankInletCreate from "../pages/services/maintank-inlet/create";
import ServiceMaintankInletEdit from "../pages/services/maintank-inlet/edit";
import LogsheetMaintankInletIndex from "../pages/logsheet/maintank-inlet/index";
import LogsheetMaintankInletCreate from "../pages/logsheet/maintank-inlet/create";
import LogsheetMaintankInletEdit from "../pages/logsheet/maintank-inlet/edit";

import ApprovalIndex from "../pages/approval/index";

import ApprovalMaintankInletIndex from "../pages/approval/maintank-inlet/index";
import ApprovalMaintankInletDetail from "../pages/approval/maintank-inlet/detail";

import PetugasIndex from "../pages/petugas/index";
import PetugasCreate from "../pages/petugas/create";
import PetugasEdit from "../pages/petugas/edit";

import Sidebar from "../components/sidebar/sidebar"
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';

const LoginStack = createStackNavigator({
  Login: { 
    screen: Login,
  }
}, {
  headerMode: 'none'
});

const PageStack = createStackNavigator({
  PetugasIndex: { 
    screen: PetugasIndex,
    navigationOptions: () => ({
      title: 'Data Petugas',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },

  
  TabIndex: { 
    screen: Tab,
    navigationOptions: () => ({
      title: 'Data Tab',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },

  ApprovalIndex: { 
    screen: ApprovalIndex,
    navigationOptions: () => ({
      title: 'Pilih Tabs',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  ApprovalMaintankInletIndex: { 
    screen: ApprovalMaintankInletIndex,
    navigationOptions: () => ({
      title: 'Daftar Maintank Inlet',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  ApprovalMaintankInletDetail: { 
    screen: ApprovalMaintankInletDetail,
    navigationOptions: () => ({
      title: 'Detail Maintank Inlet',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  
  LogsheetMaintankInletIndex: { 
    screen: LogsheetMaintankInletIndex,
    navigationOptions: () => ({
      title: 'Daftar Logsheet',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  LogsheetMaintankInletCreate: { 
    screen: LogsheetMaintankInletCreate,
    navigationOptions: () => ({
      title: 'Tambah Logheet Maintank Inlet',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  LogsheetMaintankInletEdit: { 
    screen: LogsheetMaintankInletEdit,
    navigationOptions: () => ({
      title: 'Edit Logheet Maintank Inlet',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  ServiceMaintankInletIndex: { 
    screen: ServiceMaintankInletIndex,
    navigationOptions: () => ({
      title: 'Service Maintank Inlet',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  ServiceMaintankInletCreate: { 
    screen: ServiceMaintankInletCreate,
    navigationOptions: () => ({
      title: 'Tambah Service',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  ServiceMaintankInletEdit: { 
    screen: ServiceMaintankInletEdit,
    navigationOptions: () => ({
      title: 'Edit Service',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },

  LogsheetPitstopSaranaCreate: { 
    screen: LogsheetPitstopSaranaCreate,
    navigationOptions: () => ({
      title: 'Tambah Logsheet',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  LogsheetPitstopSaranaIndex: { 
    screen: LogsheetPitstopSaranaIndex,
    navigationOptions: () => ({
      title: 'Data Logsheet',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  ServicePitstopSaranaIndex: { 
    screen: ServicePitstopSaranaIndex,
    navigationOptions: () => ({
      title: 'Data Service',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  ServicePitstopSaranaCreate: { 
    screen: ServicePitstopSaranaCreate,
    navigationOptions: () => ({
      title: 'Data Service',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  PetugasIndex: { 
    screen: PetugasIndex,
    navigationOptions: () => ({
      title: 'Data Petugas',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  PetugasCreate: { 
    screen: PetugasCreate,
    navigationOptions: () => ({
      title: 'Tambah Petugas',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  PetugasEdit: { 
    screen: PetugasEdit,
    navigationOptions: () => ({
      title: 'Edit Petugas',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
});

const DrawerNavigator = createDrawerNavigator({
  App: {screen: PageStack}
}, {
  initialRouteName: 'App',
  contentComponent: props => <Sidebar {...props} />
});

const SwitchNavigator = createSwitchNavigator({
  App: DrawerNavigator,
  Login: LoginStack
},
{
  initialRouteName: 'App',
});

const Nav = createAppContainer(SwitchNavigator)

export default Nav;