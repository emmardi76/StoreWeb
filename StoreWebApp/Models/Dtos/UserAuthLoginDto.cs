using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Models.Dtos
{
    public class UserAuthLoginDto
    {        
        [Required(ErrorMessage = "The user email is obligatory")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "The user password is obligatory")]
        public string Password { get; set; }
    }
}
