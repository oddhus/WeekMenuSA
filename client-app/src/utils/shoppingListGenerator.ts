import { Ingredients, Recipe } from "../types";
import * as _ from "lodash";
import convert from "convert";

export const generateShoppingList = (recipes: Recipe[]) => {
  const ingredients = _.flatMap(recipes, getIngredients);
  console.log("or", ingredients);
  return sumIngredients(ingredients);
};

const getIngredients = (recipe: Recipe) => {
  return recipe.ingredients;
};

const sumIngredients = (ingredients: Ingredients[]) => {
  let groupIngredients = [] as Ingredients[];

  ingredients.forEach((ingredient) => {
    let index = groupIngredients.findIndex(
      (i) => i.name.toLowerCase() === ingredient.name.toLowerCase()
    );
    if (index < 0) {
      groupIngredients.push({ ...ingredient });
    } else {
      if (groupIngredients[index].suffix !== ingredient.suffix) {
        const num = tryToConvert(
          ingredient.amount,
          ingredient.suffix,
          groupIngredients[index].suffix
        );
        console.log(
          `TRying to convert ${ingredient.suffix} to ${groupIngredients[index].suffix}`
        );
        if (num !== -1) {
          groupIngredients[index].amount = groupIngredients[index].amount + num;
        } else {
          groupIngredients.push(ingredient);
        }
      } else {
        groupIngredients[index].amount =
          groupIngredients[index].amount + ingredient.amount;
      }
    }
  });

  return groupIngredients;
};

const tryToConvert = (value: number, from: any, to: any) => {
  try {
    console.log(convert(value).from(from).to(to));
    return convert(value).from(from).to(to);
  } catch {
    console.log("Failed");
    return -1;
  }
};
