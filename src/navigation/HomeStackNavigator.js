import * as React from 'react';
import {Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/store/Home'
import SignScreen from '../screens/authentication/Signin'
import theme from '../screens/theme';
import { Ionicons } from '@expo/vector-icons';

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
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen 
        name="home" 
        component={HomeScreen} 
        />
        <Stack.Screen 
        name="signin" 
        component={SignScreen} 
        options={{
            title: 'Sign In',
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;