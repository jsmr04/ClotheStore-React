import React from 'react'
//Icons
import { Ionicons } from '@expo/vector-icons'
//Navigation
import { createAppContainer, NavigationActions, StackActions } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

//Screens
import HomeStackScreen from "../navigation/HomeStackNavigator";
import SearchStackScreen from "../navigation/SearchStackNavigator";
import FavoriteStackScreen from "../navigation/FavoriteStackNavigator";
import CartStackScreen from "../navigation/CartStackNavigator";

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
        tabBarLabel: () => {return null},
        tabBarOptions: tabBarOptions, 
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'home-outline' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Search: {
      screen: SearchStackScreen,
      navigationOptions:{
        tabBarLabel: () => {return null},
        tabBarOptions: tabBarOptions, 
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'search' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Favorites: {
      screen: FavoriteStackScreen,
      navigationOptions:{
        tabBarLabel: () => {return null},
        tabBarOptions: {
          activeTintColor: theme.COLORS.PRIMARY,
          tabBarOnPress: (scene, jumpToIndex) => {
            jumpToIndex(scene.index);
          },
        }, 
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name = { 'heart-outline' } size = { 25 } color = { tintColor } />
        )
      }
    },
    Cart: {
      screen: CartStackScreen,
      navigationOptions:{
        tabBarLabel: () => {return null},
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