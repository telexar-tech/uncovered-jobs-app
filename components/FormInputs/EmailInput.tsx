import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { COLORS } from '../../constants/colors';
import { StyleSheet } from 'react-native';

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
        outlineStyle={styles.inputOutline}
        placeholderTextColor={COLORS.violet200}
        activeOutlineColor={COLORS.primary}
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

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginTop: 20,
  },
  inputOutline: {
    borderRadius: 12,
    borderColor: COLORS.violet200,
  },
});

export default EmailInput;
