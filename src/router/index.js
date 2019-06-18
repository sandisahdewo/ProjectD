import React from 'react';
import Login from "../pages/login/index";
import Tab from "../pages/tab/index";
import ServiceIndex from "../pages/services/pitstop-sarana/index";
import ServiceCreate from "../pages/services/pitstop-sarana/create";
import PetugasIndex from "../pages/petugas/index";
import PetugasCreate from "../pages/petugas/create";
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
  ServiceIndex: { 
    screen: ServiceIndex,
    navigationOptions: () => ({
      title: 'Data Service',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C8DBC',
      }
    }) 
  },
  ServiceCreate: { 
    screen: ServiceCreate,
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