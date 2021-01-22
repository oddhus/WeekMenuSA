import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addMinutes,
  differenceInMilliseconds,
  isBefore,
  parseISO,
} from "date-fns";
import { User } from "../types";

interface UserData {
  user: User;
  expirationTime: string;
}

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

let logoutTimer: any;

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokenExpirationTime, setTokenExpirationTime] = useState<Date | null>();

  const login = useCallback(
    (user: User, expirationTime = addMinutes(new Date(), 30)) => {
      setUser(user);
      setTokenExpirationTime(expirationTime);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          user,
          expirationTime: expirationTime.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setTokenExpirationTime(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const data = JSON.parse(storedData) as UserData;
      if (
        data &&
        data.expirationTime &&
        isBefore(new Date(), parseISO(data.expirationTime))
      ) {
        login(data.user, new Date(data.expirationTime));
      }
    }
  }, [login]);

  useEffect(() => {
    if (user && tokenExpirationTime) {
      const remainingTime = differenceInMilliseconds(
        tokenExpirationTime,
        new Date()
      );
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [user, logout, tokenExpirationTime]);

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
