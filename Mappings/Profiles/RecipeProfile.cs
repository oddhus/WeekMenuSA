using AutoMapper;
using System;
using System.Threading.Tasks;
using WeekMenuSA.Dtos;
using WeekMenuSA.Models;

namespace WeekMenuSA.Mappings.Profiles
{
    public class RecipeProfile : Profile
    {
        public RecipeProfile()
        {
            CreateMap<PaginatedRecipeList, PaginatedReadRecipeDto>();
            CreateMap<Recipe, ReadRecipeDto>()
                .ForMember(r => r.Vote, opt =>
                {
                    opt.MapFrom(d => d.Votes.CalculateVote());
                })
                .ForMember(r => r.UserVote, opt =>
                {
                    opt.MapFrom((src, dest, destVal, ctx) => src.Votes.CalculateUserVote(ctx.Items["UserId"].ToString()));
                });
            CreateMap<Ingredient, IngredientDto>();
            CreateMap<Tag, TagDto>();
        }
    }
}