import useSWR, { responseInterface } from "swr";
import { RecipePaginated } from "../types";
import { fetch } from "../utils/refreshFetch";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.body;
};

export function useRecipes(
  query: string | null | undefined,
  shouldFetch: boolean
) {
  let url = "recipe";
  if (query) {
    url = url + "/?" + query;
  }

  const { data, mutate, error } = useSWR(
    shouldFetch ? url : null,
    fetcher
  ) as responseInterface<RecipePaginated, any>;

  const loading = !data && !error;

  const empty = !data || (!!data && !data.recipes) || data.recipes.length === 0;

  return {
    loading,
    error,
    data,
    mutate,
    empty,
  };
}
