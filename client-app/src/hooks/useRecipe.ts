import useSWR, { responseInterface } from "swr";
import { Recipe } from "../types";

const fetcher = async (url: string, token: string) => {
  const response = await fetch(url, {
    headers: !token ? {} : { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export function useRecipe(
  id: string | null | undefined,
  token: string | null | undefined
) {
  const { data, mutate, error } = useSWR(
    id ? ["/recipe/" + id, token] : null,
    fetcher
  ) as responseInterface<Recipe, any>;

  console.log(id);

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}
