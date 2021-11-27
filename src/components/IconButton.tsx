import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  name: React.ComponentProps<typeof Feather>['name'];
  color?: string;
};

export const IconButton = ({ onPress, name, color = '#000' }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Feather name={name} color={color} size={32} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});
