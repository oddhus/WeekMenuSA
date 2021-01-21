using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Security.Claims;
using WeekMenuSA.Dtos;
using WeekMenuSA.Models;
using WeekMenuSA.Services;

namespace WeekMenuSA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly ILogger<RecipeController> _logger;

        private readonly RecipeService _recipeService;

        public RecipeController(ILogger<RecipeController> logger, RecipeService recipeService)
        {
            _logger = logger;
            _recipeService = recipeService;
        }

        [HttpGet]
        public ActionResult<PaginatedReadRecipeDto> GetAllRecipes([FromQuery] RecipeParameters recipeParameters)
        {
            var recipes = _recipeService.GetAllRecipes(recipeParameters, GetUserId());

            _logger.LogInformation($"Returned {recipes.TotalCount} recipes from database.");

            return Ok(recipes);
        }

        [HttpGet("{id}", Name = "GetRecipeById")]
        public ReadRecipeDto GetRecipeById(int id)
        {
            return _recipeService.GetRecipe(id, GetUserId());
        }

        [HttpGet("weekmenu")]
        public List<ReadRecipeDto> GetRandomRecipes([FromQuery] int amount)
        {
            return _recipeService.GetRandomRecipes(amount, GetUserId());
        }

        [HttpGet("weekmenu/item")]
        public ReadRecipeDto GetRandomRecipe([FromQuery] List<int> excludeId)
        {
            return _recipeService.GetRandomRecipe(excludeId, GetUserId());
        }

        [Authorize]
        [HttpGet("user")]
        public List<ReadRecipeDto> GetAllUsersRecipes()
        {
            return _recipeService.GetRecipesByUserId(GetUserId());
        }

        [Authorize]
        [HttpPost]
        public ActionResult<ReadRecipeDto> CreateRecipe([FromBody] CreateRecipeDto recipe)
        {
            var createdRecipe = _recipeService.CreateRecipe(recipe, GetUserId(), GetUserName());
            return Ok(createdRecipe);
        }

        [Authorize]
        [HttpPut("{id}")]
        public ActionResult<ReadRecipeDto> UpdateRecipe([FromBody] CreateRecipeDto recipe, int id)
        {
            var updatedRecipe = _recipeService.UpdateRecipe(recipe, id, GetUserId());
            if (updatedRecipe == null)
            {
                return Forbid();
            }
            return Ok(updatedRecipe);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult DeleteRecipe(int id)
        {
            var recipe = _recipeService.GetRecipeIfOwner(id, GetUserId());
            if (recipe == null)
            {
                return BadRequest();
            };
            _recipeService.DeleteRecipe(recipe);
            return NoContent();
        }

        private string GetUserId()
        {
            return HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
        }

        private string GetUserName()
        {
            return HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}