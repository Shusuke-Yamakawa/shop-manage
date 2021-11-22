import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* types */
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'StockDetail'>;
  route: RouteProp<RootStackParamList, 'StockDetail'>;
};

export const StockDetail = ({ navigation, route }: Props) => {
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
