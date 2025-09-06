import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
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
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name="chevron-back-outline" size={24} color="#000" />
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
            <OtpInput onOtpChange={setOtp} length={5} />
          </View>

          <View style={styles.resendContainer}>
            <ManropeText style={styles.resendText}>
              Didn't get a code?
            </ManropeText>
            <ManropeText
              style={styles.resendLink}
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

const styles = StyleSheet.create({
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
    color: COLORS.violet300,
    fontSize: 16,
    marginLeft: 4,
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
    color: COLORS.violet300,
  },
  resendLink: {
    color: COLORS.primary,
  },
  continueButton: {
    width: '100%',
    marginVertical: 10,
  },
});

export default StepVerification;
