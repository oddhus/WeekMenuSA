using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WeekMenuSA.Dtos
{
    public class CreateUserDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(16)]
        public string Username { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(256)]
        public string Password { get; set; }
    }
}