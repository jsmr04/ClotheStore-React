import React from 'react'
//Icons
import { Ionicons } from '@expo/vector-icons'
//Navigation
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

//Screens
import HomeStackScreen from "../navigation/HomeStackNavigator";
import SearchScreen from "../screens/store/Search";
import FavoriteScreen from "../screens/store/Favorite";
import CartScreen from "../screens/store/Cart";

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
      screen: HomeStackScreen,
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
      screen: FavoriteScreen,
      navigationOptions:{
        tabBarLabel: 'Favorites',
        tabBarOptions: tabBarOptions, 
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'heart-outline' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Cart: {
      screen: CartScreen,
      navigationOptions:{
        tabBarLabel: 'Cart',
        tabBarOptions: tabBarOptions, 
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'cart-outline' } size = { 25 } color = { tintColor } />
        )
      }
    },
  },
  { initialRouteName: 'Home' }, {tabStyle: {backgroundColor: theme.COLORS.PRIMARY}}
);

//Export  navigator
export default createAppContainer(appNavigator)