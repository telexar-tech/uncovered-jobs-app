import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import ManropeText from './ManropeText';
import { ThemeType } from '../constants/theme';
import { useMemo } from 'react';

type ButtonType = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  buttonType?: ButtonType;
  icon?: ImageSourcePropType | React.FC<SvgProps>;
  iconColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title = '',
  buttonType = 'primary',
  icon: Icon,
  iconColor,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const getButtonColors = () => {
    switch (buttonType) {
      case 'primary':
        return [theme.colors.brand.primary, theme.colors.brand.secondary];
      case 'secondary':
        return [theme.colors.brand.secondary, theme.colors.brand.secondary];
      case 'outline':
        return [
          theme.colors.background.primary,
          theme.colors.background.primary,
        ];
      default:
        return [theme.colors.brand.primary, theme.colors.brand.secondary];
    }
  };

  const isOutline = buttonType === 'outline';

  const renderIcon = () => {
    if (!Icon) {
      return null;
    }
    if (typeof Icon === 'function') {
      const { width, height, tintColor } = styles.icon;
      return <Icon width={width} height={height} fill={iconColor || tintColor} />;
    }
    return <Image source={Icon as ImageSourcePropType} style={styles.icon} />;
  };

  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <LinearGradient
        colors={getButtonColors()}
        style={[
          styles.button,
          isOutline && [
            styles.outlineButton,
            { borderColor: theme.colors.text.primary },
          ],
          props.style,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {renderIcon()}
        <ManropeText
          fontWeight="semiBold"
          style={[
            styles.buttonText,
            // eslint-disable-next-line react-native/no-inline-styles
            { color: isOutline ? theme.colors.text.primary : '#ffffff' },
          ]}
        >
          {title}
        </ManropeText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      borderRadius: 50,
      paddingVertical: 15,
      paddingHorizontal: 30,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    outlineButton: {
      borderWidth: 1,
    },
    buttonText: {
      fontSize: 18,
      lineHeight: 23,
    },
    icon: {
      width: 22,
      height: 22,
      tintColor: theme.colors.text.primary,
    },
  });

export default Button;
