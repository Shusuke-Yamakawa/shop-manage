import { FieldValue } from 'firebase/firestore';

export type ProductType = {
  id?: string;
  productId: number;
  productName: string;
  category: string;
  number: number;
  limit: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type ProductForm = {
  productName: string;
  number: number;
  category: string;
  limit: Date;
};

export type ProductsUseValue = {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
};
