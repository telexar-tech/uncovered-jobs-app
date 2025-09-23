import ManropeText from '@/components/ManropeText';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React, { useMemo } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

interface StackCardProps extends TouchableOpacityProps {
  title: string;
  icon?: ImageSourcePropType | React.FC<SvgProps>;
  iconColor?: string;
  backgroundColor?: string | undefined;
}

const ProfileStackCard = ({
  title,
  icon: Icon,
  iconColor,
  backgroundColor,
  ...props
}: StackCardProps) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () => getStyles(theme, backgroundColor),
    [theme, backgroundColor],
  );

  const renderIcon = () => {
    if (!Icon) {
      return null;
    }
    if (typeof Icon === 'function') {
      const { width, height } = styles.icon;
      return <Icon width={width} height={height} fill={iconColor} />;
    }
    return <Image source={Icon as ImageSourcePropType} style={styles.icon} />;
  };
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} {...props}>
      {renderIcon()}
      <ManropeText fontWeight="semiBold" style={styles.title}>
        {title}
      </ManropeText>
    </TouchableOpacity>
  );
};

export default ProfileStackCard;

const getStyles = (theme: ThemeType, backgroundColor?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: backgroundColor || theme.colors.background.lightGreenAlt,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 10,
      borderRadius: 12,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginHorizontal: 10,
      marginTop: 10,
    },
    title: {
      color: theme.colors.text.primary,
      fontSize: 16,
    },
    icon: {
      width: 24,
      height: 24,
    },
  });
