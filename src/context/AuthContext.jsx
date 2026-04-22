import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  }

  const logout = () => {
    setIsLoggedIn(false);
  }

  const value = {
    isLoggedIn,
    login,
    logout
  };

  return (
    <AuthContext value={value}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  return { isLoggedIn, login, logout };
}