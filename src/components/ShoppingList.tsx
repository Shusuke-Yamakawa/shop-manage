import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
/* component */
import { okAlert } from './common/CommonAlert';
/* context */
import { ProductsContext } from '../contexts/productsContext';
import { ShoppingContext } from '../contexts/shoppingContext';
/* lib */
import { updateProductByShopping, getProducts } from '../lib/firebase';
/* types */
import { ShopTarget } from '../types/shopTarget';

// 数量の選択リスト
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

/**
 * 買い物リスト表示用のコンポーネント
 */
export const ShoppingList = () => {
  const { setProducts } = useContext(ProductsContext);
  // 買い物リスト選択で選択された買い物リスト
  const { shoppingList, setShoppingList } = useContext(ShoppingContext);
  // 更新用にオブジェクト化した買い物リスト
  const [shopTarget, setShopTarget] = useState<ShopTarget[]>([]);

  /**
   * 買い物リストの選択が変更される度に、shopTargetを再生成する
   */
  useEffect(() => {
    const shopTargetNames = shopTarget.map((target) => target.name);
    // 変更対象でないオブジェクトを抽出する
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

  /**
   * 選択行とそれ以外の行をそれぞれ返却する
   * @param productName 選択行の商品名
   */
  const existsAndSelectedItem = (productName: string) => {
    const existsShopList = shopTarget.filter(
      (product) => product.name !== productName,
    );
    const selectedProduct =
      shopTarget.find((product) => product.name === productName) ??
      shopTarget[shopTarget.length - 1];
    return { existsShopList, selectedProduct };
  };

  /**
   * リスト選択時の処理
   * @param productName 選択行の商品名
   */
  const onPressProduct = (productName: string) => {
    const { existsShopList, selectedProduct } =
      existsAndSelectedItem(productName);
    // 選択状態にする（選択状態の場合は解除する）
    selectedProduct.isSelected = !selectedProduct.isSelected;
    setShopTarget([...existsShopList, selectedProduct]);
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

  /**
   * 購入ボタン押下時の処理
   */
  const onPressBuyButton = async () => {
    const buyTarget = shopTarget.filter((target) => target.isSelected);
    // TODO 更新処理を実装する
    await updateProductByShopping(buyTarget[0]);
    setProducts(await getProducts());
    // 選択したリストを一覧から除去する
    const remainTargetName = shopTarget
      .filter((target) => !target.isSelected)
      .map((filterTarget) => filterTarget.name);
    setShoppingList([...remainTargetName]);
    okAlert('完了', '購入が完了しました。', () => {});
  };

  // 一件でも選択状態だった場合、購入ボタンを表示させる
  const isBuyReady = shopTarget.some((target) => target.isSelected);

  return (
    <View style={styles.container}>
      <FlatList
        data={shoppingList}
        renderItem={renderItem}
        keyExtractor={(index) => index.toString()}
      />
      <TouchableOpacity
        style={isBuyReady ? styles.buyButton : null}
        disabled={!isBuyReady}
        onPress={() => onPressBuyButton()}
      >
        <Text style={styles.buyText}>{isBuyReady ? '購入' : ''}</Text>
      </TouchableOpacity>
    </View>
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
    left: 10,
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
    left: 320,
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
    width: 100,
    marginTop: 15,
    marginLeft: 5,
  },
  inputAndroid: {
    fontSize: 16,
    color: 'black',
    width: 70,
  },
});
