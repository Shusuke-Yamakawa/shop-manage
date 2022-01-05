import { useState, useEffect, useContext, useCallback } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';

import { ProductType } from '../types/product';
import { ProductsContext } from '../contexts/productsContext';

export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { products, setProducts } = useContext(ProductsContext);
  const [viewProducts, setViewProducts] = useState<ProductType[]>();

  useEffect(() => {
    const q = query(collection(db, 'product'), orderBy('createdAt', 'desc'));
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const prods = snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as ProductType),
        );
        setProducts(prods);
        setViewProducts(prods);
        setIsLoading(false);
      },
      (err: any) => {
        console.log(err);
      },
    );
    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * 全ての商品を表示する
   */
  const selectAllProducts = useCallback(() => {
    setViewProducts(products);
  }, []);

  /**
   * 指定のカテゴリーグループの商品を表示する
   */
  const filterProducts = useCallback((filterTarget: string[]) => {
    const filterProd = products.filter((prod) =>
      filterTarget.includes(prod.category),
    );
    setViewProducts(filterProd);
  }, []);

  return {
    isLoading,
    viewProducts,
    selectAllProducts,
    filterProducts,
  };
};
