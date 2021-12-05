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
import Constants from 'expo-constants';
/* types */
import { ProductType, ProductForm } from '../types/product';
/* util */
import { convDateToString } from '../util/convDateToString';

const firebaseApp = initializeApp(Constants.manifest.firebase);
const db = getFirestore(firebaseApp);

/** Productコレクションから全データを取得する */
export const getProducts = async (): Promise<Product[]> => {
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
      limit: convDateToString(data.limit),
      updatedAt: serverTimestamp(),
    };

    const productDocRef = doc(db, 'product', product.id);

    await updateDoc(productDocRef, productData);

    // 一覧画面に反映するため、既存の商品情報をセットして返却する
    productData.productId = product.productId;
    productData.createdAt = product.createdAt;
    productData.id = product.id;

    return productData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/** Productコレクションのデータを削除する */
export const deleteProduct = async (docId: string) => {
  await deleteDoc(doc(db, 'product', docId));
};
