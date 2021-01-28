import { useEffect, useState } from "react";
import { Recipe } from "../types";
import { fetch } from "../utils/refreshFetch";

const weekmenuItemFetcher = async (excludeIds: string) => {
  const response = await fetch("recipe/weekmenu/item" + excludeIds);
  return response.body;
};

const weekmenuSpecificItemFetcher = async (id: number) => {
  const response = await fetch("recipe/" + id);
  return response.body;
};

const weekmenuFetcher = async (amount: number, urlTags: string) => {
  const response = await fetch(
    "/recipe/weekmenu?weekLength=" + amount + urlTags
  );
  return response.body;
};

export function useWeekmenu(
  amount: number,
  tags: string | null,
  token: string | null | undefined
) {
  const [data, setData] = useState<Recipe[] | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setLoading(true);
    let isCanceled = false;
    const controller = new AbortController();

    const myWeekMenu = localStorage.getItem("weekmenu");
    let parsedData;
    if (myWeekMenu) {
      try {
        parsedData = JSON.parse(myWeekMenu);
      } catch (e) {
        localStorage.removeItem("weekmenu");
        setError(e.message);
      }
    }

    if (!parsedData || parsedData.length < 5) {
      const urlTags = tags ? "&" + tags : "";
      const runHandler = async () => {
        try {
          const response = await fetch(
            "recipe/weekmenu/?weekLength=" + amount + urlTags
          );
          const data = response.body as Recipe[];
          if (isCanceled) {
            return;
          }
          localStorage.setItem("weekmenu", JSON.stringify(data));
          setData(data);
          setError("");
        } catch (e) {
          setError(e.message);
        }
      };
      runHandler();
    } else {
      setData(parsedData);
    }

    setLoading(false);

    return () => {
      isCanceled = true;
      controller.abort();
    };
  }, [amount, token, tags]);

  const onSwap = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!data) {
      setError("No data to swap!");
      return;
    }

    const excludeRecipes = data.reduce((accumulator, recipe) => {
      return accumulator + "excludeId=" + recipe.id + "&";
    }, "/?");

    try {
      const recipe = (await weekmenuItemFetcher(excludeRecipes)) as Recipe;
      if (recipe) {
        const index = data.findIndex((recipe) => recipe.id === id);
        const newWeekmenu = [
          ...data.slice(0, index),
          recipe,
          ...data.slice(index + 1),
        ];
        localStorage.setItem("weekmenu", JSON.stringify(newWeekmenu));
        setData(newWeekmenu);
        setError("");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const onIdSwap = async (oldId: number, newId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!data) {
      setError("No data to swap!");
      return;
    }

    if (oldId === newId || data.find((r) => r.id === newId) !== undefined) {
      setError(`Cannot swap recipe with ${oldId} with ${newId}!`);
      return;
    }

    try {
      const recipe = (await weekmenuSpecificItemFetcher(newId)) as Recipe;
      if (recipe) {
        const index = data.findIndex((recipe) => recipe.id === oldId);
        const newWeekmenu = [
          ...data.slice(0, index),
          recipe,
          ...data.slice(index + 1),
        ];
        localStorage.setItem("weekmenu", JSON.stringify(newWeekmenu));
        setData(newWeekmenu);
        setError("");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const onSwapAll = async (amount: number, tags: string | null) => {
    setLoading(true);
    const urlTags = tags ? "&" + tags : "";
    try {
      const data = (await weekmenuFetcher(amount, urlTags)) as Recipe[];
      localStorage.setItem("weekmenu", JSON.stringify(data));
      setData(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return {
    loading,
    error,
    data,
    onSwap,
    onSwapAll,
    onIdSwap,
  };
}
