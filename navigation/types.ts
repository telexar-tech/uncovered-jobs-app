import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Intro: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Subscribe: undefined;
  Category: undefined;
  App: NavigatorScreenParams<BottomTabParamList>;
};

export type BottomTabParamList = {
  Explore: undefined;
  "My Jobs": undefined;
  Message: undefined;
  Profile: undefined;
};
