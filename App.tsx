/**
 * UncoveredJobsApp - React Native App
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoader from './components/AppLoader';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './navigation';
import { RootStackParamList } from './navigation/types';
import { retrieveData } from './utils/storage';

function App(): React.JSX.Element {
  const { theme, isDark } = useTheme();
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('Auth');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const onboarded = await retrieveData('onboarded');

        if (onboarded === 'true') {
          setInitialRoute('App');
        } else {
          setInitialRoute('Auth');
        }
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    checkIntroStatus();
  }, []);

  const backgroundStyle = {
    backgroundColor: theme.colors.background.primary,
    flex: 1,
  };

  if (loading) return <AppLoader />;

  return (
    <ThemeProvider>
      <PaperProvider>
        <SafeAreaProvider style={backgroundStyle}>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.background.primary}
          />
          <Navigation initialRouteName={initialRoute} />
        </SafeAreaProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}

export default App;
