import {
  EarningsIcon,
  LogoutIcon,
  ProfileIcon,
  ReportIcon,
  SettingsIcon,
  SupportIcon,
} from '@/assets/icons';
import ManropeText from '@/components/ManropeText';
import ProfilePicture from '@/components/ProfilePicture';
import ProfileStackCard from '@/components/ProfileStackCard';
import { baseColors } from '@/constants/colors';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { RootStackParamList } from '@/navigation/types';
import { storageUtil } from '@/utils/storage';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CARD_STACKS = [
  {
    id: 1,
    title: 'Profile',
    icon: ProfileIcon,
    navigate: 'UserDetails',
  },
  {
    id: 2,
    title: 'My Earnings',
    icon: EarningsIcon,
    navigate: 'UserEarnings',
  },
  {
    id: 3,
    title: 'Reports',
    icon: ReportIcon,
    navigate: 'UserReports',
  },
  {
    id: 4,
    title: 'Settings',
    icon: SettingsIcon,
    navigate: 'Settings',
  },
  {
    id: 5,
    title: 'Help & Support',
    icon: SupportIcon,
    navigate: 'Support',
  },
  {
    id: 6,
    title: 'Logout',
    icon: LogoutIcon,
  },
];

const userData = {
  username: 'Rajiv Menon',
  image_url: require('@/assets/images/user-profile.png'),
  job_description: 'Bus Driver',
};

const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const navigation = useNavigation<RootStackParamList>();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await storageUtil.clearAll();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        },
      },
    ]);
  };

  const navigateTo = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <ProfilePicture imageUrl={userData.image_url} />

          <ManropeText fontWeight="bold" style={styles.header}>
            {userData.username}
          </ManropeText>

          <ManropeText style={styles.content}>
            {userData.job_description}
          </ManropeText>
        </View>

        <View style={styles.cardContainer}>
          {CARD_STACKS.map(card => (
            <ProfileStackCard
              key={card.id}
              title={card.title}
              icon={card.icon}
              backgroundColor={
                card.title === 'Logout'
                  ? theme.colors.background.alt
                  : undefined
              }
              onPress={
                card.title === 'Logout'
                  ? handleLogout
                  : () => navigateTo(card?.navigate || '')
              }
            />
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
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    cardContainer: {
      gap: 5,
      justifyContent: 'center',
      alignItems: 'stretch',
      paddingBottom: 20,
      paddingHorizontal: 10,
    },
    header: {
      color: theme.colors.text.primary,
      fontSize: 22,
      textAlign: 'center',
      lineHeight: 28,
    },
    content: {
      textAlign: 'center',
      color: baseColors.violet[200],
    },
    profilePicture: {
      width: 110,
      height: 110,
      borderRadius: 50,
      margin: 15,
    },
  });

export default ProfileScreen;
