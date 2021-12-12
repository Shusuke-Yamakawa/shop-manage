import { createContext } from 'react';
import { ProductsUseValue } from '../types/product';

export const ProductsContext = createContext<ProductsUseValue>({
  products: [],
  setProducts: () => {},
});
