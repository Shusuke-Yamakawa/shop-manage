import { createContext } from 'react';
import { Product } from '../types/product';

type ProductsContextValue = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const ProductsContext = createContext<ProductsContextValue>({
  products: [],
  setProducts: () => {},
});
