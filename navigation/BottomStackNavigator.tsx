import { RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  ExploreIcon,
  MessageIcon,
  MyJobsIcon,
  ProfileIcon,
} from '../assets/icons';
import { COLORS } from '../constants/colors';
import ExploreScreen from '../screens/ExploreScreen';
import MessageScreen from '../screens/MessageScreen';
import MyJobsScreen from '../screens/MyJobsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { BottomTabParamList } from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const routeIcons: Record<keyof BottomTabParamList, React.FC<any>> = {
  Explore: ExploreIcon,
  'My Jobs': MyJobsIcon,
  Message: MessageIcon,
  Profile: ProfileIcon,
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
  return (
    <BottomTab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ color, size }) => renderTabBarIcon(route, color, size),
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#CFCFCF',
        tabBarStyle: {
          backgroundColor: '#fff',
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
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
