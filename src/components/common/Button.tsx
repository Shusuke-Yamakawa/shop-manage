import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type Props = {
  onPress: () => void;
  text: string;
};

export const MEButton = ({ onPress, text }: Props) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#339966',
    height: 40,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});
