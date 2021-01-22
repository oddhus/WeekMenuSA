import useSWR, { responseInterface } from "swr";
import { RecipePaginated } from "../types";

const fetcher = async (url: string, token: string) => {
    const response = await fetch(url, {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    return await response.json()
}

export function useRecipes(token: string | null | undefined, query: string | null | undefined, shouldFetch: boolean) {
    let url = 'recipe'
    if (query) {
        url = url + "/?" + query
    }

    const { data, mutate, error } = useSWR(shouldFetch ? [url, token] : null, fetcher) as responseInterface<RecipePaginated, any>

    const loading = !data && !error;

    const empty = !data || (!!data && !data.recipes) || (data.recipes.length === 0)

    return {
        loading,
        error,
        data,
        mutate,
        empty
    };
}