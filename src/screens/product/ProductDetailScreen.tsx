import React, { useContext } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductsContext } from '../../contexts/productsContext';
/* components */
import { Product } from '../../components/Product';
import { DeleteIconButton } from '../../components/DeleteIconButton';
import { cancelAndOkAlert } from '../../components/CommonAlert';
/* types */
import { RootStackParamList } from '../../types/navigation';
import { ProductForm } from '../../types/product';
/* lib */
import { updateProduct, deleteProduct } from '../../lib/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductDetail'>;
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

export const ProductDetail = ({ navigation, route }: Props) => {
  const { products, setProducts } = useContext(ProductsContext);
  const { product } = route.params;

  const updateData = async (data: ProductForm) => {
    const resultProduct = await updateProduct(data, product);
    const existsProducts = products.filter((prod) => prod.id !== product.id);
    setProducts([resultProduct, ...existsProducts]);
    navigation.goBack();
  };

  /** Firestoreのデータを更新し、一覧画面に反映させた上で遷移する */
  const onSubmit = async (data: ProductForm) => {
    cancelAndOkAlert(
      '商品を更新します',
      'よろしいですか？',
      () => updateData(data),
      () => {},
    );
  };
  const deleteData = async (docId: string) => {
    // Firestoreからデータ削除し、一覧画面に反映させて遷移する
    await deleteProduct(docId);
    const newProducts = products.filter((prod) => prod.id !== product.id);
    setProducts(newProducts);
    navigation.goBack();
  };

  navigation.setOptions({
    title: '商品更新',
    headerRight: () => (
      <DeleteIconButton
        onPress={() => {
          cancelAndOkAlert(
            '商品を削除します',
            'よろしいですか？',
            () => deleteData(product.id),
            () => {},
          );
        }}
      />
    ),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Product
        buttonText="更新"
        selectProduct={product}
        onSubmit={(data) => onSubmit(data)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
