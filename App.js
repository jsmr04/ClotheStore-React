import React from 'react'
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { Provider, connect } from 'react-redux';
import FirebaseConfig from './src/backend/FirebaseConfig';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

