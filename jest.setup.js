/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */

import "@testing-library/jest-native/extend-expect";

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');

  const actual = jest.requireActual('react-native-safe-area-context');

  const inset = { top: 0, right: 0, bottom: 0, left: 0 };

  const SafeAreaContext = React.createContext(inset);

  return {
    ...actual,
    SafeAreaProvider: ({ children }) => (
      <SafeAreaContext.Provider value={inset}>{children}</SafeAreaContext.Provider>
    ),
    SafeAreaView: ({ children }) => <View style={{ paddingTop: 0 }}>{children}</View>,
    useSafeAreaInsets: () => inset,
    SafeAreaConsumer: SafeAreaContext.Consumer,
    SafeAreaContext,
  };
});

// Mock react-native navigation
jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// Mock SVG files
jest.mock("react-native-svg", () => {
  const { View } = require("react-native");
  return {
    ...jest.requireActual("react-native-svg"),
    SvgXml: View,
    SvgUri: View,
  };
});
