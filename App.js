import React, {useState} from 'react'
//import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import HomeIconWithBadge from './src/components/IconWithBadge'
import { Ionicons } from '@expo/vector-icons'

//Navigation
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

//Screens
import HomeStackScreen from "./src/navigation/HomeStackNavigator";
import SearchStackScreen from "./src/navigation/SearchStackNavigator";
import FavoriteStackScreen from "./src/navigation/FavoriteStackNavigator";
import CartStackScreen from "./src/navigation/CartStackNavigator";

//Theme
import theme from './src/screens/theme'

import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

// A very simple reducer
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// A very simple store
let store = createStore(combineReducers({ count: counter }));

// Connect the screens to Redux
let HomeContainer = connect(state => ({ count: state.count }))(HomeStackScreen);
let SearchContainer = connect(state => ({ count: state.count }))(SearchStackScreen);
let FavoriteContainer = connect(state => ({ count: state.count }))(FavoriteStackScreen);
let CartContainer = connect(state => ({ count: state.count }))(CartStackScreen);

//Navigation settings
const appNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeContainer,
      navigationOptions:{
        tabBarLabel: () => {return null},
      }
    },
    Search: {
      screen: SearchStackScreen,
      navigationOptions:{
        tabBarLabel: () => {return null},
      }
    },
    Favorites: {
      screen: FavoriteStackScreen,
      navigationOptions:{
        tabBarLabel: () => {return null},
      }
    },
    Cart: {
      screen: CartStackScreen,
      navigationOptions:{
        tabBarLabel: () => {return null},
      }
    },
  },
  { initialRouteName: 'Home', 
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        
        if (routeName === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (routeName === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        }
        else if (routeName === 'Favorites') {
          iconName = focused ? 'heart' : 'heart-outline';
        }
        else if (routeName === 'Cart') {
          iconName = focused ? 'cart' : 'cart-outline';
          IconComponent = HomeIconWithBadge;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} badgeCount={counter} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: theme.COLORS.PRIMARY,
      inactiveTintColor: 'gray',
    },
  }
);

let AppNavigator = createAppContainer(appNavigator)

export default function App() {
  return (
    <>
    <Provider store={store}>
      <AppNavigator/>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider> 
    </>
  );
}

