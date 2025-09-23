import AppHeader from '@/components/AppHeader';
import ManropeText from '@/components/ManropeText';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const STACK_DATA = [
  {
    id: 1,
    title: 'Work in progress',
    amount: '1000',
  },
  {
    id: 2,
    title: 'Requested by client',
    amount: '1000',
  },
  {
    id: 3,
    title: 'Accepted by you',
    amount: '1000',
  },
  {
    id: 4,
    title: 'Completed jobs',
    amount: '1000',
  },
];

const StackCard = ({ title, amount }: { title: string; amount: string }) => {
  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View>
        <ManropeText
          fontWeight="semiBold"
          style={{ color: theme.colors.brand.primary }}
        >
          {title}
        </ManropeText>

        <ManropeText fontWeight="semiBold" style={styles.amountText}>
          ${amount}
        </ManropeText>
      </View>
      <Icon name="chevron-right" size={24} color={theme.colors.text.primary} />
    </TouchableOpacity>
  );
};

const UserReportsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Reports" />
      <ScrollView>
        <View style={styles.container}>
          {STACK_DATA.map(item => (
            <StackCard key={item.id} title={item.title} amount={item.amount} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    container: {
      padding: 15,
      gap: 15,
      marginTop: 15,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.background.alt,
      borderRadius: 12,
      paddingLeft: 20,
      paddingRight: 10,
      paddingVertical: 15,
      borderColor: theme.colors.border.muted,
      borderWidth: 1,
    },
    amountText: {
      color: theme.colors.text.primary,
      fontSize: 24,
      marginTop: 5,
    },
  });

export default UserReportsScreen;
