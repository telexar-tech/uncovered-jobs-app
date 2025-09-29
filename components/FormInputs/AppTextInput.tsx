import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface InputProps extends Omit<TextInputProps, 'error'> {
  errorMessage?: string;
}

const AppTextInput: React.FC<InputProps> = ({
  errorMessage,
  maxLength = 50,
  numberOfLines = 1,
  ...rest
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <>
      <TextInput
        style={styles.input}
        outlineStyle={[styles.inputOutline, styles.inputOutlineBorderColor]}
        placeholderTextColor={theme.colors.text.violet200}
        activeOutlineColor={theme.colors.brand.primary}
        error={!!errorMessage}
        mode="outlined"
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
      backgroundColor: theme.colors.background.primary,
    },
    inputOutline: {
      borderRadius: 12,
    },
    inputOutlineBorderColor: {
      borderColor: theme.colors.text.violet200,
    },
  });

export default AppTextInput;
