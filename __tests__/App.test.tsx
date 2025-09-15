/**
 * @format
 */

import React from 'react';
import { PaperProvider } from 'react-native-paper';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  });
});
