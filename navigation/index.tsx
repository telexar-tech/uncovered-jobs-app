import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import AppLoader from '../components/AppLoader';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AuthStackNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import linking from './linking';

function Navigation() {
  const { isDark } = useTheme();
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer
      linking={linking}
      fallback={<AppLoader />}
      theme={isDark ? DarkTheme : DefaultTheme}
    >
      {isLoggedIn ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
