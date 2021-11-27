import { createContext } from 'react';
import { ProductType } from '../types/product';

type ProductsContextValue = {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
};

export const ProductsContext = createContext<ProductsContextValue>({
  products: [],
  setProducts: () => {},
});
