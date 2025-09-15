import React, { FC, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import Button from '../Button';
import { OtpInput } from '../FormInputs';
import LexendText from '../LexendText';
import ManropeText from '../ManropeText';

type StepVerificationProps = {
  handleBackPress: () => void;
  handleNext: () => void;
  otp: string;
  setOtp: (otp: string) => void;
};

const StepVerification: FC<StepVerificationProps> = ({
  handleBackPress,
  handleNext,
  setOtp,
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
            {`Verify mobile number`}
          </LexendText>
          <ManropeText style={[styles.subtitle, styles.subtitleColor]}>
            Enter OTP that you received
          </ManropeText>

          <View style={styles.otpContainer}>
            <OtpInput onOtpChange={setOtp} length={5} />
          </View>

          <View style={styles.resendContainer}>
            <ManropeText style={[styles.resendText, styles.resendTextColor]}>
              Didn't get a code?
            </ManropeText>
            <ManropeText
              style={[styles.resendLink, styles.resendLinkColor]}
              fontWeight="extraBold"
              onPress={() => {}}
            >
              Click to resend
            </ManropeText>
          </View>
        </View>
      </View>

      <Button
        title="Verify"
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
      color: theme.colors.text.secondary,
    },
    otpContainer: {
      marginTop: 20,
      marginBottom: 5,
    },
    resendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 5,
      marginBottom: 10,
    },
    resendText: {},
    resendTextColor: {
      color: theme.colors.text.muted,
    },
    resendLink: {},
    resendLinkColor: {
      color: theme.colors.brand.primary,
    },
    continueButton: {
      width: '100%',
      marginVertical: 10,
    },
  });

export default StepVerification;
