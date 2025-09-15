import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, ThemeType } from '../constants/theme';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  setFollowSystem: (follow: boolean) => void;
  isDark: boolean;
  followSystem: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  setFollowSystem: () => {},
  isDark: false,
  followSystem: true,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [followSystem, setFollowSystem] = useState(true);
  const [isDark, setIsDark] = useState(systemScheme === 'dark');

  useEffect(() => {
    if (followSystem && systemScheme) {
      setIsDark(systemScheme === 'dark');
    }
  }, [systemScheme, followSystem]);

  const toggleTheme = () => {
    if (followSystem) {
      setFollowSystem(false);
    }
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? darkTheme : lightTheme,
        toggleTheme,
        setFollowSystem,
        isDark,
        followSystem,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
