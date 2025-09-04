import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';
import ManropeText from './ManropeText';

type ButtonType = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  buttonType?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({
  title = '',
  buttonType = 'primary',
  ...props
}) => {
  const getButtonColors = () => {
    switch (buttonType) {
      case 'primary':
        return [COLORS.primary, COLORS.secondary];
      case 'secondary':
        return [COLORS.secondary, COLORS.secondary];
      case 'outline':
        return ['transparent', 'transparent'];
      default:
        return [COLORS.primary, COLORS.secondary];
    }
  };

  const isOutline = buttonType === 'outline';

  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <LinearGradient
        colors={getButtonColors()}
        style={[styles.button, isOutline && styles.outlineButton, props.style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ManropeText
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
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.secondary,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 21,
  },
  outlineButtonText: {
    color: COLORS.black,
  },
});

export default Button;
