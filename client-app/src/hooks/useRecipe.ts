import useSWR, { responseInterface } from "swr";
import { Recipe } from "../types";
import { fetch } from "../utils/refreshFetch";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  console.log(response);
  return response.body;
};

export function useRecipe(id: string | null | undefined) {
  const { data, mutate, error } = useSWR(
    id ? ["/recipe/" + id] : null,
    fetcher
  ) as responseInterface<Recipe, any>;

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
}
