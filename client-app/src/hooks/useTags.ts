import useSWR, { responseInterface } from "swr";
import { Tags } from "../types";

const fetcher = async (url: string) => {
    const response = await fetch(url);
    return await response.json()
}

export function useTags() {
    const { data, mutate, error } = useSWR('tag', fetcher) as responseInterface<Tags[], any>

    const loading = !data && !error;

    const empty = !!data && data.length === 0

    return {
        loading,
        error,
        data,
        mutate,
        empty
    };
}