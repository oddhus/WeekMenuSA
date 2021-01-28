using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Models;

namespace WeekMenuSA.Data
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly ApplicationDbContext _db;

        public RecipeRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public void CreateRecipe(Recipe recipe)
        {
            if (recipe == null)
            {
                throw new ArgumentNullException(nameof(recipe));
            }
            _db.Recipes.Add(recipe);
        }

        public void DeleteRecipe(Recipe recipe)
        {
            if (recipe == null)
            {
                throw new ArgumentNullException(nameof(recipe));
            }
            _db.Recipes.Remove(recipe);
        }

        public Recipe GetRandomRecipe(List<int> excludeId)
        {
            int total = _db.Recipes.Count() - excludeId.Count;
            Random r = new Random();
            int offset = total > 1 ? r.Next(0, total) : 0;
            return _db.Recipes
                .Where(r => !excludeId.Contains(r.Id))
                .Include(r => r.Ingredients)
                .Include(r => r.Votes)
                .Include(r => r.Tags)
                .AsSplitQuery()
                .OrderBy(r => r.Id)
                .Skip(offset)
                .FirstOrDefault();
        }

        public IEnumerable<Recipe> GetRandomRecipes(RandomRecipeParameters paramteres)
        {
            int total = 0;
            if (paramteres.Tags != null)
            {
                total = _db.Recipes.Where(r => r.Tags.Any(t => paramteres.Tags.Contains(t.Name))).Count() - paramteres.WeekLength;
            }
            else
            {
                total = _db.Recipes.Count() - paramteres.WeekLength;
            }

            Random r = new Random();
            int offset = total > 0 ? r.Next(0, total) : 0;

            return _db.Recipes
                .Where(r =>
                    (paramteres.Tags == null || paramteres.Tags.Count <= 0) ||
                    r.Tags.Any(t => paramteres.Tags.Contains(t.Name)))
                .Include(r => r.Ingredients)
                .Include(r => r.Votes)
                .Include(r => r.Tags)
                .AsSplitQuery()
                .OrderBy(r => r.Id)
                .Skip(offset)
                .Take(paramteres.WeekLength);
        }

        public Recipe GetRecipeById(int id)
        {
            return _db.Recipes
                .Where(r => r.Id == id)
                .Include(r => r.Ingredients)
                .Include(r => r.Votes)
                .Include(r => r.Tags)
                .AsSplitQuery()
                .FirstOrDefault();
        }

        public IEnumerable<Recipe> GetRecipesByUserId(string id)
        {
            return _db.Recipes
                .Where(r => r.UserId == id)
                .Include(r => r.Ingredients)
                .Include(r => r.Votes)
                .Include(r => r.Tags)
                .AsSplitQuery()
                .ToList();
        }

        public PaginatedRecipeList GetAllRecipes(RecipeParameters recipeParameters)
        {
            return PaginatedRecipeList.ToPagedList(
                _db.Recipes
                .Where(r =>
                    (recipeParameters.Tags == null || recipeParameters.Tags.Count <= 0) ||
                    r.Tags.Any(t => recipeParameters.Tags.Contains(t.Name)))
                .Where(r =>
                    string.IsNullOrWhiteSpace(recipeParameters.SearchText) ||
                    r.Title.ToUpper().Contains(recipeParameters.SearchText))
                .Include(r => r.Ingredients)
                .Include(r => r.Votes)
                .Include(r => r.Tags)
                .AsSplitQuery()
                .OrderBy(r => r.Title),
                recipeParameters.PageNumber,
                recipeParameters.PageSize);
        }

        public bool SaveChanges()
        {
            return _db.SaveChanges() >= 0;
        }

        public void UpdateRecipe(Recipe recipe)
        {
        }
    }
}