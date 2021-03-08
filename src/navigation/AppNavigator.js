import React from 'react'
//Icons
import { Ionicons } from '@expo/vector-icons'
//Navigation
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

//Screens
import HomeScreen from "../screens/store/Home";
import SearchScreen from "../screens/store/Search";
import OrdersScreen from "../screens/store/Orders";
import AccountScreen from "../screens/store/Account";

//Navigation settings
const appNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions:{
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'home' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions:{
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'search' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Orders: {
      screen: OrdersScreen,
      navigationOptions:{
        tabBarLabel: 'Orders',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'albums' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions:{
        tabBarLabel: 'Account',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'person' } size = { 25 } color = { tintColor } />
        )
      }
    },
  },
  { initialRouteName: "Home" }
);

//Export  navigator
export default createAppContainer(appNavigator)