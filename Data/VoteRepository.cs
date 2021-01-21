using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Models;

namespace WeekMenuSA.Data
{
    public class VoteRepository : IVoteRepository
    {
        private readonly ApplicationDbContext _db;

        public VoteRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public Vote FindVote(int recipeId, string userId)
        {
            return _db.Votes.Where(v => v.UserId == userId && v.RecipeId == recipeId).FirstOrDefault();
        }

        public void VoteRecipe(Vote vote)
        {
            if (vote == null)
            {
                throw new ArgumentNullException(nameof(vote));
            }
            _db.Votes.Add(vote);
        }

        public bool SaveChanges()
        {
            return _db.SaveChanges() >= 0;
        }
    }
}