import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
/* screens */
import { ProductListScreen } from '../screens/product/ProductListScreen';
import { ProductAdd } from '../screens/product/ProductAddScreen';
import { ProductDetail } from '../screens/product/ProductDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: '#000',
    }}
  >
    <Stack.Screen
      name="ProductList"
      component={ProductListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ProductDetail" component={ProductDetail} />
  </Stack.Navigator>
);

export const ProductStackNavigator = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="Main"
      component={MainStack}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="ProductAdd" component={ProductAdd} />
  </RootStack.Navigator>
);
