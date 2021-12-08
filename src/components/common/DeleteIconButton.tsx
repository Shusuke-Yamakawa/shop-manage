import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
};

export const DeleteIconButton = ({ onPress, color = '#000' }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <AntDesign name="delete" color={color} size={32} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});
