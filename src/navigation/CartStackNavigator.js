import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/store/Cart'
import SignScreen from '../screens/authentication/Signin'
import CheckoutScreen from '../screens/store/Checkout'
import theme from '../screens/theme';

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
        name="signin" 
        component={SignScreen} 
        options={{
            title: 'Sign In',
        }}
        />
        <Stack.Screen 
        name="checkout" 
        component={CheckoutScreen} 
        options={{
            title: 'Checkout',
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;