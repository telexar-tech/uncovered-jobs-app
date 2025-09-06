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
import { COLORS } from '../constants/colors';
import ManropeText from './ManropeText';

type ButtonType = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  buttonType?: ButtonType;
  icon?: ImageSourcePropType | React.FC<SvgProps>;
}

const Button: React.FC<ButtonProps> = ({
  title = '',
  buttonType = 'primary',
  icon: Icon,
  ...props
}) => {
  const getButtonColors = () => {
    switch (buttonType) {
      case 'primary':
        return [COLORS.primary, COLORS.secondary];
      case 'secondary':
        return [COLORS.secondary, COLORS.secondary];
      case 'outline':
        return ['#fff', '#ffff'];
      default:
        return [COLORS.primary, COLORS.secondary];
    }
  };

  const isOutline = buttonType === 'outline';

  const renderIcon = () => {
    if (!Icon) {
      return null;
    }
    if (typeof Icon === 'function') {
      const { width, height } = styles.icon;
      return <Icon width={width} height={height} />;
    }
    return <Image source={Icon as ImageSourcePropType} style={styles.icon} />;
  };

  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <LinearGradient
        colors={getButtonColors()}
        style={[styles.button, isOutline && styles.outlineButton, props.style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {renderIcon()}
        <ManropeText
          fontWeight="semiBold"
          style={[styles.buttonText, isOutline && styles.outlineButtonText]}
        >
          {title}
        </ManropeText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
        shadowColor: COLORS.secondary,
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
    borderColor: COLORS.black,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 23,
  },
  outlineButtonText: {
    color: COLORS.black,
  },
  icon: {
    width: 22,
    height: 22,
  },
});

export default Button;
