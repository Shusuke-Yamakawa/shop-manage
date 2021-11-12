import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

/* navigators */
import { HomeStackNavigator } from './HomeStackNavigator';

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeStackNavigator />
  </NavigationContainer>
);
