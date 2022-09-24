import {StyleSheet} from 'react-native';
import colors from '../../constants/colorConstants';
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 34,
  },
  btn: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: colors.primary,
  },
  input: {
    width: '100%',
    borderRadius: 4,
    marginBottom: 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
