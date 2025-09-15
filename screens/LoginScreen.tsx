import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useMemo } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { AppleIcon, GoogleIcon } from '../assets/icons';
import Button from '../components/Button';
import { EmailInput, PasswordInput } from '../components/FormInputs';
import LexendText from '../components/LexendText';
import ManropeText from '../components/ManropeText';
import { ThemeType } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

type AuthStackParamList = {
  Register: undefined;
};

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'At least 6 characters')
    .required('Password is required'),
});

const LoginScreen: FC = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});

  const passwordInputRef = React.useRef<any>(null);

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleSubmit = async () => {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      console.log({ email, password });
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
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
          <View>
            <Image
              source={require('../assets/images/auth-bg.png')}
              style={styles.headerImage}
              resizeMode="contain"
            />

            <LexendText fontWeight="bold" style={styles.title}>
              {`Let's Login`}
            </LexendText>
            <ManropeText style={[styles.subtitle, styles.subtitleColor]}>
              Enter your login credentials
            </ManropeText>

            <>
              <EmailInput
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  if (errors.email) {
                    setErrors(prev => ({ ...prev, email: undefined }));
                  }
                }}
                errorMessage={errors.email}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <PasswordInput
                ref={passwordInputRef}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors(prev => ({ ...prev, password: undefined }));
                  }
                }}
                errorMessage={errors.password}
                testID="password-input"
              />

              <TouchableOpacity onPress={() => {}}>
                <ManropeText
                  style={[styles.forgotPassword, styles.forgotPasswordColor]}
                >
                  Forgot Password?
                </ManropeText>
              </TouchableOpacity>

              <Button
                title="Continue"
                style={styles.continueButton}
                onPress={handleSubmit}
              />
            </>
          </View>

          <View style={styles.footer}>
            <ManropeText style={[styles.dividerText, styles.dividerTextColor]}>
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
                I don't have an account?
              </ManropeText>
              <ManropeText
                style={[styles.loginLink, styles.loginLinkColor]}
                fontWeight="extraBold"
                onPress={handleRegisterPress}
              >
                Register
              </ManropeText>
            </View>
          </View>
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
    keyboardAvoiding: {
      flex: 1,
    },
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
    },
    subtitle: {
      fontSize: 16,
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
      color: theme.colors.neutral.grey,
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
      color: theme.colors.text.muted,
    },
    loginLink: {},
    loginLinkColor: {
      color: theme.colors.brand.primary,
    },
    forgotPassword: {
      textAlign: 'right',
      marginTop: 5,
    },
    forgotPasswordColor: {
      color: theme.colors.neutral.grey,
    },
  });

export default LoginScreen;
