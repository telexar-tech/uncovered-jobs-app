import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from '../screens/CategoryScreen';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SubscribeScreen from '../screens/SubscribeScreen';
import { AuthStackParamList } from './types';

const Auth = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName="Intro"
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name="Intro" component={IntroScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
      <Auth.Screen name="Subscribe" component={SubscribeScreen} />
      <Auth.Screen name="Category" component={CategoryScreen} />
    </Auth.Navigator>
  );
};

export default AuthStackNavigator;
