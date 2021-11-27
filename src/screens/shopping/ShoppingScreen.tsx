import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { RouteProp } from '@react-navigation/native';
/* types */
import { RootStackParamList } from '../../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Shopping'>;
};

export const ShoppingScreen = ({ navigation }: Props) => (
  <SafeAreaView style={styles.container}>
    <Text>shopping Screen</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
