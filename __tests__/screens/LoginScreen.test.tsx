import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';
import * as auth from '../../services/auth';
import { Alert } from 'react-native';

jest.mock('../../services/auth', () => ({
  login: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

describe('LoginScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
    (Alert.alert as jest.Mock).mockClear?.();
  });

  it('should call login service with email and password on valid submission', async () => {
    const { getByTestId } = render(<LoginScreen />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const continueButton = getByTestId('continue-button');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(auth.login).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      );
    });
  });

  it('should show validation errors for empty fields', async () => {
    const { getByTestId, findByText } = render(<LoginScreen />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const continueButton = getByTestId('continue-button');

    fireEvent.changeText(emailInput, '');
    fireEvent.changeText(passwordInput, '');
    fireEvent.press(continueButton);

    const emailError = await findByText('Email is required');
    const passwordError = await findByText('Password is required');

    expect(emailError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });

  it('should show validation error for invalid email', async () => {
    const { getByTestId, findByText } = render(<LoginScreen />);
    const emailInput = getByTestId('email-input');
    const continueButton = getByTestId('continue-button');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(continueButton);

    const emailError = await findByText('Invalid email');
    expect(emailError).toBeTruthy();
  });

  it('should show api error on login failure', async () => {
    const mockLogin = auth.login as jest.Mock;
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));
    jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<LoginScreen />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const continueButton = getByTestId('continue-button');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login Failed',
        'Invalid credentials',
      );
    });
  });
});
