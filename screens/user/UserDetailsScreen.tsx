import { AddIcon, EditIcon } from '@/assets/icons';
import AppHeader from '@/components/AppHeader';
import LexendText from '@/components/LexendText';
import ManropeText from '@/components/ManropeText';
import ProfilePicture from '@/components/ProfilePicture';
import StarRating from '@/components/StarRating';
import WorkCard from '@/components/WorkCard';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React, { useMemo } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const userData = {
  username: 'Rajiv Menon',
  image_url: require('@/assets/images/user-profile.png'),
  job_description: 'Bus Driver',
  email: 'rajiv.menon@example.com',
  phone: '+91 98765 43210',
  address: '123, Main Street, Bangalore, India',
};

const wordHistory = [
  {
    id: 1,
    title: 'Drive for Regular Morning Pickups',
    price: '200.00',
    estTime: '30 mins',
    deliveryOn: '12 May 2025',
    location: 'Firston Ave',
    clientReview: 'Reliable and punctual driver',
  },
  {
    id: 2,
    title: 'Drive for Regular Morning Pickups',
    price: '200.00',
    estTime: '30 mins',
    deliveryOn: '12 May 2025',
    location: 'Firston Ave',
    clientReview: 'Reliable and punctual driver',
  },
  {
    id: 3,
    title: 'Drive for Regular Morning Pickups',
    price: '200.00',
    estTime: '30 mins',
    deliveryOn: '12 May 2025',
    location: 'Firston Ave',
    clientReview: 'Reliable and punctual driver',
  },
];

const UserDetailsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const renderHeader = () => (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/user-cover.png')}
        style={styles.coverImage}
        resizeMode="cover"
      />

      <View style={styles.profilePictureContainer}>
        <ProfilePicture imageUrl={userData.image_url} />
      </View>

      <View style={styles.userInfoContainer}>
        <LexendText fontWeight="bold" style={styles.username}>
          {userData.username}
        </LexendText>
        <ManropeText style={styles.jobDescription}>
          {userData.job_description}
        </ManropeText>

        <StarRating rating={1.5} starSize={22} />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.availableButton}
          onPress={() => {}}
        >
          <ManropeText
            fontWeight="semiBold"
            style={styles.availableButtonText}
          >
            Available for job
          </ManropeText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.shareButton}
          onPress={() => {}}
        >
          <Icon name="share-alt" size={24} color={'#939393'} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ManropeText fontWeight="semiBold" style={styles.sectionTitle}>
            $200/h
          </ManropeText>

          <EditIcon fill={theme.colors.text.primary} />
        </View>
        <ManropeText fontWeight="medium" style={styles.sectionContent}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s
        </ManropeText>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <View style={styles.skillsHeader}>
          <ManropeText fontWeight="semiBold" style={styles.sectionTitle}>
            Skills
          </ManropeText>

          <EditIcon fill={theme.colors.text.primary} />
        </View>
        <View style={styles.skillsContainer}>
          <View style={styles.skillBadge}>
            <ManropeText>Transport</ManropeText>
          </View>
          <View style={styles.skillBadge}>
            <ManropeText>Transport</ManropeText>
          </View>
          <View style={styles.skillBadge}>
            <ManropeText>Transport</ManropeText>
          </View>

          <View style={styles.skillBadge}>
            <ManropeText>Transport</ManropeText>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ManropeText fontWeight="semiBold" style={styles.sectionTitle}>
            Work history
          </ManropeText>
          <AddIcon fill={theme.colors.text.primary} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Profile" />
      <FlatList
        data={wordHistory}
        renderItem={({ item }) => (
          <WorkCard
            title={item.title}
            price={item.price}
            estTime={item.estTime}
            deliveryOn={item.deliveryOn}
            location={item.location}
            clientReview={item.clientReview}
          />
        )}
        ListHeaderComponent={renderHeader}
      />
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
    },
    coverImage: {
      width: '100%',
      height: 160,
    },
    profilePictureContainer: {
      marginTop: -85,
    },
    userInfoContainer: {
      padding: 15,
    },
    username: {
      lineHeight: 28,
      fontSize: 26,
      marginLeft: -2,
    },
    jobDescription: {
      color: theme.colors.text.muted,
      marginTop: 5,
      marginBottom: 15,
    },
    actionsContainer: {
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    availableButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#649F73',
      borderRadius: 50,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    availableButtonText: {
      color: theme.colors.neutral.white,
      fontSize: 16,
    },
    shareButton: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#DEDEDE',
      borderRadius: 50,
      marginLeft: 20,
      aspectRatio: 1,
    },
    section: {
      padding: 15,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      color: theme.colors.text.primary,
      fontSize: 18,
    },
    sectionContent: {
      color: theme.colors.text.muted,
      marginTop: 10,
    },
    divider: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border.secondary,
      marginHorizontal: 15,
      marginVertical: 10,
    },
    skillsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    skillBadge: {
      backgroundColor: '#DEDEDE',
      borderRadius: 50,
      paddingHorizontal: 15,
      paddingVertical: 5,
      alignItems: 'center',
    },
  });

export default UserDetailsScreen;
