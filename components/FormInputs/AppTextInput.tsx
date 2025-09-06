import { StyleSheet } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { COLORS } from '../../constants/colors';

interface InputProps extends Omit<TextInputProps, 'error'> {
  errorMessage?: string;
}

const AppTextInput: React.FC<InputProps> = ({
  errorMessage,
  maxLength = 50,
  numberOfLines = 1,
  ...rest
}) => {
  return (
    <>
      <TextInput
        style={styles.input}
        outlineStyle={styles.inputOutline}
        placeholderTextColor={COLORS.violet200}
        activeOutlineColor={COLORS.primary}
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

export default AppTextInput;
