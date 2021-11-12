import * as firebase from 'firebase';

export type Product = {
  productId: number;
  productName: string;
  categoryId: string;
  number: number;
  limit: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};
