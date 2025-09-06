import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/colors';

const AppLoader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={COLORS.primary} size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppLoader;
