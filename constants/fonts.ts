import { Platform } from 'react-native';

const ios = Platform.OS === 'ios';

export const FONTS = {
  LexendExa: {
    thin: ios ? 'LexendExa-Thin' : 'LexendExaThin',
    extraLight: ios ? 'LexendExa-ExtraLight' : 'LexendExaExtraLight',
    light: ios ? 'LexendExa-Light' : 'LexendExaLight',
    regular: ios ? 'LexendExa-Regular' : 'LexendExaRegular',
    medium: ios ? 'LexendExa-Medium' : 'LexendExaMedium',
    semiBold: ios ? 'LexendExa-SemiBold' : 'LexendExaSemiBold',
    bold: ios ? 'LexendExa-Bold' : 'LexendExaBold',
    extraBold: ios ? 'LexendExa-ExtraBold' : 'LexendExaExtraBold',
    black: ios ? 'LexendExa-Black' : 'LexendExaBlack',
  },
  Manrope: {
    extraLight: ios ? 'Manrope-ExtraLight' : 'ManropeExtraLight',
    light: ios ? 'Manrope-Light' : 'ManropeLight',
    regular: ios ? 'Manrope-Regular' : 'ManropeRegular',
    medium: ios ? 'Manrope-Medium' : 'ManropeMedium',
    semiBold: ios ? 'Manrope-SemiBold' : 'ManropeSemiBold',
    bold: ios ? 'Manrope-Bold' : 'ManropeBold',
    extraBold: ios ? 'Manrope-ExtraBold' : 'ManropeExtraBold',
  },
};
