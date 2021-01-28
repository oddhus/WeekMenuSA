import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";
import {
  removeStoredUserData,
  retrieveUserWithToken,
  saveUserWithToken,
} from "../utils/storageActions";

interface ContextValues {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<ContextValues>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((user: User) => {
    setUser(user);
    saveUserWithToken(user);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    removeStoredUserData();
  }, []);

  useEffect(() => {
    const user = retrieveUserWithToken();
    if (user) {
      login(user);
    }
  }, [login]);

  // useEffect(() => {
  //   if (user && tokenExpirationTime) {
  //     const remainingTime = differenceInMilliseconds(
  //       tokenExpirationTime,
  //       new Date()
  //     );
  //     logoutTimer = setTimeout(logout, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [user, logout, tokenExpirationTime]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within a Provider");
  }
  return context;
};
