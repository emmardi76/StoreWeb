using System.ComponentModel.DataAnnotations;

namespace StoreWebApp.Models.Dtos
{
    public class UserAuthDto
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "The user name is obligatory")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "The user password is obligatory")]
        [StringLength(10, MinimumLength = 4, ErrorMessage = "Password length must be between 4 and 10 characters ")]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
