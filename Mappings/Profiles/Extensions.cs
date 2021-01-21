using System.Collections.Generic;
using System.Linq;
using WeekMenuSA.Models;

public static class Extensions
{
    public static int CalculateVote(this ICollection<Vote> votes)
    {
        return votes.Sum(r => r.UserVote);
    }

    public static int CalculateUserVote(this ICollection<Vote> votes, string userId)
    {
        var vote = votes.FirstOrDefault(v => v.UserId == userId);
        if (vote == null)
        {
            return 0;
        }
        else
        {
            return vote.UserVote;
        }
    }
}