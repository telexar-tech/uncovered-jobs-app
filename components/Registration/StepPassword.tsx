import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import React, { FC, useMemo } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { scale } from '../../utils/scale';
import Button from '../Button';
import { PasswordInput } from '../FormInputs';
import LexendText from '../LexendText';
import ManropeText from '../ManropeText';

type StepPasswordProps = {
  handleBackPress: () => void;
  onSubmit: () => void;
  values: FormikValues;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  handleBlur: any;
  handleChange: any;
  isValid: boolean;
  loading?: boolean;
};

const StepPassword: FC<StepPasswordProps> = ({
  handleBackPress,
  onSubmit,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  isValid,
  loading,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const confirmPasswordInputRef = React.useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} testID="back-button">
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
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            errorMessage={
              touched.password && errors.password
                ? (errors.password as string)
                : undefined
            }
            onSubmitEditing={confirmPasswordInputRef.current?.focus}
          />
          <PasswordInput
            ref={confirmPasswordInputRef}
            testID="confirm-password-input"
            label="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            errorMessage={
              touched.confirmPassword && errors.confirmPassword
                ? (errors.confirmPassword as string)
                : undefined
            }
            onSubmitEditing={onSubmit}
          />
        </View>
      </View>
      <Button
        testID="set-password-button"
        title="Set Password"
        style={styles.continueButton}
        onPress={onSubmit}
        disabled={!isValid}
        loading={loading}
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
      fontSize: scale(38),
      marginTop: 20,
      marginBottom: 15,
      lineHeight: scale(40),
    },
    subtitle: {
      fontSize: scale(15),
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
