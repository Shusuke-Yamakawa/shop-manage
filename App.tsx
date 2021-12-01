import React, { useState } from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ProductsContext } from './src/contexts/productsContext';
import { ProductType } from './src/types/product';

export default function App() {
  const [products, setProducts] = useState<ProductType[]>([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <AppNavigator />
    </ProductsContext.Provider>
  );
}
