import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* context */
import { ProductsContext } from '../../contexts/productsContext';
import { ShoppingContext } from '../../contexts/shoppingContext';
/* code */
import { category } from '../../code/category';
/* types */
import { RootStackParamList } from '../../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ShoppingAdd'>;
};

/**
 * 買い物リスト追加画面
 */
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
        <Text style={styles.finishLabel}>完了</Text>
      </TouchableOpacity>
    ),
  });
  const { products } = useContext(ProductsContext);
  // sectionListのデータとして活用できるようにカテゴリーを変換する
  const productData = category.map((c) => ({
    title: c.label,
    // カテゴリーごとに商品名の配列を設定する
    data: products
      .filter((p) => p.category === c.value)
      .map((m) => m.productName),
  }));

  const { shoppingList, setShoppingList } = useContext(ShoppingContext);
  /** 各商品のリスト */
  const Item = ({ product }: { product: string }) => {
    const isSelected = shoppingList.some((s) => s === product);

    return (
      <TouchableOpacity
        style={[styles.item, isSelected ? styles.selectedItem : null]}
        onPress={() => {
          if (shoppingList.some((s) => s === product)) {
            // 選択状態にある買い物リストを対象から除外する
            setShoppingList(shoppingList.filter((s) => s !== product));
          } else {
            // 選択した商品を買い物リストに追加する
            setShoppingList([...shoppingList, product]);
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
  finishLabel: {
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
