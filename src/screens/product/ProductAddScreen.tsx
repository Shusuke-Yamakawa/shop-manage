import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsContext } from '../../contexts/productsContext';
/* components */
import { Product } from '../../components/Product';
import { IconButton } from '../../components/IconButton';
/* types */
import { RootStackParamList } from '../../types/navigation';
import { ProductForm } from '../../types/product';
/* lib */
import { addProduct } from '../../lib/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductAdd'>;
};

export const ProductAdd = ({ navigation }: Props) => {
  const { products, setProducts } = useContext(ProductsContext);

  navigation.setOptions({
    title: '商品追加',
    headerLeft: () => (
      <IconButton name="x" onPress={() => navigation.goBack()} />
    ),
  });

  /** データをFirestoreに追加し、一覧画面に反映させた上で遷移する */
  const onSubmit = async (data: ProductForm) => {
    const resultProduct = await addProduct(data);
    setProducts([resultProduct, ...products]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Product onSubmit={(data) => onSubmit(data)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  inputLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    alignItems: 'flex-start',
    fontSize: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '70%',
    fontSize: 20,
  },
  errorText: {
    alignItems: 'flex-start',
    fontSize: 15,
    color: '#FF3333',
    marginTop: 5,
  },
});
