import { useEffect, useState } from "react";
import { number } from "yup/lib/locale";
import { Recipe } from "../types";

const weekmenuItemFetcher = async (
  token: string | null | undefined,
  excludeIds: string
) => {
  const response = await fetch("recipe/weekmenu/item" + excludeIds, {
    headers: !token ? {} : { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

const weekmenuSpecificItemFetcher = async (
  token: string | null | undefined,
  id: number
) => {
  const response = await fetch("recipe/" + id, {
    headers: !token ? {} : { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

const weekmenuFetcher = async (
  token: string | null | undefined,
  amount: number,
  urlTags: string
) => {
  const response = await fetch(
    "/recipe/weekmenu?weekLength=" + amount + urlTags,
    {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    }
  );
  return await response.json();
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
            "recipe/weekmenu/?weekLength=" + amount + urlTags,
            {
              headers: !token ? {} : { Authorization: `Bearer ${token}` },
            }
          );
          const data = await response.json();
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
  }, [amount, token]);

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
      const recipe = await weekmenuItemFetcher(token, excludeRecipes);
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
      const recipe = await weekmenuSpecificItemFetcher(token, newId);
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
      const data = await weekmenuFetcher(token, amount, urlTags);
      console.log(data);
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
