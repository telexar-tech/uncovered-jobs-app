import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface EmailInputProps extends Omit<TextInputProps, 'error'> {
  errorMessage?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  errorMessage,
  returnKeyType = 'next',
  maxLength = 50,
  numberOfLines = 1,
  ...rest
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <>
      <TextInput
        label="Email"
        testID="email-input"
        inputMode="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        mode="outlined"
        style={styles.input}
        outlineStyle={[styles.inputOutline, styles.inputOutlineBorderColor]}
        placeholderTextColor={theme.colors.text.violet200}
        activeOutlineColor={theme.colors.brand.primary}
        accessible={true}
        accessibilityLabel="Email Input"
        accessibilityHint="Enter your email address"
        error={!!errorMessage}
        returnKeyType={returnKeyType}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        {...rest}
      />
      {errorMessage && (
        <HelperText type="error" visible={true}>
          {errorMessage}
        </HelperText>
      )}
    </>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    input: {
      width: '100%',
      marginTop: 20,
    },
    inputOutline: {
      borderRadius: 12,
    },
    inputOutlineBorderColor: {
      borderColor: theme.colors.text.violet200,
    },
  });

export default EmailInput;
