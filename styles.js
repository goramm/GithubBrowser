import { StyleSheet } from 'react-native';
import { BG, TEXT, BORDER, BUTTON_BG, WHITE, RED } from './constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BG,
    padding: 10,
    paddingTop: 40,
  },
  logo: {
    width: 64,
    height: 64,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: TEXT,
  },
  input: {
    alignSelf: 'stretch',
    height: 50,
    padding: 10,
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  button: {
    backgroundColor: BUTTON_BG,
    height: 48,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: WHITE,
  },
  indicator: {
    marginTop: 10,
  },
  error: {
    color: RED,
    marginTop: 10,
  },
});
