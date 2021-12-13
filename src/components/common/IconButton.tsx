import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
  name: React.ComponentProps<typeof Feather>['name'];
  size?: number;
  color?: string;
};

export const IconButton = ({ onPress, name, size, color }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Feather name={name} color={color} size={size} />
  </TouchableOpacity>
);

IconButton.defaultProps = { size: 32, color: '#000' };

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});
