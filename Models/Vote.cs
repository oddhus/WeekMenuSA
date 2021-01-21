using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WeekMenuSA.Models
{
    public class Vote
    {
        [Required]
        [Range(-1, 1)]
        public int UserVote { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int RecipeId { get; set; }

        public Recipe Recipe { get; set; }
    }
}