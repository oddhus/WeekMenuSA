using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Data;
using WeekMenuSA.Models;

namespace WeekMenuSA.Services
{
    public class VoteService
    {
        private readonly IVoteRepository _voteRepository;

        private readonly IRecipeRepository _recipeRepository;

        private readonly IMapper _mapper;

        public VoteService(IVoteRepository voteRepository, IRecipeRepository recipeRepository, IMapper mapper)
        {
            _recipeRepository = recipeRepository;
            _voteRepository = voteRepository;
            _mapper = mapper;
        }

        internal bool VoteRecipe(int vote, int recipeId, string userId)
        {
            if (vote < -1 || vote > 1)
            {
                return false;
            }

            var previousVote = _voteRepository.FindVote(recipeId, userId);
            if (previousVote != null)
            {
                previousVote.UserVote = vote;
            }
            else
            {
                var recipe = _recipeRepository.GetRecipeById(recipeId);
                if (recipe == null)
                {
                    return false;
                }

                var newVote = new Vote()
                {
                    RecipeId = recipeId,
                    UserId = userId,
                    UserVote = vote,
                };

                _voteRepository.VoteRecipe(newVote);
            }
            _recipeRepository.SaveChanges();
            return _voteRepository.SaveChanges();
        }
    }
}