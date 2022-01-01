import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
/* screens */
import { AuthScreen } from '../screens/AuthScreen';
/* contexts */
import { UserContext } from '../contexts/userContext';
/* navigators */
import { MainTabNavigator } from './MainTabNavigator';

export const AppNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};
