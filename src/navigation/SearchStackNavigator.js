import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/store/Search'
import SigninScreen from '../screens/authentication/Signin'
import RegisterScreen from '../screens/authentication/Register'
import RegisterAddressScreen from '../screens/authentication/RegisterAddress'
import SearchResultsScreen from '../screens/store/SearchResults'
import ItemDetails from '../screens/store/ItemDetails'
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
        component={SearchScreen} 
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
          name="searchResults"
          component={SearchResultsScreen}
          options={{
            title: 'Results',
        }}
        />
        <Stack.Screen 
        name="item" 
        component={ItemDetails} 
        options={theme.horizontalAnimation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;