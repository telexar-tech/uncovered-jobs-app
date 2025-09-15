import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface PasswordInputProps extends Omit<TextInputProps, 'error'> {
  errorMessage?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  errorMessage,
  label = 'Password',
  testID = 'password-input',
  returnKeyType = 'done',
  maxLength = 50,
  numberOfLines = 1,
  ...rest
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [isPasswordSecure, setIsPasswordSecure] = React.useState(true);
  return (
    <>
      <TextInput
        label={label}
        testID={testID}
        textContentType="password"
        autoCapitalize="none"
        autoCorrect={false}
        mode="outlined"
        style={styles.input}
        outlineStyle={[styles.inputOutline, styles.inputOutlineBorderColor]}
        placeholderTextColor={theme.colors.text.violet200}
        activeOutlineColor={theme.colors.brand.primary}
        accessible={true}
        accessibilityLabel="Password Input"
        accessibilityHint="Enter your password"
        error={!!errorMessage}
        returnKeyType={returnKeyType}
        secureTextEntry={isPasswordSecure}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        {...rest}
        right={
          <TextInput.Icon
            icon={isPasswordSecure ? 'eye-off-outline' : 'eye'}
            onPress={() => setIsPasswordSecure(!isPasswordSecure)}
          />
        }
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

export default PasswordInput;
