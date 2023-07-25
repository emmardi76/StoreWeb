using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Models.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "The category name is obligatory")]
        public string CategoryName { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
