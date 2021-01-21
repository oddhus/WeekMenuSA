using WeekMenuSA.Models;
using Microsoft.EntityFrameworkCore;

namespace WeekMenuSA.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ApplicationUser> Users { get; set; }

        public DbSet<Recipe> Recipes { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Vote> Votes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Vote>().HasKey(v => new { v.UserId, v.RecipeId });
            builder.Entity<Vote>().HasOne(v => v.User).WithMany(u => u.Votes);
            builder.Entity<Vote>().HasOne(v => v.Recipe).WithMany(r => r.Votes);
        }
    }
}