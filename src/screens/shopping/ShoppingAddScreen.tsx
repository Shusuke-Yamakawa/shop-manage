import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductsContext } from '../../contexts/productsContext';
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

const Item = ({ data }: { data: string }) => (
  <View style={styles.item}>
    <Text style={styles.data}>{data}</Text>
  </View>
);

export const ShoppingAddScreen = ({ navigation }: Props) => {
  const { products, setProducts } = useContext(ProductsContext);

  const sectionData = category.map((c) => ({
    title: c.label,
    data: products
      .filter((p) => p.category === c.value)
      .map((m) => m.productName),
  }));

  console.log(sectionData);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item data={item} />}
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
  item: {
    flexDirection: 'row',
    height: 70,
    width: 150,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  data: {
    fontSize: 24,
  },
});
