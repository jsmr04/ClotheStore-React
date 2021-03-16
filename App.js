import React from 'react'
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <AppNavigator/>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

