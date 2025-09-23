import React from 'react';
import { StyleSheet, View } from 'react-native';

import { LocationIcon, ReviewIcon } from '@/assets/icons';
import ManropeText from '@/components/ManropeText';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

interface WorkCardProps {
  title: string;
  price: number | string;
  estTime: string;
  deliveryOn: string;
  location: string;
  clientReview: string;
}

const WorkCard: React.FC<WorkCardProps> = ({
  title,
  price,
  estTime,
  deliveryOn,
  location,
  clientReview,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.card}>
      <ManropeText fontWeight="bold" style={styles.title}>
        {title}
      </ManropeText>

      <View style={styles.detailsRow}>
        <View>
          <ManropeText style={styles.detailLabel}>Fixed Price</ManropeText>
          <ManropeText fontWeight="bold" style={styles.detailValue}>
            {price}
          </ManropeText>
        </View>
        <View style={styles.separator} />
        <View>
          <ManropeText style={styles.detailLabel}>Est Time</ManropeText>
          <ManropeText fontWeight="bold" style={styles.detailValue}>
            {estTime}
          </ManropeText>
        </View>
        <View style={styles.separator} />
        <View>
          <ManropeText style={styles.detailLabel}>Delivery on</ManropeText>
          <ManropeText fontWeight="bold" style={styles.detailValue}>
            {deliveryOn}
          </ManropeText>
        </View>
      </View>

      <View style={styles.infoRow}>
        <LocationIcon />
        <ManropeText style={styles.infoLabel}>Location -</ManropeText>
        <ManropeText fontWeight="semiBold" style={styles.infoValue}>
          {location}
        </ManropeText>
      </View>

      <View style={styles.infoRow}>
        <ReviewIcon />
        <ManropeText style={styles.infoLabel}>Client Review -</ManropeText>
        <ManropeText fontWeight="semiBold" style={styles.infoValue}>
          {clientReview}
        </ManropeText>
      </View>
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: theme.colors.border.secondary,
      borderRadius: 16,
      padding: 15,
      marginTop: 20,
      backgroundColor: theme.colors.background.alt,
      marginHorizontal:15
    },
    title: {
      color: theme.colors.brand.primary,
      fontSize: 18,
    },
    detailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
      marginBottom: 10,
    },
    detailLabel: {
      color: theme.colors.text.muted,
      fontSize: 14,
    },
    detailValue: {
      fontSize: 18,
    },
    separator: {
      borderRightColor: theme.colors.border.secondary,
      borderRightWidth: 1,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    infoLabel: {
      color: theme.colors.text.muted,
      marginHorizontal: 5,
    },
    infoValue: {
      color: theme.colors.text.primary,
    },
  });

export default WorkCard;
