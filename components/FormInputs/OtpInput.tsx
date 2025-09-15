import React, { useMemo, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { ThemeType } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import ManropeText from '../ManropeText';

interface OtpInputProps {
  onOtpChange: (otp: string) => void;
  length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ onOtpChange, length = 4 }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState('');

  const handleOnPress = () => {
    inputRef.current?.focus();
  };

  const handleOnChange = (text: string) => {
    const newCode = text.slice(0, length);
    setCode(newCode);
    onOtpChange(newCode);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.inputContainer} onPress={handleOnPress}>
        {Array.from({ length }).map((_, index) => {
          const digit = code[index] || '';
          const isFocused = index === code.length;

          return (
            <View
              key={index}
              style={[
                styles.pinCodeContainer,
                styles.pinCodeBorderColor,
                isFocused && styles.pinCodeFocusedBorderColor,
              ]}
            >
              <ManropeText
                style={[styles.pinCodeText, styles.pinCodeTextColor]}
              >
                {digit}
              </ManropeText>
            </View>
          );
        })}
      </Pressable>
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={code}
        onChangeText={handleOnChange}
        keyboardType="number-pad"
        maxLength={length}
        caretHidden={Platform.OS === 'ios'}
        textContentType="oneTimeCode"
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        testID="otp-input-hidden"
      />
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    hiddenInput: {
      position: 'absolute',
      width: 1,
      height: 1,
      opacity: 0,
    },
    pinCodeContainer: {
      width: 54,
      height: 54,
      borderRadius: 12,
      borderWidth: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pinCodeBorderColor: {
      borderColor: theme.colors.text.violet100,
    },
    pinCodeFocusedBorderColor: {
      borderColor: theme.colors.text.primary,
    },
    pinCodeText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    pinCodeTextColor: {
      color: theme.colors.text.primary,
    },
  });

export default OtpInput;
