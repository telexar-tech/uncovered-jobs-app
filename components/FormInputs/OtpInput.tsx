import React, { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import ManropeText from '../ManropeText';
import { COLORS } from '../../constants/colors';

interface OtpInputProps {
  onOtpChange: (otp: string) => void;
  length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ onOtpChange, length = 4 }) => {
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
                isFocused && styles.activePinCodeContainer,
              ]}
            >
              <ManropeText style={styles.pinCodeText}>{digit}</ManropeText>
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
        autoComplete={Platform.OS === "android" ? "sms-otp" : "one-time-code"}
        testID="otp-input-hidden"
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor: COLORS.violet100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinCodeText: {
    fontSize: 24,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  activePinCodeContainer: {
    borderColor: COLORS.black,
  },
});

export default OtpInput;
