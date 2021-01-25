using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Models;

namespace WeekMenuSA.Data
{
    public interface IRecipeRepository
    {
        bool SaveChanges();

        Recipe GetRecipeById(int id);

        Recipe GetRandomRecipe(List<int> excludeId);

        IEnumerable<Recipe> GetRandomRecipes(RandomRecipeParameters parameters);

        IEnumerable<Recipe> GetRecipesByUserId(string id);

        PaginatedRecipeList GetAllRecipes(RecipeParameters recipeParameters);

        void CreateRecipe(Recipe recipe);

        void UpdateRecipe(Recipe recipe);

        void DeleteRecipe(Recipe recipe);
    }
}