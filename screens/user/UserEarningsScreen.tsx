import AppHeader from '@/components/AppHeader';
import EarningChart from '@/components/EarningChart';
import ManropeText from '@/components/ManropeText';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserEarningsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="My Earning" />
      <ScrollView>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <ManropeText fontWeight="bold" style={styles.cardTitle}>
              Last month earnings
            </ManropeText>
            <ManropeText style={styles.cardSubtitle}>
              Increase 20% more than last month
            </ManropeText>
            <ManropeText fontWeight="semiBold" style={styles.cardAmount}>
              $1000
            </ManropeText>
          </View>
          <View style={styles.card}>
            <ManropeText fontWeight="bold" style={styles.cardTitle}>
              Last year earnings
            </ManropeText>
            <ManropeText style={styles.cardSubtitle}>
              Increase 20% more than last year
            </ManropeText>
            <ManropeText fontWeight="semiBold" style={styles.cardAmount}>
              $1000
            </ManropeText>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.jobScoreContainer}>
          <ManropeText fontWeight="semiBold" style={styles.jobScoreTitle}>
            Job Score
          </ManropeText>

          <ManropeText style={styles.jobScoreDescription}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </ManropeText>

          <View style={styles.scoresContainer}>
            <View style={styles.scoreCircle}>
              <ManropeText fontWeight="bold" style={styles.scorePoints}>
                358
              </ManropeText>
              <ManropeText style={styles.scoreLabel}>
                Points for month
              </ManropeText>
            </View>
            <View style={styles.scoreCircle}>
              <ManropeText fontWeight="bold" style={styles.scorePoints}>
                358
              </ManropeText>
              <ManropeText style={styles.scoreLabel}>
                Points for month
              </ManropeText>
            </View>
            <View style={styles.scoreCircle}>
              <ManropeText fontWeight="bold" style={styles.scorePoints}>
                358
              </ManropeText>
              <ManropeText style={styles.scoreLabel}>
                Points for month
              </ManropeText>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <EarningChart />
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
    cardsContainer: {
      width: '100%',
      flexDirection: 'row',
      gap: 15,
      padding: 15,
      justifyContent: 'space-around',
    },
    card: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.background.alt,
      borderRadius: 12,
      padding: 15,
      borderColor: theme.colors.border.muted,
      borderWidth: 1,
      gap: 10,
    },
    cardTitle: {
      color: theme.colors.text.primary,
      fontSize: 14,
    },
    cardSubtitle: {
      color: theme.colors.text.muted,
      fontSize: 12,
    },
    cardAmount: {
      color: theme.colors.brand.primary,
      fontSize: 24,
    },
    divider: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border.secondary,
      marginHorizontal: 15,
      marginVertical: 10,
    },
    jobScoreContainer: {
      padding: 15,
    },
    jobScoreTitle: {
      color: theme.colors.text.primary,
      fontSize: 18,
    },
    jobScoreDescription: {
      color: theme.colors.text.muted,
      marginVertical: 10,
    },
    scoresContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    scoreCircle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 99,
      padding: 20,
      borderColor: theme.colors.border.secondary,
      borderWidth: 1,
      aspectRatio: 1,
    },
    scorePoints: {
      fontSize: 28,
      color: theme.colors.text.muted,
    },
    scoreLabel: {
      fontSize: 12,
      color: theme.colors.text.muted,
      textAlign: 'center',
      lineHeight: 13,
      marginTop: 8,
    },
  });

export default UserEarningsScreen;
