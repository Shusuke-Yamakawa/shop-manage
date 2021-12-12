import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 70,
    borderBottomWidth: 5,
    borderColor: 'rgba(0, 0, 0,  0.15)',
  },
  headerTitle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    left: 130,
    marginBottom: 15,
    fontSize: 24,
    lineHeight: 32,
    color: '#000',
  },
});
