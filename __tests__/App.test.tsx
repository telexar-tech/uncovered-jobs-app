import React from 'react';
import {render, act} from '@testing-library/react-native';
import App from '../App';

jest.mock('../utils/storage', () => ({
  storageUtil: {
    retrieveObject: jest.fn().mockResolvedValue(null),
    storeObject: jest.fn(),
    removeData: jest.fn(),
  },
}));

describe('App', () => {
  it('renders correctly', async () => {
    await act(async () => {
      render(<App />);
    });
  });
});
