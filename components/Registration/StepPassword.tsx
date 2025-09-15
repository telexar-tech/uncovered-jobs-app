import React, { FC, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import Button from '../Button';
import { PasswordInput } from '../FormInputs';
import LexendText from '../LexendText';
import ManropeText from '../ManropeText';

type StepPasswordProps = {
  handleBackPress: () => void;
  handleNext: () => void;
  password?: string;
  setPassword?: (password: string) => void;
  confirmPassword?: string;
  setConfirmPassword?: (password: string) => void;
};

const StepPassword: FC<StepPasswordProps> = ({
  handleBackPress,
  handleNext,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon
              name="chevron-back-outline"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>

        <View>
          <LexendText fontWeight="bold" style={styles.title}>
            {`Protect your account`}
          </LexendText>
          <ManropeText style={[styles.subtitle, styles.subtitleColor]}>
            Set your password
          </ManropeText>

          <PasswordInput
            label="Password"
            value={password}
            onChangeText={setPassword}
          />
          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>
      <Button
        title="Set Password"
        style={styles.continueButton}
        onPress={handleNext}
      />
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
      marginTop: 20,
      marginBottom: 15,
      lineHeight: 48,
    },
    subtitle: {
      fontSize: 16,
      marginLeft: 4,
    },
    subtitleColor: {
      color: theme.colors.text.muted,
    },
    continueButton: {
      width: '100%',
      marginVertical: 10,
    },
  });

export default StepPassword;
