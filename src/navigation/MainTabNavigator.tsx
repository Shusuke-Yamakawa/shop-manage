import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ProductStackNavigator } from './ProductStackNavigator';
import { ShoppingStackNavigator } from './ShoppingStackNavigator';

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
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 24 },
      }}
    />
    <Tab.Screen
      name="買い物リスト"
      component={ShoppingStackNavigator}
      options={{
        tabBarLabel: 'Shopping',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="shopping" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);
