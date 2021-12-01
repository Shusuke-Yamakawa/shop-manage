import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { ShoppingContext } from '../contexts/shoppingContext';
/* screens */
import { ShoppingListScreen } from '../screens/shopping/ShoppingListScreen';
import { ShoppingAddScreen } from '../screens/shopping/ShoppingAddScreen';

const RootStack = createStackNavigator<RootStackParamList>();

export const ShoppingStackNavigator = () => {
  const [shoppingList, setShopping] = useState<string[]>([]);

  return (
    <ShoppingContext.Provider value={{ shoppingList, setShopping }}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="ShoppingList"
          component={ShoppingListScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="ShoppingAdd" component={ShoppingAddScreen} />
      </RootStack.Navigator>
    </ShoppingContext.Provider>
  );
};
