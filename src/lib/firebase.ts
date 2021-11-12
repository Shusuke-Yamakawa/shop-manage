import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore/lite';
import 'firebase/firestore';
import 'firebase/auth';
import Constants from 'expo-constants';
import { Product } from '../types/product';

// if (!getApps().length) {
//   const firebaseApp = initializeApp(Constants.manifest.firebase);
// }
const firebaseApp = initializeApp(Constants.manifest.firebase);
const db = getFirestore(firebaseApp);

export const getProduct = async () => {
  try {
    // const q = query(collection(db, 'product'), where('categoryId', '==', '1'));
    const q = query(collection(db, 'product'));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(
      (doc) => ({ ...doc.data() } as Product),
    );
    return products;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getShops2 = async () => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection('shops')
      .orderBy('score', 'desc')
      .get();
    const shops = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Shop),
    );
    return shops;
  } catch (err) {
    console.log(err);
    return [];
  }
};
