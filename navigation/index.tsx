import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import IntroScreen from '../screens/IntroScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="intro"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="intro" component={IntroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
