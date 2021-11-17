import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Props = {
  onSubmit: (data: FormData) => void;
};

type FormData = {
  productName: string;
  number: number;
};

const schema = yup.object().shape({
  productName: yup.string().required('商品名を入力してください'),
  number: yup
    .number()
    .required('数量を入力してください')
    .typeError('数字を入力してください'),
});

export const Stock = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // const onSubmit = (data: FormData) => console.log(data);

  return (
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

      <Text>カテゴリー</Text>
      <Text>消費期限</Text>
      <Button title="Submit" onPress={handleSubmit((data) => onSubmit(data))} />
    </View>
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
