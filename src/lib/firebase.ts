import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  where,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import Moment from 'moment';
import { firebaseConfig } from './firebaseConfig';

/* types */
import { ProductType, ProductForm } from '../types/product';
import { ShopTarget } from '../types/shopTarget';
import { UserType, initialUser } from '../types/user';

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const db = getFirestore(firebaseApp);

/** Productコレクションから全データを取得する */
export const getProducts = async (): Promise<ProductType[]> => {
  try {
    const q = query(collection(db, 'product'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(
      (d) => ({ ...d.data(), id: d.id } as ProductType),
    );
    return products;
  } catch (err) {
    // TODO sentryなどに送信 ※errorBoundaryの仕組み構築
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
        // 最新の1件を取得し、productIdの連番を作成する
        const q = query(productRef, orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        const latestProduct = querySnapshot.docs[0].data();
        const newProductId = latestProduct.productId + 1;
        product.productId = newProductId;
        // 新規Productのデータを作成する
        transaction.set(newProductRef, product);
      });
    });
    product.id = newProductRef.id;
    return product;
  } catch (error) {
    // TODO sentryなどに送信 ※errorBoundaryの仕組み構築
    console.log(error);
    return null;
  }
};

/** Productコレクションのデータを更新する */
export const updateProduct = async (
  formData: ProductForm,
  product: ProductType,
) => {
  try {
    const productData: ProductType = {
      productName: formData.productName,
      category: formData.category,
      number: formData.number,
      limit: Moment(formData.limit).format('YYYY/MM/DD'),
      updatedAt: serverTimestamp(),
    };
    const productDocRef = doc(db, 'product', product.id);

    await updateDoc(productDocRef, productData);
  } catch (error) {
    // TODO sentryなどに送信 ※errorBoundaryの仕組み構築
    console.log(error);
  }
};

/** Productコレクションのデータを削除する */
export const deleteProduct = async (docId: string) => {
  try {
    await deleteDoc(doc(db, 'product', docId));
  } catch (error) {
    // TODO sentryなどに送信 ※errorBoundaryの仕組み構築
    console.log(error);
  }
};

/** 買い物によってProductコレクションのデータを更新する */
export const updateProductByShopping = async (shopTarget: ShopTarget) => {
  try {
    const productRef = collection(db, 'product');
    const newProductRef = doc(productRef);
    // 商品名で更新対象を特定し、数量を更新する
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
  } catch (error) {
    // TODO sentryなどに送信 ※errorBoundaryの仕組み構築
    console.log(error);
  }
};

/** 匿名ログイン */
export const signIn = async () => {
  const userCredential = await signInAnonymously(getAuth());
  const { uid } = userCredential.user;
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  // 初回ログイン時はFirestoreにデータを作成する
  if (!userDoc.data()) {
    await setDoc(userRef, initialUser);
    return {
      ...initialUser,
      id: uid,
    } as UserType;
  }
  return {
    id: uid,
    ...userDoc.data(),
  } as UserType;
};
