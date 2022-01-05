import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { Product } from '../../components/Product';
import { IconButton } from '../../components/common/IconButton';
import { cancelAndOkAlert } from '../../components/common/CommonAlert';
/* types */
import { RootStackParamList } from '../../types/navigation';
import { ProductForm } from '../../types/product';
/* lib */
import { addProduct } from '../../lib/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductAdd'>;
};

/**
 * 商品追加画面
 */
export const ProductAdd = ({ navigation }: Props) => {
  navigation.setOptions({
    title: '商品追加',
    headerLeft: () => (
      <IconButton name="x" onPress={() => navigation.goBack()} />
    ),
  });

  const register = async (data: ProductForm) => {
    await addProduct(data);
    navigation.goBack();
  };

  /** データをFirestoreに追加し、一覧画面に反映させた上で遷移する */
  const onSubmit = (data: ProductForm) => {
    cancelAndOkAlert(
      '商品を登録します',
      'よろしいですか？',
      () => register(data),
      () => {},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Product buttonText="登録" onSubmit={(formData) => onSubmit(formData)} />
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
