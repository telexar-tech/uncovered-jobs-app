import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import React, { FC, useMemo, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { PhoneInput } from 'react-native-phone-entry';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { scale } from '../../utils/scale';
import Button from '../Button';
import AppTextInput from '../FormInputs/AppTextInput';
import LexendText from '../LexendText';
import ManropeText from '../ManropeText';

type StepPersonalInfoProps = {
  handleBackPress: () => void;
  onSubmit: () => void;
  values: FormikValues;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  setFieldValue: (name: string, value: any) => void;
  validateField: (name: string) => void;
  isValid: boolean;
};

const StepPersonalInfo: FC<StepPersonalInfoProps> = ({
  handleBackPress,
  onSubmit,
  values,
  errors,
  touched,
  setFieldValue,
  validateField,
  isValid,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const lastNameInputRef = useRef<TextInput>(null);
  const addressInputRef = useRef<TextInput>(null);

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
            {`Register now!`}
          </LexendText>
          <ManropeText style={styles.subtitle}>
            You’re in registration process
          </ManropeText>

          <AppTextInput
            testID="first-name-input"
            label="First Name"
            value={values.firstName}
            onChangeText={text => setFieldValue('firstName', text)}
            autoCapitalize="words"
            onBlur={() => validateField('firstName')}
            errorMessage={touched.firstName ? (errors.firstName as string) : ''}
            onSubmitEditing={() => {
              values.lastName === '' && lastNameInputRef.current?.focus();
            }}
          />

          <AppTextInput
            ref={lastNameInputRef}
            testID="last-name-input"
            label="Last Name"
            value={values.lastName}
            onChangeText={text => setFieldValue('lastName', text)}
            autoCapitalize="words"
            onBlur={() => validateField('lastName')}
            onSubmitEditing={() => {
              values.address === '' && addressInputRef.current?.focus();
            }}
            errorMessage={touched.lastName ? (errors.lastName as string) : ''}
          />

          <PhoneInput
            value={values.phoneNumber}
            onChangeText={text => setFieldValue('phoneNumber', text)}
            defaultValues={{
              callingCode: '+1',
              countryCode: 'US',
              phoneNumber: values.phoneNumber,
            }}
            renderCustomDropdown={
              <Icon
                name="chevron-down-outline"
                size={20}
                color={theme.colors.text.primary}
              />
            }
            isCallingCodeEditable={false}
            theme={{
              containerStyle: [
                styles.phoneInputContainer,
                styles.phoneInputValidBorder,
              ],
              flagButtonStyle: {},
              dropDownImageStyle: {
                alignSelf: 'center',
              },
              textInputStyle: {
                color: theme.colors.text.primary,
              },
            }}
          />
          {errors.phoneNumber && (
            <HelperText type="error">{errors.phoneNumber as string}</HelperText>
          )}

          <AppTextInput
            ref={addressInputRef}
            testID="address-input"
            label="Address"
            value={values.address}
            onChangeText={text => setFieldValue('address', text)}
            onBlur={() => validateField('address')}
            errorMessage={touched.address ? (errors.address as string) : ''}
          />
        </View>
      </View>

      <Button
        testID="next-button"
        title="Next"
        style={styles.continueButton}
        onPress={onSubmit}
        disabled={!isValid}
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
      lineHeight: scale(46),
    },
    subtitle: {
      fontSize: scale(15),
      lineHeight: scale(21),
      marginLeft: 4,
      color: theme.colors.text.muted,
    },
    continueButton: {
      width: '100%',
      marginVertical: 10,
    },
    phoneInputContainer: {
      marginTop: 24,
      height: 50,
      backgroundColor: theme.colors.background.primary,
    },
    phoneInputValidBorder: {
      borderColor: theme.colors.border.primary,
    },
    phoneInputInvalidBorder: {
      borderColor: 'red',
    },
  });

export default StepPersonalInfo;
