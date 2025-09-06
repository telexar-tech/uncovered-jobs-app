import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { EmailInput } from '../components/FormInputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppleIcon from '../assets/images/icons/apple.svg';
import GoogleIcon from '../assets/images/icons/google.svg';
import Button from '../components/Button';
import LexendText from '../components/LexendText';
import ManropeText from '../components/ManropeText';
import StepOnboard from '../components/Registration/StepOnboard';
import StepPassword from '../components/Registration/StepPassword';
import StepPersonalInfo from '../components/Registration/StepPersonalInfo';
import StepVerification from '../components/Registration/StepVerification';
import { COLORS } from '../constants/colors';

type AuthStackParamList = {
  login: undefined;
};

const RegisterScreen: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleLoginPress = () => {
    navigation.navigate('login');
  };

  const handleBackPress = () => {
    setStep(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Image
              source={require('../assets/images/auth-bg.png')}
              style={styles.headerImage}
              resizeMode="contain"
            />

            <LexendText fontWeight="bold" style={styles.title}>
              {`Let's Register\nyou!`}
            </LexendText>
            <ManropeText style={styles.subtitle}>
              Register your details with on your own email
            </ManropeText>

            <EmailInput
              value={email}
              onChangeText={setEmail}
            />

            <Button
              title="Continue"
              style={styles.continueButton}
              onPress={handleNext}
            />
          </View>
        );
      case 2:
        return (
          <StepPersonalInfo
            handleBackPress={handleBackPress}
            handleNext={handleNext}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            address={address}
            setAddress={setAddress}
          />
        );
      case 3:
        return (
          <StepVerification
            handleBackPress={handleBackPress}
            handleNext={handleNext}
            otp={otp}
            setOtp={setOtp}
          />
        );
      case 4:
        return (
          <StepPassword
            handleBackPress={handleBackPress}
            handleNext={handleNext}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        );
      case 5:
        return <StepOnboard />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {renderStep()}

          {step === 1 && (
            <View style={styles.footer}>
              <ManropeText style={styles.dividerText}>
                Or continue with
              </ManropeText>

              <Button
                title="Google Account"
                buttonType="outline"
                style={styles.socialButton}
                icon={GoogleIcon}
              />
              <Button
                title="Apple ID"
                buttonType="outline"
                style={styles.socialButton}
                icon={AppleIcon}
              />

              <View style={styles.loginContainer}>
                <ManropeText style={styles.loginText}>
                  Already have an account?
                </ManropeText>
                <ManropeText
                  style={styles.loginLink}
                  fontWeight="extraBold"
                  onPress={handleLoginPress}
                >
                  Login
                </ManropeText>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoiding: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
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
  input: {
    width: '100%',
    marginTop: 20,
  },
  inputOutline: {
    borderRadius: 12,
    borderColor: COLORS.black,
  },
  continueButton: {
    width: '100%',
    marginVertical: 10,
  },
  footer: {
    alignItems: 'center',
    width: '100%',
  },
  dividerText: {
    marginBottom: 20,
    color: '#B3B3B3',
    fontSize: 16,
  },
  socialButton: {
    marginBottom: 10,
    width: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  loginText: {
    color: COLORS.violet300,
  },
  loginLink: {
    color: COLORS.primary,
  },
});

export default RegisterScreen;
