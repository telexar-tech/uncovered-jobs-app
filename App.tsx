import React from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './navigation';

function App(): React.JSX.Element {
  const { theme, isDark } = useTheme();

  const backgroundStyle = {
    backgroundColor: theme.colors.background.primary,
    flex: 1,
  };

  return (
    <ThemeProvider>
      <PaperProvider>
        <SafeAreaProvider style={backgroundStyle}>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
          />
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}

export default App;
