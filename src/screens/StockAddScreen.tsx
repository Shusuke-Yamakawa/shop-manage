import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { IconButton } from '../components/IconButton';
/* types */
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export const StockAdd = ({ navigation }: Props) => {
  navigation.setOptions({
    title: '在庫の追加',
    headerLeft: () => (
      <IconButton name="x" onPress={() => navigation.goBack()} />
    ),
  });
  return (
    <View style={styles.container}>
      <Text>在庫の追加</Text>
    </View>
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
