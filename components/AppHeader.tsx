import ManropeText from '@/components/ManropeText';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface AppHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const AppHeader = ({ title, onBackPress }: AppHeaderProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}
        style={styles.backButton}
      >
        <Icon name="chevron-left" size={28} color={theme.colors.text.primary} />
      </TouchableOpacity>
      <ManropeText
        fontWeight="semiBold"
        style={styles.headerTitle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </ManropeText>
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 5,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 5,
    },
    backButton: { borderRadius: 50, padding: 5 },
    headerTitle: {
      fontSize: 22,
      lineHeight: 28,
      color: theme.colors.text.primary,
      width: '80%',
    },
  });

export default AppHeader;
