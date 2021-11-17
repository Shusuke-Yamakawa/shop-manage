import { StockDetail } from '../screens/StockDetailScreen';
import { Product } from './product';

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  StockAdd: undefined;
  StockDetail: { product: Product };
};
