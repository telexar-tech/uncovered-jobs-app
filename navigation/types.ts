import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Intro: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  reset(arg0: { index: number; routes: { name: string; }[]; }): unknown;
  navigate(route: string): unknown;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Subscribe: undefined;
  Category: undefined;
  App: NavigatorScreenParams<BottomTabParamList>;
};

export type ProfileStackParamList = {
  Profile: undefined;
  UserDetails: undefined;
  UserEarnings: undefined;
  UserReports: undefined;
  Settings: undefined;
  Support: undefined;
  SupportDetail: { title: string; description: string };
};

export type BottomTabParamList = {
  Explore: undefined;
  "My Jobs": undefined;
  Message: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};