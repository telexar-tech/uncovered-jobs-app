import { ExploreIcon, MessageIcon, MyJobsIcon, UserIcon } from '@/assets/icons';
import { useTheme } from '@/context/ThemeContext';
import ExploreScreen from '@/screens/ExploreScreen';
import MessageScreen from '@/screens/MessageScreen';
import MyJobsScreen from '@/screens/MyJobsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import SupportScreen from '@/screens/SupportScreen';
import SupportDetailScreen from '@/screens/SupportDetailScreen';
import UserProfileScreen from '@/screens/user/UserDetailsScreen';
import UserEarningsScreen from '@/screens/user/UserEarningsScreen';
import UserReportsScreen from '@/screens/user/UserReportsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BottomTabParamList } from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator();

const routeIcons: Record<keyof BottomTabParamList, React.FC<any>> = {
  Explore: ExploreIcon,
  'My Jobs': MyJobsIcon,
  Message: MessageIcon,
  Profile: UserIcon,
};

const renderTabBarIcon = (
  route: RouteProp<BottomTabParamList, keyof BottomTabParamList>,
  color: string,
  size: number,
) => {
  const Icon = routeIcons[route.name];

  if (!Icon) return null;

  return <Icon width={size} height={size} fill={color} />;
};

const BottomTabNavigator = () => {
  const { theme } = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ color, size }) => renderTabBarIcon(route, color, size),
        tabBarActiveTintColor: theme.colors.brand.primary,
        tabBarInactiveTintColor: theme.colors.text.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 5,
          marginBottom: 5,
        },
        tabBarLabelStyle: {
          marginTop: 5,
        },
      })}
      backBehavior="none"
    >
      <BottomTab.Screen name="Explore" component={ExploreScreen} />
      <BottomTab.Screen name="My Jobs" component={MyJobsScreen} />
      <BottomTab.Screen name="Message" component={MessageScreen} />
      <BottomTab.Screen name="Profile" component={ProfileStack} />
    </BottomTab.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileTab"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileTab" component={ProfileScreen} />
      <Stack.Screen name="UserDetails" component={UserProfileScreen} />
      <Stack.Screen name="UserEarnings" component={UserEarningsScreen} />
      <Stack.Screen name="UserReports" component={UserReportsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="SupportDetail" component={SupportDetailScreen} />
    </Stack.Navigator>
  );
};

export default BottomTabNavigator;