import React, { useEffect, useState } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import * as yup from 'yup';
/* component */
import { MEButton } from './Button';
/* code */
import { category } from '../code/category';
/* types */
import { DropList } from '../types/dropList';

type Props = {
  onSubmit: (data: FormData) => void;
};

type FormData = {
  productName: string;
  number: number;
  category: DropList[];
  expirationDate: Date;
};

const schema = yup.object().shape({
  productName: yup.string().required('商品名を入力してください'),
  number: yup
    .number()
    .required('数量を入力してください')
    .typeError('数字を入力してください'),
  category: yup.string().required('カテゴリーを入力してください'),
  expirationDate: yup.date().required('消費期限を入力してください'),
});

export const Stock = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [date, setDate] = useState<string>('');
  const [show, setShow] = useState(false);

  const onChangeDate = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    const year = currentDate.getFullYear();
    const month = `0${currentDate.getMonth() + 1}`.slice(-2);
    const day = `0${currentDate.getDate()}`.slice(-2);
    setDate(`${year}/${month}/${day}`);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <View style={styles.inputLine}>
          <Text style={styles.text}>商品名</Text>
          <Controller
            name="productName"
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                // value={value}
                style={styles.textInput}
              />
            )}
          />
        </View>
        {errors.productName && (
          <Text style={styles.errorText}>{errors.productName.message}</Text>
        )}
        <View style={styles.inputLine}>
          <Text style={styles.text}>数量</Text>
          <Controller
            name="number"
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
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
          <Text style={styles.text}>カテゴリー</Text>
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange } }) => (
              <RNPickerSelect
                placeholder={{ label: '選択してください', value: '' }}
                onValueChange={onChange}
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
          <Text style={styles.text}>消費期限</Text>
          <TouchableOpacity style={styles.textInput} onPress={showDatePicker}>
            <TextInput
              style={styles.expirationInput}
              value={date}
              editable={false}
            />
          </TouchableOpacity>

          {show && (
            <Controller
              name="expirationDate"
              control={control}
              render={({ field: { onChange } }) => (
                <DateTimePicker
                  value={new Date()}
                  onChange={(event: Event, currentDate: Date) => {
                    onChangeDate(event, currentDate);
                    onChange(currentDate);
                  }}
                  minimumDate={new Date()}
                />
              )}
            />
          )}
        </View>
        {errors.expirationDate && (
          <Text style={styles.errorText}>{errors.expirationDate.message}</Text>
        )}
        <MEButton
          text="登録"
          onPress={handleSubmit((data) => onSubmit(data))}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    alignItems: 'flex-start',
    fontSize: 16,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '70%',
    fontSize: 16,
  },
  expirationInput: {
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
    marginLeft: 30,
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
