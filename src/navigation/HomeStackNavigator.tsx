import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
/* screens */
import { HomeScreen } from '../screens/HomeScreen';
import { StockAdd } from '../screens/StockAddScreen';
import { StockDetail } from '../screens/StockDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: '#000',
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="StockDetail" component={StockDetail} />
  </Stack.Navigator>
);

export const HomeStackNavigator = () => (
  <RootStack.Navigator mode="modal">
    <RootStack.Screen
      name="Main"
      component={MainStack}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="StockAdd" component={StockAdd} />
  </RootStack.Navigator>
);
