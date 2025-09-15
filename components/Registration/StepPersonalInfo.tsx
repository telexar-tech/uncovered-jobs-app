import React, { FC, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { PhoneInput, isValidNumber } from 'react-native-phone-entry';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import Button from '../Button';
import AppTextInput from '../FormInputs/AppTextInput';
import LexendText from '../LexendText';
import ManropeText from '../ManropeText';

type StepPersonalInfoProps = {
  handleBackPress: () => void;
  handleNext: () => void;
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  address: string;
  setAddress: (address: string) => void;
};

const StepPersonalInfo: FC<StepPersonalInfoProps> = ({
  handleBackPress,
  handleNext,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const lastNameInputRef = useRef<any>(null);
  const addressInputRef = useRef<any>(null);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [countryCode, setCountryCode] = useState('US');

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
            {`Register now!`}
          </LexendText>
          <ManropeText style={[styles.subtitle, styles.subtitleColor]}>
            Register your details with on your own email
          </ManropeText>

          <AppTextInput
            testID="first-name-input"
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            onSubmitEditing={() => {
              lastNameInputRef.current?.focus();
            }}
          />

          <AppTextInput
            ref={lastNameInputRef}
            testID="last-name-input"
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            onSubmitEditing={() => {
              addressInputRef.current?.focus();
            }}
          />

          <PhoneInput
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              setIsPhoneValid(isValidNumber(text, countryCode));
            }}
            renderCustomDropdown={
              <Icon
                name="chevron-down-outline"
                size={18}
                color={theme.colors.text.primary}
              />
            }
            isCallingCodeEditable={false}
            theme={{
              containerStyle: [
                styles.phoneInputContainer,
                isPhoneValid
                  ? styles.phoneInputValidBorder
                  : styles.phoneInputInvalidBorder,
              ],
              flagButtonStyle: {},
              dropDownImageStyle: {
                alignSelf: 'center',
              },
              textInputStyle: {
                color: theme.colors.text.primary,
              },
            }}
            onChangeCountry={country => {
              setCountryCode(country.cca2);
              setIsPhoneValid(isValidNumber(phoneNumber, country.cca2));
            }}
          />

          <AppTextInput
            ref={addressInputRef}
            testID="address-input"
            label="Address"
            value={address}
            onChangeText={setAddress}
          />
        </View>
      </View>

      <Button
        title="Next"
        style={styles.continueButton}
        onPress={() => {
          handleNext();
        }}
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
    phoneInputContainer: {
      marginTop: 24,
      height: 50,
      backgroundColor: theme.colors.background.alt,
    },
    phoneInputValidBorder: {
      borderColor: theme.colors.border.secondary,
    },
    phoneInputInvalidBorder: {
      borderColor: 'red',
    },
  });

export default StepPersonalInfo;
