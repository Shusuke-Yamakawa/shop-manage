import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
  color?: string;
};

export const DeleteIconButton = ({ onPress, color }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <AntDesign name="delete" color={color} size={32} />
  </TouchableOpacity>
);

DeleteIconButton.defaultProps = { color: '#000' };

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});
