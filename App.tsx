/**
 * UncoveredJobsApp - React Native App
 * 
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    flex: 1,
  };

  const textStyle = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const handleGetStarted = () => {
    Alert.alert(
      'Welcome!',
      'Your React Native app is working perfectly!',
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={styles.scrollContainer}>

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, textStyle]}>
              🚀 UncoveredJobsApp
            </Text>
            <Text style={[styles.subtitle, textStyle]}>
              React Native App Successfully Created!
            </Text>
          </View>

          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={[styles.cardTitle, textStyle]}>
                ✅ App Features
              </Text>
              <Text style={[styles.cardText, textStyle]}>
                • React Native 0.81.1
              </Text>
              <Text style={[styles.cardText, textStyle]}>
                • TypeScript Support
              </Text>
              <Text style={[styles.cardText, textStyle]}>
                • Yarn Package Manager
              </Text>
              <Text style={[styles.cardText, textStyle]}>
                • Dark/Light Mode Support
              </Text>
              <Text style={[styles.cardText, textStyle]}>
                • Safe Area Context
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleGetStarted}
              activeOpacity={0.7}>
              <Text style={styles.buttonText}>
                Get Started
              </Text>
            </TouchableOpacity>

            <View style={styles.infoSection}>
              <Text style={[styles.infoTitle, textStyle]}>
                📱 Development Info
              </Text>
              <Text style={[styles.infoText, textStyle]}>
                Metro bundler running on: http://localhost:8082
              </Text>
              <Text style={[styles.infoText, textStyle]}>
                Ready for iOS and Android development
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#424242',
  },
});

export default App;
