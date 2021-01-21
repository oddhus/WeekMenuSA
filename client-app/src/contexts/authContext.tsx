import React, { createContext, useCallback, useEffect, useState } from "react";
import { addMinutes, differenceInMilliseconds, isBefore } from "date-fns";
import { User } from "../types";

interface UserData {
  user: User;
  expirationTime: Date;
}

interface ContextValues {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<Partial<ContextValues>>({
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
      if (data && data && isBefore(data.expirationTime, new Date())) {
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

function isProviderType(value: ContextValues): value is ContextValues {
  return value !== undefined;
}
