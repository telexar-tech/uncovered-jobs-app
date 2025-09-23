import AppHeader from '@/components/AppHeader';
import ManropeText from '@/components/ManropeText';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const STACK_DATA = [
  {
    id: 1,
    title: 'How to get this job',
    description: 'This is the description for how to get this job.',
  },
  {
    id: 2,
    title: 'Accept this job',
    description: 'This is the description for accepting this job.',
  },
  {
    id: 3,
    title: 'How to start a conversation with client',
    description:
      'This is the description for how to start a conversation with a client.',
  },
  {
    id: 4,
    title: 'How to complete job',
    description: 'This is the description for how to complete a job.',
  },
  {
    id: 5,
    title: 'How to get payments',
    description: 'This is the description for how to get payments.',
  },
];

type SupportStackParamList = {
  SupportDetail: { title: string; description: string };
};

const StackCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<SupportStackParamList>>();

  const handlePress = () => {
    navigation.navigate('SupportDetail', { title, description });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={handlePress}
    >
      <ManropeText fontWeight="semiBold" style={styles.cardTitle}>
        {title}
      </ManropeText>
      <Icon name="chevron-right" size={24} color={theme.colors.text.primary} />
    </TouchableOpacity>
  );
};

const SupportScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Help & Support" />
      <ScrollView>
        <View style={styles.container}>
          {STACK_DATA.map(stack => (
            <StackCard
              key={stack.id}
              title={stack.title}
              description={stack.description}
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
    container: { padding: 15, gap: 15, marginTop: 10 },
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
    cardTitle: {
      fontSize: 16,
      color: theme.colors.text.primary,
      width: '80%',
    },
  });

export default SupportScreen;
