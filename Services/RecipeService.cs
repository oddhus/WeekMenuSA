using AutoMapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Data;
using WeekMenuSA.Dtos;
using WeekMenuSA.Models;

namespace WeekMenuSA.Services
{
    public class RecipeService
    {
        private readonly IRecipeRepository _recipeRepository;

        private readonly ITagRepository _tagRepository;

        private readonly IMapper _mapper;

        public RecipeService(IRecipeRepository recipeRepository, ITagRepository tagRepository, IMapper mapper)
        {
            _recipeRepository = recipeRepository;
            _tagRepository = tagRepository;
            _mapper = mapper;
        }

        internal ReadRecipeDto CreateRecipe(CreateRecipeDto inRecipe, string userId, string userName)
        {
            var recipe = new Recipe
            {
                Title = inRecipe.Title,
                ShortDescription = inRecipe.ShortDescription,
                Description = inRecipe.Description,
                UserId = userId,
                UserName = userName,
                ImgUrl = inRecipe.ImgUrl,
                Ingredients = inRecipe.Ingredients,
                Tags = new List<Tag>(),
                Votes = new List<Vote>()
            };

            foreach (var tag in inRecipe.Tags)
            {
                var foundTag = _tagRepository.GetTagByName(tag);
                recipe.Tags.Add(foundTag);
            }

            _recipeRepository.CreateRecipe(recipe);
            _recipeRepository.SaveChanges();

            return _mapper.Map<ReadRecipeDto>(recipe, opt => opt.Items["UserId"] = userId);
        }

        internal ReadRecipeDto UpdateRecipe(CreateRecipeDto inRecipe, int recipeId, string userId)
        {
            var recipe = _recipeRepository.GetRecipeById(recipeId);

            if (recipe.UserId != userId)
            {
                return null;
            }

            recipe.Title = inRecipe.Title;
            recipe.ShortDescription = inRecipe.ShortDescription;
            recipe.Description = inRecipe.Description;
            recipe.ImgUrl = inRecipe.ImgUrl;
            recipe.Ingredients = inRecipe.Ingredients;
            recipe.Tags = new List<Tag>();

            foreach (var tag in inRecipe.Tags)
            {
                var foundTag = _tagRepository.GetTagByName(tag);
                recipe.Tags.Add(foundTag);
            }

            _recipeRepository.UpdateRecipe(recipe);
            _recipeRepository.SaveChanges();

            return _mapper.Map<ReadRecipeDto>(recipe, opt => opt.Items["UserId"] = userId);
        }

        internal ReadRecipeDto GetRandomRecipe(List<int> excludeId, string userId)
        {
            return _mapper.Map<ReadRecipeDto>(_recipeRepository.GetRandomRecipe(excludeId), opt => opt.Items["UserId"] = userId);
        }

        internal List<ReadRecipeDto> GetRandomRecipes(RandomRecipeParameters parameters, string id)
        {
            return _mapper.Map<List<ReadRecipeDto>>(_recipeRepository.GetRandomRecipes(parameters), opt => opt.Items["UserId"] = id);
        }

        internal ReadRecipeDto GetRecipe(int id, string userId)
        {
            return _mapper.Map<ReadRecipeDto>(_recipeRepository.GetRecipeById(id), opt => opt.Items["UserId"] = userId);
        }

        internal List<ReadRecipeDto> GetRecipesByUserId(string id)
        {
            return _mapper.Map<List<ReadRecipeDto>>(_recipeRepository.GetRecipesByUserId(id), opt => opt.Items["UserId"] = id);
        }

        internal PaginatedReadRecipeDto GetAllRecipes(RecipeParameters recipeParameters, string id)
        {
            return _mapper.Map<PaginatedReadRecipeDto>(_recipeRepository.GetAllRecipes(recipeParameters), opt => opt.Items["UserId"] = id);
        }

        internal bool DeleteRecipe(Recipe recipe)
        {
            if (recipe == null)
            {
                return false;
            }
            _recipeRepository.DeleteRecipe(recipe);
            _recipeRepository.SaveChanges();
            return true;
        }

        internal Recipe GetRecipeIfOwner(int recipeId, string userId)
        {
            var recipe = _recipeRepository.GetRecipeById(recipeId);
            if (recipe == null || recipe.UserId != userId)
            {
                return null;
            }
            else
            {
                return recipe;
            }
        }
    }
}