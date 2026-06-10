import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  appUsername: string | null;
  leetcodeUsername: string | null;
  setAuth: (token: string, username: string) => void;
  setLeetcodeUsername: (username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [appUsername, setAppUsername] = useState<string | null>(localStorage.getItem('appUsername'));
  const [leetcodeUsername, setLeetcodeUsernameState] = useState<string | null>(
    localStorage.getItem('leetcodeUsername')
  );

  const setAuth = (newToken: string, username: string) => {
    setToken(newToken);
    setAppUsername(username);
    localStorage.setItem('token', newToken);
    localStorage.setItem('appUsername', username);
  };

  const setLeetcodeUsername = (username: string) => {
    setLeetcodeUsernameState(username);
    localStorage.setItem('leetcodeUsername', username);
  };

  const logout = () => {
    setToken(null);
    setAppUsername(null);
    setLeetcodeUsernameState(null);
    localStorage.removeItem('token');
    localStorage.removeItem('appUsername');
    localStorage.removeItem('leetcodeUsername');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        appUsername,
        leetcodeUsername,
        setAuth,
        setLeetcodeUsername,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
