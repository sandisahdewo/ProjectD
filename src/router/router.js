import React, { Component } from "react";
import Login from "../pages/login/index";
import Tab from "../pages/tab/index";
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: { screen: Login },
  Tab: { screen: Tab },
});

const Router = createAppContainer(MainNavigator);

export default Router;