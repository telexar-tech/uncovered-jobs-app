import { baseColors } from '@/constants/colors';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ManropeText from './ManropeText';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  starSize?: number;
  starColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  starSize = 24,
  starColor = baseColors.brand.primary,
}) => {
  const stars = [];

  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(<Icon key={i} name="star" size={starSize} color={starColor} />);
    } else if (i - rating < 1) {
      stars.push(<Icon key={i} name="star-half-full" size={starSize} color={starColor} />);
    } else {
      stars.push(<Icon key={i} name="star" size={starSize} color={'#5c586235'} />);
    }
  }

  return (
    <View style={styles.container}>
      {stars}
      <ManropeText fontWeight="semiBold" style={styles.ratingText}>
        {rating.toFixed(1)}
      </ManropeText>
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap:2
    },
    ratingText: {
      marginLeft: 8,
      fontSize: 16,
      color: theme.colors.text.primary,
    },
  });

export default StarRating;
