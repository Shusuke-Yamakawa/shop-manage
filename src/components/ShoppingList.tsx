import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';

/* code */
import { getCategoryName } from '../code/category';

/* component */
import { IconButton } from '../components/IconButton';

/* types */
import { ProductType } from '../types/product';
import { RootStackParamList } from '../types/navigation';

type Props = {
  shoppingList: string[];
};

const numberList = [
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
];

export const ShoppingList = ({ shoppingList }: Props) => {
  // const [number, setNumber] = useState<string>('1');

  const [shopTarget, setShopTarget] = useState(
    shoppingList.map((product) => ({
      name: product,
      number: '1',
    })),
  );

  const onPressProduct = (shoppingTarget: string) => {
    console.log(shopTarget);
  };

  const renderItem = ({ item }: { item: string }) => (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() => onPressProduct(item)}
      >
        <Text style={styles.productText}>{item}</Text>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>数：</Text>
          <RNPickerSelect
            placeholder={{ label: '1', value: '1' }}
            onValueChange={(input) => {
              const existsShopList = shopTarget.filter(
                (product) => product.name !== item,
              );
              const newShopping = {
                name: item,
                number: input,
              };
              setShopTarget([...existsShopList, newShopping]);
            }}
            itemKey="1"
            style={pickerSelectStyles}
            items={numberList}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <FlatList
      data={shoppingList}
      renderItem={renderItem}
      keyExtractor={(item) => String(item)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0,  0.15)',
  },
  productText: {
    fontSize: 16,
  },
  numberContainer: {
    flexDirection: 'row',
    left: 20,
  },
  numberText: {
    top: 16,
    fontSize: 16,
    color: '#848484',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: 'black',
    width: 70,
  },
  inputAndroid: {
    fontSize: 16,
    color: 'black',
    width: 70,
  },
});
