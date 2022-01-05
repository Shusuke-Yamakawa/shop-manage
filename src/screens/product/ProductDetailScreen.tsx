import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductsContext } from '../../contexts/productsContext';
/* components */
import { Product } from '../../components/Product';
import { DeleteIconButton } from '../../components/common/DeleteIconButton';
import { cancelAndOkAlert } from '../../components/common/CommonAlert';
/* types */
import { RootStackParamList } from '../../types/navigation';
import { ProductForm } from '../../types/product';
/* lib */
import { getProducts, updateProduct, deleteProduct } from '../../lib/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductDetail'>;
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

/**
 * 商品更新画面
 */
export const ProductDetail = ({ navigation, route }: Props) => {
  const { product } = route.params;

  const updateData = async (data: ProductForm) => {
    await updateProduct(data, product);
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
            () => deleteData(product.id!),
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
        onSubmit={(formData) => onSubmit(formData)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
});
