import React from 'react';
import Login from "../pages/login/index";
import Tab from "../pages/tab/index";
import Service from "../pages/services/index";
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
    screen: Service,
    navigationOptions: () => ({
      title: 'Data Service',
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