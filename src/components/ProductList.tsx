import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* types */
import { ProductType } from '../types/product';
import { RootStackParamList } from '../types/navigation';
/* code */
import { getCategoryName } from '../code/category';

type Props = {
  products: ProductType[];
  navigation: StackNavigationProp<RootStackParamList, 'ProductList'>;
};

/**
 * 商品一覧表示用のコンポーネント
 */
export const ProductList = ({ products, navigation }: Props) => {
  const onPressProduct = (product: ProductType) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderItem = ({ item }: { item: ProductType }) => (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() => onPressProduct(item)}
      >
        <Text style={styles.productText}>
          {item.productName}（{item.number}）
        </Text>
        <View>
          <Text style={styles.categoryText}>
            {getCategoryName(item.category)}
          </Text>
          <Text style={styles.limitText}>
            消費期限：
            {item.limit}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.productId)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0,  0.15)',
  },
  productText: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    left: 90,
    color: '#ff4500',
  },
  limitText: {
    fontSize: 12,
    color: '#848484',
  },
});
