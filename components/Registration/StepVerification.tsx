import React, { FC, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { scale } from '../../utils/scale';
import Button from '../Button';
import { OtpInput } from '../FormInputs';
import LexendText from '../LexendText';
import ManropeText from '../ManropeText';

type StepVerificationProps = {
  handleBackPress: () => void;
  onSubmit: () => void;
  otp: string;
  setOtp: (otp: string) => void;
  sendOtp: () => void;
  loading?: boolean;
};

const RESEND_OTP_TIMER_SECONDS = 30;

const StepVerification: FC<StepVerificationProps> = ({
  handleBackPress,
  onSubmit,
  otp,
  setOtp,
  sendOtp,
  loading,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [counter, setCounter] = useState(RESEND_OTP_TIMER_SECONDS);

  useEffect(() => {
    if (counter === 0) return;

    const timerId = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [counter]);

  const handleResendOtp = () => {
    if (counter > 0) return;

    sendOtp();
    setCounter(RESEND_OTP_TIMER_SECONDS);
  };

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
            {`Verify mobile number`}
          </LexendText>
          <ManropeText style={styles.subtitle}>
            Enter OTP that you received
          </ManropeText>

          <View style={styles.otpContainer}>
            <OtpInput onOtpChange={setOtp} length={6} />
          </View>

          <View style={styles.resendContainer}>
            <ManropeText style={styles.resendText}>
              Didn't get a code?
            </ManropeText>
            <TouchableOpacity
              testID="resend-button"
              onPress={handleResendOtp}
              disabled={counter > 0}
            >
              <ManropeText style={styles.resendLink} fontWeight="extraBold">
                Click to resend {counter > 0 ? `(${counter})` : ''}
              </ManropeText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Button
        testID="verify-button"
        title="Verify"
        style={styles.continueButton}
        onPress={onSubmit}
        disabled={otp === '' || otp.length !== 6}
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
    resendText: {
      color: theme.colors.text.muted,
    },
    resendLink: {
      color: theme.colors.brand.primary,
    },
    continueButton: {
      width: '100%',
      marginVertical: 10,
    },
  });

export default StepVerification;
