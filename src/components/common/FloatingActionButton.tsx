import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  iconName: React.ComponentProps<typeof Feather>['name'];
  onPress: () => void;
};

export const FloatingActionButton = ({ iconName, onPress }: Props) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Feather name={iconName} color="#fff" size={30} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: '#900',
    position: 'absolute',
    right: 16,
    bottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
