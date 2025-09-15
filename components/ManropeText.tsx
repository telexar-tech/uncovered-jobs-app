import { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { FONTS } from '../constants/fonts';

type FontWeight =
  | 'extraLight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold';

interface ManropeTextProps extends TextProps {
  fontWeight?: FontWeight;
}

const ManropeText: FC<ManropeTextProps> = ({
  children,
  style,
  fontWeight = 'regular',
  ...props
}) => {
  const getFontFamily = () => {
    switch (fontWeight) {
      case 'extraLight':
        return FONTS.Manrope.extraLight;
      case 'light':
        return FONTS.Manrope.light;
      case 'regular':
        return FONTS.Manrope.regular;
      case 'medium':
        return FONTS.Manrope.medium;
      case 'semiBold':
        return FONTS.Manrope.semiBold;
      case 'bold':
        return FONTS.Manrope.bold;
      case 'extraBold':
        return FONTS.Manrope.extraBold;
      default:
        return FONTS.Manrope.regular;
    }
  };

  const styles = StyleSheet.create({
    default: {
      fontFamily: getFontFamily(),
    },
  });

  const passedStyle = StyleSheet.flatten(style) || {};
  const letterStyle = {
    lineHeight: passedStyle.lineHeight ?? 21,
  };

  return (
    <Text style={[styles.default, style, letterStyle]} {...props}>
      {children}
    </Text>
  );
};

export default ManropeText;
