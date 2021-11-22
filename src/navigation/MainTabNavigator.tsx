import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeStackNavigator } from './HomeStackNavigator';
/* screens */
import { HomeScreen } from '../screens/HomeScreen';
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
      component={HomeStackNavigator}
      options={{
        tabBarLabel: 'Home',
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
