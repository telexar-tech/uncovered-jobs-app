/**
 * UncoveredJobsApp - React Native App
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  useColorScheme
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoader from './components/AppLoader';
import { COLORS } from './constants/colors';
import Navigation from './navigation';
import { retrieveData } from './utils/storage';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [initialRoute, setInitialRoute] = useState<'intro' | 'login'>('intro');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const introShown = await retrieveData('introShown');
        if (introShown === 'true') {
          setInitialRoute('login');
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
    backgroundColor: isDarkMode ? COLORS.black : COLORS.white,
    flex: 1,
  };

  if (loading) return <AppLoader />;

  return (
    <PaperProvider>
      <SafeAreaProvider style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Navigation initialRouteName={initialRoute} />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
