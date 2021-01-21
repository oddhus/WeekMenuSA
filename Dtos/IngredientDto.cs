using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WeekMenuSA.Dtos
{
    public class IngredientDto
    {
        public string Name { get; set; }

        public double Amount { get; set; }

        public string Suffix { get; set; }
    }
}