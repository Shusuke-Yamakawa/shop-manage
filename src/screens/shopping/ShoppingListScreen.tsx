import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { IconButton } from '../../components/common/IconButton';
import { ShoppingList } from '../../components/ShoppingList';
/* styles */
import commonStyles from '../../styles/CommonStyles';
/* types */
import { RootStackParamList } from '../../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ShoppingList'>;
};

/**
 * 買い物リスト一覧画面
 */
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
