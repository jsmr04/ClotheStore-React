import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import theme from '../screens/theme';

import CartScreen from '../screens/store/Cart'
import CheckoutScreen from '../screens/store/Checkout'

import SigninScreen from '../screens/authentication/Signin'
import RegisterScreen from '../screens/authentication/Register'
import RegisterAddressScreen from '../screens/authentication/RegisterAddress'

import AccountMenuScreen from '../screens/account/AccountMenu';
import AccountDetailScreen from '../screens/account/AccountDetails'; 
import AccountOrdersScreen from '../screens/account/AccountOrders'; 
import AccountAddressScreen from '../screens/account/AccountAddress';
import AccountOrdersViewScreen from '../screens/account/AccountOrdersView';

const Stack = createStackNavigator();

const MyTheme = {
    dark: false,
    colors: {
        primary: theme.COLORS.WHITE,
        card: theme.COLORS.PRIMARY,
        text: theme.COLORS.WHITE,
    },
};

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="home" mode="modal">
        <Stack.Screen 
        name="home" 
        component={CartScreen} 
        />
        <Stack.Screen 
        name="checkout" 
        component={CheckoutScreen} 
        options={{
            title: 'Checkout',
        }}
        />
        <Stack.Screen 
        name="signin" 
        component={SigninScreen} 
        options={{
            title: 'Sign In',
        }}
        />
        <Stack.Screen 
        name="register" 
        component={RegisterScreen} 
        options={theme.horizontalAnimation}
        />
        <Stack.Screen 
        name="registeraddress" 
        component={RegisterAddressScreen} 
        options={theme.horizontalAnimation}
        />
         <Stack.Screen 
        name="account" 
        component={AccountMenuScreen} 
        options={{
            title: 'Account',
        }}
        />
        <Stack.Screen 
        name="profile" 
        component={AccountDetailScreen} 
        options={theme.horizontalAnimation}
        />
        <Stack.Screen 
        name="address" 
        component={AccountAddressScreen} 
        options={theme.horizontalAnimation}
        />
        <Stack.Screen 
        name="orders" 
        component={AccountOrdersScreen} 
        options={theme.horizontalAnimation}
        />
        <Stack.Screen 
        name="ordersview" 
        component={AccountOrdersViewScreen} 
        options={theme.horizontalAnimation}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;