using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WeekMenuSA.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(32)]
        public string Name { get; set; }

        public ICollection<Recipe> Recipes { get; set; }
    }
}