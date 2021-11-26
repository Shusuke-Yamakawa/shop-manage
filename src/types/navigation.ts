import { Product } from './product';

export type RootStackParamList = {
  Main: undefined;
  ProductList: undefined;
  Shopping: undefined;
  ProductAdd: undefined;
  ProductDetail: { product: Product };
};
