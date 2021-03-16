import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AccountMenuScreen from '../screens/account/AccountMenu';
import AccountDetailScreen from '../screens/account/AccountDetails'; 
import AccountOrdersScreen from '../screens/account/AccountOrders'; 
import AccountAddressScreen from '../screens/account/AccountAddress';
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
        component={AccountMenuScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;