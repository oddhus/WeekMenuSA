import { addSeconds } from "date-fns";
import { User, UserData } from "../types";

export const saveUserWithToken = (
  user: User,
  expirationTime = addSeconds(new Date(), 20)
) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      user,
      expirationTime: expirationTime.toISOString(),
    })
  );
};

export const retrieveUserWithToken = () => {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const data = JSON.parse(storedData) as UserData;
    return data.user;
  }
};

export const retrieveToken = () => {
  return retrieveUserWithToken()?.token;
};

export const retrieveTokenAndRefreshToken = () => {
  const user = retrieveUserWithToken();
  if (user) {
    return {
      token: user.token,
      refreshToken: user.refreshToken,
    };
  }
};

export const removeStoredUserData = () => {
  localStorage.removeItem("userData");
};
