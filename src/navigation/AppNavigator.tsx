import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

/* navigators */
import { MainTabNavigator } from './MainTabNavigator';

export const AppNavigator = () => (
  <NavigationContainer>
    <MainTabNavigator />
  </NavigationContainer>
);
