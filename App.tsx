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
import { RootStackParamList } from './navigation/types';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Auth');
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
