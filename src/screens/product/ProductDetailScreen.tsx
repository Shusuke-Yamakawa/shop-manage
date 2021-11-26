import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
/* components */
import { Product } from '../../components/Product';
import { DeleteIconButton } from '../../components/DeleteIconButton';
/* types */
import { RootStackParamList } from '../../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductDetail'>;
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

export const ProductDetail = ({ navigation, route }: Props) => {
  navigation.setOptions({
    title: '商品更新',
    headerRight: () => <DeleteIconButton onPress={() => navigation.goBack()} />,
  });

  const { product } = route.params;
  console.log(product);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{product.productName}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
