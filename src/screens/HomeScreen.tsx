import React, { useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsContext } from '../contexts/productsContext';
/* components */
import { FloatingActionButton } from '../components/FloatingActionButton';
import { StockList } from '../components/StockList';
/* types */
import { RootStackParamList } from '../types/navigation';
/* lib */
import { getProducts } from '../lib/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen = ({ navigation }: Props) => {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    setProducts(await getProducts());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StockList products={products} navigation={navigation} />
      </ScrollView>
      <FloatingActionButton
        iconName="plus"
        onPress={() => navigation.navigate('StockAdd')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
