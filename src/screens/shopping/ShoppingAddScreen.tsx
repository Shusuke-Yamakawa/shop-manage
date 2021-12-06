import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
/* context */
import { ProductsContext } from '../../contexts/productsContext';
import { ShoppingContext } from '../../contexts/shoppingContext';
/* code */
import { category } from '../../code/category';
/* components */
import { FloatingActionButton } from '../../components/FloatingActionButton';
/* types */
import { RootStackParamList } from '../../types/navigation';
import { ProductType } from '../../types/product';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ShoppingAdd'>;
};

export const ShoppingAddScreen = ({ navigation }: Props) => {
  navigation.setOptions({
    title: '買うものを選択',
    headerTitleAlign: 'center',
    headerTitleStyle: { fontSize: 24 },
    headerLeft: () => null,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.label}>完了</Text>
      </TouchableOpacity>
    ),
  });
  const { products } = useContext(ProductsContext);
  const productData = category.map((c) => ({
    title: c.label,
    data: products
      .filter((p) => p.category === c.value)
      .map((m) => m.productName),
  }));

  const { shoppingList, setShopping } = useContext(ShoppingContext);
  /** 各商品のリスト */
  const Item = ({ product }: { product: string }) => {
    const isSelected = shoppingList.some((s) => s === product);

    return (
      <TouchableOpacity
        style={[styles.item, isSelected ? styles.selectedItem : null]}
        /** 選択した商品を買い物リストに追加する */
        onPress={() => {
          if (shoppingList.some((s) => s === product)) {
            // 既に選択されている場合は除去する
            setShopping(shoppingList.filter((s) => s !== product));
          } else {
            setShopping([...shoppingList, product]);
          }
        }}
      >
        <Text style={styles.product}>{product}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={productData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item product={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  label: {
    fontSize: 20,
    color: '#ffaf26',
    padding: 10,
  },
  item: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f2eff0',
    padding: 10,
    marginVertical: 2,
  },
  selectedItem: {
    backgroundColor: '#008080',
  },
  header: {
    fontSize: 32,
    borderBottomWidth: 4,
    borderColor: 'rgba(0, 0, 0,  0.15)',
    backgroundColor: '#fff',
  },
  product: {
    fontSize: 16,
  },
});
