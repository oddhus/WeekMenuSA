using System.ComponentModel.DataAnnotations;

namespace WeekMenuSA.Models
{
    public class Ingredient
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        [Range(0, 100000)]
        public double Amount { get; set; }

        [Required]
        [MaxLength(4)]
        [MinLength(1)]
        public string Suffix { get; set; }

        public int RecipeId { get; set; }

        public Recipe Recipe { get; set; }
    }
}