import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ProductStackNavigator } from './ProductStackNavigator';
/* screens */
import { ProductListScreen } from '../screens/product/ProductListScreen';
import { ShoppingScreen } from '../screens/ShoppingScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      keyboardHidesTabBar: true,
    }}
  >
    <Tab.Screen
      name="食材管理"
      component={ProductStackNavigator}
      options={{
        tabBarLabel: 'product',
        tabBarIcon: ({ color, size }) => (
          <Feather name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Shopping"
      component={ShoppingScreen}
      options={{
        tabBarLabel: 'Shopping',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="shopping" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
