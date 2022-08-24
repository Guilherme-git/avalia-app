import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {LogBox} from 'react-native';
import Routes from './src/routes';

LogBox.ignoreLogs(['NativeBase:', 'EventEmitter.removeListener']);

const App = () => (
  <NativeBaseProvider>
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  </NativeBaseProvider>
);

export default App;
