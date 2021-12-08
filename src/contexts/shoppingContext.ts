import { createContext } from 'react';

type ShoppingContextValue = {
  shoppingList: string[];
  setShoppingList: (shopping: string[]) => void;
};

export const ShoppingContext = createContext<ShoppingContextValue>({
  shoppingList: [],
  setShoppingList: () => {},
});
