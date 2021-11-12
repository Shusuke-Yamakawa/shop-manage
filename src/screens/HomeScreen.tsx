import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { FloatingActionButton } from '../components/FloatingActionButton';
/* types */
import { RootStackParamList } from '../types/navigation';
/* lib */
import { getProduct } from '../lib/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen = ({ navigation }: Props) => (
  <SafeAreaView style={styles.container}>
    <Text>Open up App.tsx to start working on</Text>
    <FloatingActionButton
      iconName="plus"
      onPress={() => navigation.navigate('StockAdd')}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
