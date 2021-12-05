import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { RouteProp } from '@react-navigation/native';
import { ShoppingList } from '../../components/ShoppingList';
import { FloatingActionButton } from '../../components/FloatingActionButton';
/* context */
import { ShoppingContext } from '../../contexts/shoppingContext';
/* types */
import { RootStackParamList } from '../../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ShoppingList'>;
};

export const ShoppingListScreen = ({ navigation }: Props) => {
  const { shoppingList, setShopping } = useContext(ShoppingContext);
  // console.log(shoppingList);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>買い物リスト</Text>
      </View>
      <ShoppingList shoppingList={shoppingList} />

      <FloatingActionButton
        iconName="plus"
        onPress={() => navigation.navigate('ShoppingAdd')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 5,
    borderColor: 'rgba(0, 0, 0,  0.15)',
  },
  headerTitle: {
    marginBottom: 30,
    fontSize: 24,
    lineHeight: 32,
    color: '#000',
  },
});
