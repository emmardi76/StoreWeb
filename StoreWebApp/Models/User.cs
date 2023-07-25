using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        //[Required]
        public string UserName { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }
        [Required]
        public string Email { get; set; }
        public string Token { get; internal set; }
        public List<ShoppingCart> ShoppingCart { get; set; }
        public List<Favorite> Favorite { get; set; }
        
    }
}
