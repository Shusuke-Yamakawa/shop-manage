import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* code */
import {
  fruitAndVegetable,
  proteinGroup,
  cookingAssist,
  drinkAndIceFood,
} from '../../code/category';
/* components */
import { IconButton } from '../../components/common/IconButton';
import { Loading } from '../../components/common/Loading';
import { ProductList } from '../../components/ProductList';
/* styles */
import commonStyles from '../../styles/CommonStyles';
/* types */
import { RootStackParamList } from '../../types/navigation';
/* lib */
import { useGetProducts } from '../../lib/useGetProducts';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductList'>;
};

/**
 * 商品一覧画面
 */
export const ProductListScreen = ({ navigation }: Props) => {
  const { isLoading, viewProducts, selectAllProducts, filterProducts } =
    useGetProducts();

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
      <ProductList products={viewProducts!} navigation={navigation} />
      <Loading visible={isLoading} />
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
