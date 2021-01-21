using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Models;

namespace WeekMenuSA.Dtos
{
    public class ReadRecipeDto
    {
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

        public string UserName { get; set; }
        public string ImgUrl { get; set; }
        public ICollection<IngredientDto> Ingredients { get; set; }
        public ICollection<TagDto> Tags { get; set; }
        public int Vote { get; set; }
        public int UserVote { get; set; }
    }
}