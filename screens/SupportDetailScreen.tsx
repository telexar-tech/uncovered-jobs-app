import AppHeader from '@/components/AppHeader';
import Button from '@/components/Button';
import ManropeText from '@/components/ManropeText';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomerCareIcon } from '@/assets/icons';
import Icon from 'react-native-vector-icons/Feather';

type SupportDetailScreenRouteProp = RouteProp<
  { SupportDetail: { title: string; description: string } },
  'SupportDetail'
>;

const SupportDetailScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const route = useRoute<SupportDetailScreenRouteProp>();
  const { title, description } = route.params;

  const navigation = useNavigation();

  const handleCustomerCarePress = () => {
    Alert.alert(
      'Contact Customer Care',
      'How would you like to contact us?',
      [
        {
          text: 'Call Us',
          onPress: () => Linking.openURL('tel:+1234567890'),
        },
        {
          text: 'Email Us',
          onPress: () => Linking.openURL('mailto:support@uncovered.com'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={title} />
      <ScrollView>
        <View style={styles.container}>
          <ManropeText style={styles.description}>{description}</ManropeText>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.customerCareRow}
            onPress={handleCustomerCarePress}
          >
            <View style={styles.customerCareTextContainer}>
              <CustomerCareIcon />
              <ManropeText
                fontWeight="semiBold"
                style={styles.customerCareText}
              >
                Contact customer care
              </ManropeText>
            </View>

            <Icon
              name="chevron-right"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Done" onPress={() => navigation.goBack()} />
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
      padding: 20,
    },
    description: {
      fontSize: 16,
      color: theme.colors.text.primary,
      lineHeight: 24,
      marginBottom: 20,
    },
    customerCareRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderColor: theme.colors.border.muted,
      paddingTop: 20,
    },
    customerCareTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    customerCareText: {
      fontSize: 16,
      color: theme.colors.text.primary,
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
  });

export default SupportDetailScreen;
