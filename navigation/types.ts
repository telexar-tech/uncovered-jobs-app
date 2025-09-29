import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Intro: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Subscribe: undefined;
  Category: undefined;
};

export type BottomTabParamList = {
  Explore: undefined;
  "My Jobs": undefined;
  Message: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<BottomTabParamList>;
};