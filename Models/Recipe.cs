using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WeekMenuSA.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        [Required]
        [MaxLength(120)]
        public string ShortDescription { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        public string UserId { get; set; }
        public string UserName { get; set; }

        [MaxLength(200)]
        public string ImgUrl { get; set; }

        public ICollection<Ingredient> Ingredients { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public ICollection<Vote> Votes { get; set; }
    }
}