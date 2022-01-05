import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as yup from 'yup';
import Moment from 'moment';
/* component */
import { MEButton } from './common/Button';
/* code */
import { category } from '../code/category';
/* types */
import { ProductType, ProductForm } from '../types/product';

type Props = {
  buttonText: string;
  selectProduct?: ProductType;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (formData: ProductForm) => void;
};

/**
 * フォームバリデータの設定
 */
const schema = yup.object().shape({
  productName: yup.string().required('商品名を入力してください'),
  number: yup
    .number()
    .required('数量を入力してください')
    .typeError('数字を入力してください')
    .max(9999, '4桁以内で入力してください'),
  category: yup.string().required('カテゴリーを入力してください'),
  limit: yup.date().required('消費期限を入力してください'),
});

/**
 * 商品登録／更新用のコンポーネント
 */
export const Product = ({ buttonText, selectProduct, onSubmit }: Props) => {
  /**
   * 画面項目のstate
   */
  const [prodName, setProdName] = useState<string>(
    selectProduct ? selectProduct.productName : '',
  );
  const [prodNumber, setProdNumber] = useState<string>(
    selectProduct ? String(selectProduct.number) : '',
  );
  const [prodCategory, setProdCategory] = useState<string>(
    selectProduct ? selectProduct.category : '',
  );
  const [prodLimit, setProdLimit] = useState<string>(
    selectProduct ? selectProduct.limit : '',
  );

  /**
   * 消費期限関連の設定
   */
  const [displayDatePicker, setDisplayDatePicker] = useState(false);

  const onChangeDate = (selectedDate: Date) => {
    setDisplayDatePicker(false);
    setProdLimit(Moment(selectedDate).format('YYYY/MM/DD'));
  };

  const showDatePicker = () => {
    setDisplayDatePicker(true);
  };

  const hideDatePicker = () => {
    setDisplayDatePicker(false);
  };

  /**
   * react-hook-formの初期設定
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      productName: prodName,
      number: prodNumber ? Number(prodNumber) : undefined,
      category: prodCategory,
      limit: prodLimit ? new Date(prodLimit) : undefined,
    },
    resolver: yupResolver(schema),
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <View style={styles.inputLine}>
          <Text style={styles.textLabel}>商品名</Text>
          <Controller
            name="productName"
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(input) => {
                  setProdName(input);
                  onChange(input);
                }}
                value={prodName}
                style={styles.textInput}
              />
            )}
          />
        </View>
        {errors.productName && (
          <Text style={styles.errorText}>{errors.productName.message}</Text>
        )}
        <View style={styles.inputLine}>
          <Text style={styles.textLabel}>数量</Text>
          <Controller
            name="number"
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(input) => {
                  setProdNumber(input);
                  onChange(input);
                }}
                value={prodNumber}
                style={styles.textInput}
                keyboardType="number-pad"
              />
            )}
          />
        </View>
        {errors.number && (
          <Text style={styles.errorText}>{errors.number.message}</Text>
        )}

        <View style={styles.inputLine}>
          <Text style={styles.textLabel}>カテゴリー</Text>
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange } }) => (
              <RNPickerSelect
                placeholder={{ label: '', value: '' }}
                onValueChange={(input) => {
                  setProdCategory(input);
                  onChange(input);
                }}
                value={prodCategory}
                style={pickerSelectStyles}
                items={category}
              />
            )}
          />
        </View>
        {errors.category && (
          <Text style={styles.errorText}>{errors.category.message}</Text>
        )}
        <View style={styles.inputLine}>
          <Text style={styles.textLabel}>消費期限</Text>
          <TouchableOpacity style={styles.limitBox} onPress={showDatePicker}>
            <TextInput
              style={styles.limitInput}
              value={prodLimit}
              editable={false}
            />
          </TouchableOpacity>

          <Controller
            name="limit"
            control={control}
            render={({ field: { onChange } }) => (
              <DateTimePickerModal
                isVisible={displayDatePicker}
                display={Platform.OS === 'android' ? 'default' : 'spinner'}
                date={prodLimit ? Moment(prodLimit).toDate() : new Date()}
                onConfirm={(currentDate: Date) => {
                  onChangeDate(currentDate);
                  onChange(currentDate);
                }}
                onCancel={() => {
                  hideDatePicker();
                }}
                minimumDate={new Date()}
              />
            )}
          />
        </View>
        {errors.limit && (
          <Text style={styles.errorText}>{errors.limit.message}</Text>
        )}
        <MEButton
          text={buttonText}
          onPress={handleSubmit((formData) => onSubmit(formData))}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

Product.defaultProps = { selectProduct: null };

const styles = StyleSheet.create({
  inputLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  textLabel: {
    fontSize: 16,
  },
  textInput: {
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '70%',
    fontSize: 16,
  },
  limitBox: {
    marginLeft: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30,
    width: 250,
  },
  limitInput: {
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    alignItems: 'flex-start',
    fontSize: 14,
    color: '#FF3333',
    marginTop: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30,
    width: 250,
    marginLeft: 25,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    width: 250,
    marginLeft: 10,
    backgroundColor: '#eee',
  },
});
