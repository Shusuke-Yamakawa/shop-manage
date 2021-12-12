import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { RouteProp } from '@react-navigation/native';
import { IconButton } from '../../components/common/IconButton';
import { ShoppingList } from '../../components/ShoppingList';
import { FloatingActionButton } from '../../components/common/FloatingActionButton';
/* context */
import { ShoppingContext } from '../../contexts/shoppingContext';
/* styles */
import commonStyles from '../../styles/CommonStyles';
/* types */
import { RootStackParamList } from '../../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ShoppingList'>;
};

export const ShoppingListScreen = ({ navigation }: Props) => (
  <SafeAreaView style={styles.container}>
    <View style={commonStyles.header}>
      <Text style={commonStyles.headerTitle}>買い物リスト</Text>
      <IconButton
        name="plus"
        color="#ffaf26"
        onPress={() => navigation.navigate('ShoppingAdd')}
      />
    </View>
    <ShoppingList />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
