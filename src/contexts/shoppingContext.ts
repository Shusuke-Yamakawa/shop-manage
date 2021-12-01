import { createContext } from 'react';

type ShoppingContextValue = {
  shoppingList: string[];
  setShopping: (shopping: string[]) => void;
};

export const ShoppingContext = createContext<ShoppingContextValue>({
  shoppingList: [],
  setShopping: () => {},
});
