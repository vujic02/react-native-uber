import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import MapScreen from "./screens/MapScreen"
import EatsScreen from "./screens/EatsScreen"
import { store } from "./store"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false, }} />
          <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false, }} />
          <Stack.Screen name="EatsScreen" component={EatsScreen} options={{headerShown: false, }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
