import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../services/auth';
import { storageUtil } from '../utils/storage';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await storageUtil.retrieveObject<UserProfile>('user');
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (userData: UserProfile) => {
    setUser(userData);
    storageUtil.storeObject('user', userData);
  };

  const logout = () => {
    setUser(null);
    storageUtil.removeData('user');
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
