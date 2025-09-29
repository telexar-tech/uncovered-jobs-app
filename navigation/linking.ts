import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['uncovered-jobs-app://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Intro: 'intro',
          Login: 'login',
          Register: 'register',
          ForgotPassword: 'forgot-password',
          Subscribe: 'subscribe',
          Category: 'category',
        },
      },
      App: {
        screens: {
          Explore: 'explore',
          'My Jobs': 'my-jobs',
          Message: 'message',
          Profile: 'profile',
        },
      },
    },
  },
};

export default linking;
