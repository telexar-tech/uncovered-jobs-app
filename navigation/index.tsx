import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import CategoryScreen from '../screens/CategoryScreen';
import SubscribeScreen from '../screens/SubscribeScreen';
import BottomTabNavigator from './BottomStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation({
  initialRouteName,
}: {
  initialRouteName: keyof RootStackParamList;
}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen name="Subscribe" component={SubscribeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="App" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
