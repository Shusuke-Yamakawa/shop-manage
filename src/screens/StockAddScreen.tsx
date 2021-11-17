import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
/* components */
import { Stock } from '../components/Stock';
import { IconButton } from '../components/IconButton';
/* types */
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'StockAdd'>;
};

type FormData = {
  productName: string;
  number: number;
};

export const StockAdd = ({ navigation }: Props) => {
  navigation.setOptions({
    title: '在庫の追加',
    headerLeft: () => (
      <IconButton name="x" onPress={() => navigation.goBack()} />
    ),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <View style={styles.container}>
      <Stock onSubmit={(data) => onSubmit(data)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  inputLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    alignItems: 'flex-start',
    fontSize: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '70%',
    fontSize: 20,
  },
  errorText: {
    alignItems: 'flex-start',
    fontSize: 15,
    color: '#FF3333',
    marginTop: 5,
  },
});
