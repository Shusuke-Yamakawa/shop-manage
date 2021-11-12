import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const StockDetail = () => (
  <View style={styles.container}>
    <Text>在庫の詳細</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
