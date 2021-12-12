import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsContext } from '../../contexts/productsContext';
/* code */
import {
  fruitAndVegetable,
  proteinGroup,
  cookingAssist,
  drinkAndIceFood,
} from '../../code/category';
/* components */
import { FloatingActionButton } from '../../components/common/FloatingActionButton';
import { IconButton } from '../../components/common/IconButton';
import { ProductList } from '../../components/ProductList';
/* styles */
import commonStyles from '../../styles/CommonStyles';
/* types */
import { RootStackParamList } from '../../types/navigation';
import { ProductType } from '../../types/product';
/* lib */
import { getProducts } from '../../lib/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductList'>;
};

export const ProductListScreen = ({ navigation }: Props) => {
  const { products, setProducts } = useContext(ProductsContext);
  const [selectProducts, setSelectProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (products.length === 0) {
      // 初回ロード
      getFirebaseItems();
    } else {
      // 商品追加時は全選択状態とする
      setSelectProducts(products);
    }
  }, [products]);

  const getFirebaseItems = async () => {
    const getProds = await getProducts();
    setProducts(getProds);
    setSelectProducts(getProds);
  };

  /**
   * 全ての商品を表示する
   */
  const selectAllProducts = () => {
    setSelectProducts(products);
  };

  /**
   * 指定のカテゴリーグループの商品を表示する
   */
  const filterProducts = (filterTarget: string[]) => {
    const filterProd = products.filter((prod) =>
      filterTarget.includes(prod.category),
    );
    setSelectProducts(filterProd);
  };

  const filterGroup = [
    { name: '野菜/果物', category: fruitAndVegetable },
    { name: 'タンパク系', category: proteinGroup },
    { name: '調味料/素', category: cookingAssist },
    { name: '飲料/冷凍', category: drinkAndIceFood },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>食材管理</Text>
        <IconButton
          name="plus"
          color="#ffaf26"
          onPress={() => navigation.navigate('ProductAdd')}
        />
      </View>
      <View style={styles.categoryGroup}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={selectAllProducts}
        >
          <Text>全て</Text>
        </TouchableOpacity>
        {filterGroup.map((group) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => filterProducts(group.category)}
            key={group.name}
          >
            <Text key={group.name}>{group.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ProductList products={selectProducts} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  categoryButton: {
    width: 70,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: '#0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
