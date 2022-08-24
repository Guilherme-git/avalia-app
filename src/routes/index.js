import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth, Scanner, Register, Home, Classes, Test, TextStudants, AddManually, ScannerCaixa, ScannerPacote, Store } from '../screen';

const Stack = createNativeStackNavigator();
const Index = () => (
  <Stack.Navigator
    initialRouteName="auth"
    screenOptions={{
      headerBackTitle: 'Voltar',
      headerTitle: '',
      headerTintColor: '#3D4684',
    }}
  >
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="auth"
      component={Auth}
    />
    <Stack.Screen name="scanner" component={Scanner} />
    <Stack.Screen name="scanner-caixa" component={ScannerCaixa} />
    <Stack.Screen name="scanner-pacote" component={ScannerPacote} />
    <Stack.Screen name="register" component={Register} />
    <Stack.Screen
       options={{
        headerShown: false,
      }}
      name="home" component={Home} />
    <Stack.Screen name="classes" component={Classes} />
    <Stack.Screen name="test" component={Test} />
    <Stack.Screen name="test-studants" component={TextStudants} />
    <Stack.Screen name="add-manually" component={AddManually} />
    <Stack.Screen name="store" component={Store} />
  </Stack.Navigator>
);

export default Index;
