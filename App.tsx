import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ProductsContext } from './src/contexts/productsContext';
import { ProductType } from './src/types/product';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage',
  'StackNavigator',
  'RFC2822',
]);

export default function App() {
  const [products, setProducts] = useState<ProductType[]>([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <AppNavigator />
    </ProductsContext.Provider>
  );
}
