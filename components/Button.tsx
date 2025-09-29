import { useMemo } from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { SvgProps } from 'react-native-svg';
import { ThemeType } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import ManropeText from './ManropeText';

type ButtonType = 'primary' | 'secondary' | 'outline' | 'light-bordered';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  buttonType?: ButtonType;
  icon?: ImageSourcePropType | React.FC<SvgProps>;
  iconColor?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title = '',
  buttonType = 'primary',
  icon: Icon,
  iconColor,
  loading = false,
  disabled = false,
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
      case 'light-bordered':
        return ['#EFF6F0', '#EFF6F0'];
      default:
        return [theme.colors.brand.primary, theme.colors.brand.secondary];
    }
  };

  const buttonStyle = useMemo(() => {
    const style = {
      borderColor: 'transparent',
      borderWidth: 0,
      textColor: '#ffffff',
    };

    if (buttonType === 'outline') {
      style.borderColor = theme.colors.text.primary;
      style.borderWidth = 1;
      style.textColor = theme.colors.text.primary;
    } else if (buttonType === 'light-bordered') {
      style.borderColor = theme.colors.brand.primary;
      style.borderWidth = 1;
      style.textColor = theme.colors.brand.primary;
    }

    return style;
  }, [buttonType, theme]);

  const renderIcon = () => {
    if (!Icon) {
      return null;
    }
    if (typeof Icon === 'function') {
      const { width, height, tintColor } = styles.icon;
      return (
        <Icon width={width} height={height} fill={iconColor || tintColor} />
      );
    }
    return <Image source={Icon as ImageSourcePropType} style={styles.icon} />;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      {...props}
    >
      <LinearGradient
        colors={getButtonColors()}
        style={[
          styles.button,
          {
            borderColor: buttonStyle.borderColor,
            borderWidth: buttonStyle.borderWidth,
          },
          props.style,
          (disabled || loading) && styles.disabledButton,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {loading && (
          <ActivityIndicator size="small" color={theme.colors.brand.primary} />
        )}
        {renderIcon()}
        <ManropeText
          fontWeight="semiBold"
          style={[styles.buttonText, { color: buttonStyle.textColor }]}
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
    buttonText: {
      fontSize: 18,
      lineHeight: 26,
    },
    icon: {
      width: 22,
      height: 22,
      tintColor: theme.colors.text.primary,
    },
    disabledButton: { opacity: 0.7 },
  });

export default Button;
