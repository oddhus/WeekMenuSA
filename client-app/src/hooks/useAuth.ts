import { useState } from "react";
import { User } from "../types";
import { addMinutes } from "date-fns";

export const useAuth = () => {
  const getUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      return undefined;
    } else {
      return JSON.parse(user) as User;
    }
  };

  const setUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("validTo", JSON.stringify(addMinutes(new Date(), 30)));
  };

  const removeUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("validTo");
  };

  return {
    getUser,
    setUser,
    removeUser,
  };
};
