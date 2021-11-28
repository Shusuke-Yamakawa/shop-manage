import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
/* screens */
import { ProductListScreen } from '../screens/product/ProductListScreen';
import { ShoppingListScreen } from '../screens/shopping/ShoppingListScreen';
import { ShoppingAddScreen } from '../screens/shopping/ShoppingAddScreen';

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const ShoppingStackNavigator = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="ShoppingList"
      component={ShoppingListScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="ShoppingAdd" component={ShoppingAddScreen} />
  </RootStack.Navigator>
);
