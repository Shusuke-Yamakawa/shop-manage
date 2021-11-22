import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { FloatingActionButton } from '../components/FloatingActionButton';
import { StockList } from '../components/StockList';
/* types */
import { RootStackParamList } from '../types/navigation';
import { Product } from '../types/product';
/* lib */
import { getProduct } from '../lib/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    setProduct(await getProduct());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StockList products={product} navigation={navigation} />
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
