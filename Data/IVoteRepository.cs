using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Models;

namespace WeekMenuSA.Data
{
    public interface IVoteRepository
    {
        bool SaveChanges();

        void VoteRecipe(Vote vote);

        Vote FindVote(int recipeId, string userId);
    }
}