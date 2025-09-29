import { useFormik } from 'formik';
import React, { FC, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { isValidNumber } from 'react-native-phone-entry';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import StepEmail from '../components/Registration/StepEmail';
import StepOnboard from '../components/Registration/StepOnboard';
import StepPassword from '../components/Registration/StepPassword';
import StepPersonalInfo from '../components/Registration/StepPersonalInfo';
import StepVerification from '../components/Registration/StepVerification';
import { ThemeType } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { register, sendOtp, verifyOtp } from '../services/auth';

const REGISTRATION_STEPS = {
  EMAIL: 1,
  PERSONAL_INFO: 2,
  VERIFICATION: 3,
  PASSWORD: 4,
  ONBOARD: 5,
};

const stepSchemas = [
  Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  }),
  Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Invalid phone number', function (value) {
        return isValidNumber(value, '');
      }),
    address: Yup.string().required('Address is required'),
  }),
  Yup.object().shape({
    otp: Yup.string()
      .length(6, 'OTP must be 6 digits')
      .required('OTP is required'),
  }),
  Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  }),
];

const RegisterScreen: FC = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [currentStep, setCurrentStep] = useState(REGISTRATION_STEPS.EMAIL);

  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    otp: '',
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await sendOtp(formik.values.email);
      setCurrentStep(REGISTRATION_STEPS.VERIFICATION);
    } catch (error: any) {
      Alert.alert('OTP Sending Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      await verifyOtp(formik.values.email, formik.values.otp);
      setCurrentStep(REGISTRATION_STEPS.PASSWORD);
    } catch (error: any) {
      Alert.alert('OTP Verification Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await register(formik.values);
      setCurrentStep(REGISTRATION_STEPS.ONBOARD);
    } catch (error: any) {
      Alert.alert('User Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: stepSchemas[currentStep - 1],
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => handleFormSubmit(),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    validateField,
    isValid,
  } = formik;

  const handleFormSubmit = async () => {
    switch (currentStep) {
      case REGISTRATION_STEPS.EMAIL:
        setCurrentStep(REGISTRATION_STEPS.PERSONAL_INFO);
        break;
      case REGISTRATION_STEPS.PERSONAL_INFO:
        await handleSendOtp();
        break;
      case REGISTRATION_STEPS.VERIFICATION:
        await handleVerifyOtp();
        break;
      case REGISTRATION_STEPS.PASSWORD:
        await handleRegister();
        break;
      default:
        break;
    }
  };

  const handleBackPress = () => {
    if (currentStep > REGISTRATION_STEPS.EMAIL) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case REGISTRATION_STEPS.EMAIL:
        return (
          <StepEmail
            email={values.email}
            error={errors.email}
            touched={touched.email}
            handleChange={text => setFieldValue('email', text, true)}
            handleBlur={() => {
              formik.setFieldTouched('email');
              validateField('email');
            }}
            onSubmit={handleSubmit}
          />
        );
      case REGISTRATION_STEPS.PERSONAL_INFO:
        return (
          <StepPersonalInfo
            handleBackPress={handleBackPress}
            values={values}
            errors={errors}
            touched={touched}
            onSubmit={handleSubmit}
            setFieldValue={setFieldValue}
            validateField={validateField}
            isValid={isValid}
          />
        );
      case REGISTRATION_STEPS.VERIFICATION:
        return (
          <StepVerification
            handleBackPress={handleBackPress}
            otp={values.otp}
            setOtp={text => setFieldValue('otp', text)}
            sendOtp={handleSendOtp}
            onSubmit={handleSubmit}
            loading={loading}
          />
        );
      case REGISTRATION_STEPS.PASSWORD:
        return (
          <StepPassword
            handleBackPress={handleBackPress}
            onSubmit={handleSubmit}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            isValid={isValid}
            loading={loading}
          />
        );
      case REGISTRATION_STEPS.ONBOARD:
        return <StepOnboard />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {renderStep()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    keyboardAvoiding: { flex: 1 },
    container: {
      flexGrow: 1,
      justifyContent: 'space-between',
      padding: 20,
    },
  });

export default RegisterScreen;
