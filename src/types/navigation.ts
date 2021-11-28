import { ProductType } from './product';

export type RootStackParamList = {
  Main: undefined;
  ProductList: undefined;
  ProductAdd: undefined;
  ProductDetail: { product: ProductType };
  ShoppingList: undefined;
  ShoppingAdd: undefined;
};
