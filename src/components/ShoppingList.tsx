import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { StackNavigationProp } from '@react-navigation/stack';

/* code */
import { getCategoryName } from '../code/category';

/* component */
import { IconButton } from '../components/IconButton';
import { FloatingActionButton } from '../components/FloatingActionButton';

/* types */
import { ShopTarget } from '../types/shopTarget';
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
  // 買い物リストの選択が変更される度に、shopTargetを再生成する
  useEffect(() => {
    const shopTargetNames = shopTarget.map((target) => target.name);
    // 既存のオブジェクトは変更を加えない
    const remainTargetObj = shopTarget.filter((target) =>
      shoppingList.includes(target.name),
    );
    // 追加／削除が行われたshoppingListから新たなオブジェクトを生成
    const newTargetList = shoppingList.filter(
      (target) => !shopTargetNames.includes(target),
    );
    const newShopTargetObj = newTargetList.map((product) => ({
      name: product,
      number: '1',
      isSelected: false,
    }));
    // 旧と新を合算させる
    setShopTarget([...remainTargetObj, ...newShopTargetObj]);
  }, [shoppingList]);

  // 更新用にオブジェクト化した買い物リスト
  const [shopTarget, setShopTarget] = useState<ShopTarget[]>([]);

  /**
   * 選択行とそれ以外の行を返却する
   * @param item 選択行
   */
  const existsAndSelectedItem = (item: string) => {
    const existsShopList = shopTarget.filter(
      (product) => product.name !== item,
    );
    const selectedProduct =
      shopTarget.find((product) => product.name === item) ??
      shopTarget[shopTarget.length - 1];
    return { existsShopList, selectedProduct };
  };

  /**
   * リスト選択時の処理
   * @param item 選択行
   */
  const onPressProduct = (item: string) => {
    const { existsShopList, selectedProduct } = existsAndSelectedItem(item);
    selectedProduct.isSelected = !selectedProduct.isSelected;
    setShopTarget([...existsShopList, selectedProduct]);
    console.log(shopTarget);
  };

  const renderItem = ({ item }: { item: string }) => {
    const shopTargetData = shopTarget.find((data) => data.name === item);
    const isSelected = shopTargetData ? shopTargetData.isSelected : false;
    return (
      <SafeAreaView>
        <TouchableOpacity
          style={[
            styles.listContainer,
            isSelected ? styles.selectedItem : null,
          ]}
          onPress={() => onPressProduct(item)}
        >
          <Text
            style={[styles.productText, isSelected ? styles.checkedText : null]}
          >
            {item}
          </Text>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>数：</Text>
            <RNPickerSelect
              placeholder={{ label: '1', value: '1' }}
              onValueChange={(input) => {
                const { existsShopList, selectedProduct } =
                  existsAndSelectedItem(item);
                selectedProduct.number = input;
                setShopTarget([...existsShopList, selectedProduct]);
              }}
              itemKey="1"
              style={pickerSelectStyles}
              items={numberList}
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  // 一件でも選択状態だった場合、購入ボタンを表示させる
  const isBuyReady = shopTarget.some((target) => target.isSelected);

  if (isBuyReady) {
    return (
      <View>
        <FlatList
          data={shoppingList}
          renderItem={renderItem}
          keyExtractor={(item) => String(item)}
        />
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => console.log(shopTarget)}
        >
          <Text style={styles.buyText}>購入</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
  selectedItem: {
    backgroundColor: '#808080',
  },
  productText: {
    fontSize: 16,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  numberContainer: {
    flexDirection: 'row',
    left: 20,
  },
  numberText: {
    top: 16,
    fontSize: 16,
    color: '#000',
  },
  buyButton: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: '#008000',
    position: 'absolute',
    top: 430,
    left: 340,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: {
    fontSize: 18,
    color: '#fff',
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
