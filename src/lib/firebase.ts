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
  updateDoc,
  deleteDoc,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import 'firebase/auth';
import Moment from 'moment';
import { firebaseConfig } from './firebaseConfig';

/* types */
import { ProductType, ProductForm } from '../types/product';
import { ShopTarget } from '../types/shopTarget';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

/** Productコレクションから全データを取得する */
export const getProducts = async (): Promise<ProductType[]> => {
  try {
    // const q = query(collection(db, 'product'), where('category', '==', '1'));
    const q = query(collection(db, 'product'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as ProductType),
    );
    return products;
  } catch (err) {
    console.log(err);
    return [];
  }
};

/** Productコレクションにデータを追加する */
export const addProduct = async (data: ProductForm) => {
  const productRef = collection(db, 'product');
  const newProductRef = doc(productRef);
  try {
    const product: ProductType = {
      productId: 0,
      productName: data.productName,
      category: data.category,
      number: data.number,
      limit: Moment(data.limit).format('YYYY/MM/DD'),
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
    product.id = newProductRef.id;
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/** Productコレクションのデータを更新する */
export const updateProduct = async (
  data: ProductForm,
  product: ProductType,
) => {
  try {
    const productData: ProductType = {
      productName: data.productName,
      category: data.category,
      number: data.number,
      limit: Moment(data.limit).format('YYYY/MM/DD'),
      updatedAt: serverTimestamp(),
    };

    const productDocRef = doc(db, 'product', product.id);

    await updateDoc(productDocRef, productData);
  } catch (error) {
    console.log(error);
  }
};

/** Productコレクションのデータを削除する */
export const deleteProduct = async (docId: string) => {
  await deleteDoc(doc(db, 'product', docId));
};

/** 買い物によってProductコレクションのデータを更新する */
export const updateProductByShopping = async (shopTarget: ShopTarget) => {
  const productRef = collection(db, 'product');
  const newProductRef = doc(productRef);
  await runTransaction(db, async (transaction) => {
    await transaction.get(newProductRef).then(async () => {
      const q = query(
        collection(db, 'product'),
        where('productName', '==', shopTarget.name),
      );
      const querySnapshot = await getDocs(q);
      const targetData = querySnapshot.docs[0].data();

      const productDocRef = doc(db, 'product', querySnapshot.docs[0].id);
      const productData: ProductType = {
        number: targetData.number + Number(shopTarget.number),
        updatedAt: serverTimestamp(),
      };

      await updateDoc(productDocRef, productData);
    });
  });
};
