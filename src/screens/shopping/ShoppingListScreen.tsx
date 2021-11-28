import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { RouteProp } from '@react-navigation/native';
import { FloatingActionButton } from '../../components/FloatingActionButton';
/* types */
import { RootStackParamList } from '../../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ShoppingList'>;
};

export const ShoppingListScreen = ({ navigation }: Props) => (
  <SafeAreaView style={styles.container}>
    <Text>shopping Screen</Text>
    <FloatingActionButton
      iconName="plus"
      onPress={() => navigation.navigate('ShoppingAdd')}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
