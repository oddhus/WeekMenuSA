import useSWR, { responseInterface } from "swr";
import { Recipe } from "../types";
import { fetch } from "../utils/refreshFetch";

const fetcher = async (url: string, token: string) => {
  // const response = await fetch(url, {
  //     headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
  // });
  const response = await fetch(url);

  // if (response.response.status === 401) {
  //   throw new Error("Unauthorized");
  // }

  return response.body;
};

export function useUserRecipes(token: string | null | undefined) {
  const { data, mutate, error } = useSWR(
    token ? ["recipe/user", token] : null,
    fetcher
  ) as responseInterface<Recipe[], Error>;

  const loading = !data && !error;

  const empty = !data || (!!data && data.length === 0);

  return {
    loading,
    error,
    data,
    mutate,
    empty,
  };
}
