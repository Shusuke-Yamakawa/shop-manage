import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  where,
  getDocs,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import 'firebase/auth';
import Constants from 'expo-constants';
/* types */
import { Product, ProductForm } from '../types/product';
/* util */
import { convDateToString } from '../util/convDateToString';

const firebaseApp = initializeApp(Constants.manifest.firebase);
const db = getFirestore(firebaseApp);

/** Productコレクションから全データを取得する */
export const getProducts = async (): Promise<Product[]> => {
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

export const addProduct = async (data: ProductForm) => {
  const productRef = collection(db, 'product');
  const newProductRef = doc(productRef);

  try {
    const product: Product = {
      productId: 0,
      productName: data.productName,
      category: data.category,
      number: data.number,
      limit: convDateToString(data.limit),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await runTransaction(db, async (transaction) => {
      await transaction.get(newProductRef).then(async () => {
        // 最新を1件を取得し、productIdの連番を作成する
        const q = query(productRef, orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        const latestProduct = querySnapshot.docs[0].data();
        const newProductId = latestProduct.productId + 1;
        product.productId = newProductId;

        transaction.set(newProductRef, product);
      });
    });
    return product;
  } catch (err) {
    console.log(err);
  }
};
