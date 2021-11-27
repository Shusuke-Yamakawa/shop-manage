import React, { useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsContext } from '../../contexts/productsContext';
/* components */
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { ProductList } from '../../components/ProductList';
/* types */
import { RootStackParamList } from '../../types/navigation';
/* lib */
import { getProducts } from '../../lib/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductList'>;
};

export const ProductListScreen = ({ navigation }: Props) => {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    setProducts(await getProducts());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProductList products={products} navigation={navigation} />
      <FloatingActionButton
        iconName="plus"
        onPress={() => navigation.navigate('ProductAdd')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
