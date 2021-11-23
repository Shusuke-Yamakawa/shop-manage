import { Product } from './product';

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Shopping: undefined;
  StockAdd: undefined;
  StockDetail: { product: Product };
};
