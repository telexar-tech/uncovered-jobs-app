import AppHeader from '@/components/AppHeader';
import LexendText from '@/components/LexendText';
import ManropeText from '@/components/ManropeText';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Settings" />
      <View style={styles.container}>
        <LexendText style={styles.header}>
          This Feature Is Coming Soon!
        </LexendText>
        <ManropeText style={styles.content}>
          {`We're currently developing this functionality.
Thank you for your understanding as we work to deliver the best possible experience.`}
        </ManropeText>
      </View>
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 10,
    },
    content: {
      textAlign: 'center',
      color: theme.colors.text.muted,
    },
  });

export default SettingsScreen;
