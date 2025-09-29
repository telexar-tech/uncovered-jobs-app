import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, Fragment, useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { AppleIcon, GoogleIcon } from '../../assets/icons';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { AuthStackParamList } from '../../navigation/types';
import { scale } from '../../utils/scale';
import Button from '../Button';
import { EmailInput } from '../FormInputs';
import LexendText from '../LexendText';
import ManropeText from '../ManropeText';

type StepEmailProps = {
  email: string;
  error?: string;
  touched?: boolean;
  handleChange: (text: string) => void;
  handleBlur: () => void;
  onSubmit: () => void;
};

const StepEmail: FC<StepEmailProps> = ({
  email,
  error,
  touched,
  handleChange,
  handleBlur,
  onSubmit,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <Fragment>
      <View>
        <Image
          source={require('../../assets/images/auth-bg.png')}
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
          onChangeText={handleChange}
          onBlur={handleBlur}
          errorMessage={touched && error ? error : undefined}
          onSubmitEditing={onSubmit}
          testID="email-input"
        />

        <Button
          disabled={!email || !!error}
          title="Continue"
          style={styles.continueButton}
          onPress={onSubmit}
        />
      </View>
      <View style={styles.footer}>
        <ManropeText style={styles.dividerText}>Or continue with</ManropeText>

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
          <ManropeText style={styles.loginText}>
            Already have an account?
          </ManropeText>
          <ManropeText
            style={styles.loginLink}
            fontWeight="extraBold"
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            Login
          </ManropeText>
        </View>
      </View>
    </Fragment>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    headerImage: {
      width: '100%',
      height: 200,
      borderRadius: 16,
    },
    title: {
      fontSize: scale(38),
      marginTop: 20,
      marginBottom: 15,
      lineHeight: scale(48),
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
    footer: {
      alignItems: 'center',
      width: '100%',
    },
    dividerText: {
      marginBottom: 20,
      fontSize: 16,
      color: theme.colors.text.violet200,
    },
    socialButton: { marginBottom: 10, width: '100%' },
    loginContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 5,
      marginBottom: 10,
    },
    loginText: { color: theme.colors.text.violet200 },
    loginLink: {
      textDecorationLine: 'underline',
      color: theme.colors.brand.primary,
    },
  });

export default StepEmail;
