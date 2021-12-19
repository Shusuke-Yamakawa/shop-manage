import React, { useState } from 'react';
import { LogBox } from 'react-native';
/* contexts */
import { ProductsContext } from './src/contexts/productsContext';
import { UserContext } from './src/contexts/userContext';
/* navigator */
import { AppNavigator } from './src/navigation/AppNavigator';
/* type */
import { ProductType } from './src/types/product';
import { UserType } from './src/types/user';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage',
  'StackNavigator',
  'RFC2822',
]);

export default function App() {
  const [user, setUser] = useState<UserType | null>();
  const [products, setProducts] = useState<ProductType[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ProductsContext.Provider value={{ products, setProducts }}>
        <AppNavigator />
      </ProductsContext.Provider>
    </UserContext.Provider>
  );
}
