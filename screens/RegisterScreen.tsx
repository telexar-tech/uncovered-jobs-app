import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppleIcon, GoogleIcon } from '../assets/icons';
import Button from '../components/Button';
import { EmailInput } from '../components/FormInputs';
import LexendText from '../components/LexendText';
import ManropeText from '../components/ManropeText';
import StepOnboard from '../components/Registration/StepOnboard';
import StepPassword from '../components/Registration/StepPassword';
import StepPersonalInfo from '../components/Registration/StepPersonalInfo';
import StepVerification from '../components/Registration/StepVerification';
import { ThemeType } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

type AuthStackParamList = {
  Login: undefined;
};

const RegisterScreen: FC = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

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
    navigation.navigate('Login');
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
            <ManropeText style={[styles.subtitle, styles.subtitleColor]}>
              Register your details with on your own email
            </ManropeText>

            <EmailInput value={email} onChangeText={setEmail} />

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
    <SafeAreaView style={[styles.safeArea, styles.safeAreaBackground]}>
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
              <ManropeText
                style={[styles.dividerText, styles.dividerTextColor]}
              >
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
                iconColor={theme.colors.text.primary}
              />

              <View style={styles.loginContainer}>
                <ManropeText style={[styles.loginText, styles.loginTextColor]}>
                  Already have an account?
                </ManropeText>
                <ManropeText
                  style={[styles.loginLink, styles.loginLinkColor]}
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

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    safeAreaBackground: {
      backgroundColor: theme.colors.background.primary,
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
      fontSize: 16,
      marginLeft: 4,
    },
    subtitleColor: {
      color: theme.colors.text.muted,
    },
    input: {
      width: '100%',
      marginTop: 20,
    },
    inputOutline: {
      borderRadius: 12,
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
      fontSize: 16,
    },
    dividerTextColor: {
      color: theme.colors.text.violet200,
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
    loginText: {},
    loginTextColor: {
      color: theme.colors.text.violet200,
    },
    loginLink: {
      textDecorationLine: 'underline',
    },
    loginLinkColor: {
      color: theme.colors.brand.primary,
    },
  });

export default RegisterScreen;
