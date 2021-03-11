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

//Theme
import theme from '../screens/theme'

//TabOptions
const tabBarOptions = {
  activeTintColor: theme.COLORS.PRIMARY,
}

//Navigation settings
const appNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions:{
        tabBarLabel: 'Home',
        tabBarOptions: tabBarOptions, 
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'home-outline' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions:{
        tabBarLabel: 'Search',
        tabBarOptions: tabBarOptions, 
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'search' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Favorites: {
      screen: OrdersScreen,
      navigationOptions:{
        tabBarLabel: 'Favorites',
        tabBarOptions: tabBarOptions, 
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'heart-outline' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Cart: {
      screen: AccountScreen,
      navigationOptions:{
        tabBarLabel: 'Cart',
        tabBarOptions: tabBarOptions, 
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'cart-outline' } size = { 25 } color = { tintColor } />
        )
      }
    },
  },
  { initialRouteName: 'Home' }
);

//Export  navigator
export default createAppContainer(appNavigator)