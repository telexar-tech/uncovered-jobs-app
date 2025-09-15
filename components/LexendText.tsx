import { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { FONTS } from '../constants/fonts';
import { useTheme } from '../context/ThemeContext';

type FontWeight =
  | 'thin'
  | 'extraLight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black';

interface LexendTextProps extends TextProps {
  fontWeight?: FontWeight;
}

const LexendText: FC<LexendTextProps> = ({
  children,
  style,
  fontWeight = 'medium',
  ...props
}) => {
  const { theme } = useTheme();
  const getFontFamily = () => {
    switch (fontWeight) {
      case 'thin':
        return FONTS.LexendExa.thin;
      case 'extraLight':
        return FONTS.LexendExa.extraLight;
      case 'light':
        return FONTS.LexendExa.light;
      case 'regular':
        return FONTS.LexendExa.regular;
      case 'medium':
        return FONTS.LexendExa.medium;
      case 'semiBold':
        return FONTS.LexendExa.semiBold;
      case 'bold':
        return FONTS.LexendExa.bold;
      case 'extraBold':
        return FONTS.LexendExa.extraBold;
      case 'black':
        return FONTS.LexendExa.black;
      default:
        return FONTS.LexendExa.medium;
    }
  };

  const styles = StyleSheet.create({
    default: {
      fontFamily: getFontFamily(),
      color: theme.colors.text.primary,
    },
  });

  const passedStyle = StyleSheet.flatten(style) || {};
  const fontSize = passedStyle.fontSize || 16;
  const letterStyle = {
    letterSpacing: passedStyle.letterSpacing ?? fontSize * -0.12,
    lineHeight: passedStyle.lineHeight ?? 43,
  };

  return (
    <Text style={[styles.default, style, letterStyle]} {...props}>
      {children}
    </Text>
  );
};

export default LexendText;
