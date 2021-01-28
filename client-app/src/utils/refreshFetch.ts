import merge from "lodash/merge";
import { configureRefreshFetch, fetchJSON } from "refresh-fetch";
import { User } from "../types";
import {
  removeStoredUserData,
  retrieveToken,
  retrieveTokenAndRefreshToken,
  saveUserWithToken,
} from "./storageActions";

// Add token to the request headers
const fetchJSONWithToken = (url: string, options = {}) => {
  const token = retrieveToken();

  let optionsWithToken = options;
  if (token) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return fetchJSON(url, optionsWithToken);
};

// Decide whether this error returned from API means that we want
// to try refreshing the token. error.response contains the fetch Response
// object, error.body contains the parsed JSON response body
const shouldRefreshToken = (error: any) => error.response.status === 401;

// Do the actual token refreshing and update the saved token
const refreshToken = async () => {
  return fetchJSONWithToken("/user/refresh", {
    method: "POST",
    body: JSON.stringify(retrieveTokenAndRefreshToken()),
  })
    .then((response) => {
      saveUserWithToken(response.body as User);
    })
    .catch((error) => {
      // If we failed by any reason in refreshing, just clear the token,
      // it's not that big of a deal
      removeStoredUserData();
      throw error;
    });
};

export const fetch = configureRefreshFetch({
  shouldRefreshToken,
  refreshToken,
  fetch: fetchJSONWithToken,
});
