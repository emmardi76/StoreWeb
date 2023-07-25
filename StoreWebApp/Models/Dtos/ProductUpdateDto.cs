using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static StoreWebApp.Models.Product;

namespace StoreWebApp.Models.Dtos
{
    public class ProductUpdateDto
    {
        public int ProductId { get; set; }
        [Required(ErrorMessage = "The name product is obligatory")]
        public string ProductName { get; set; }
        public string RouteImage { get; set; }
        [Required(ErrorMessage = "The description product is obligatory")]
        public string Description { get; set; }      
        [Required(ErrorMessage = "The size product is obligatory")]
        public SizeType Size { get; set; }
        [Required(ErrorMessage = "The price product is obligatory")]
        public decimal Price { get; set; }

        public int categoryId { get; set; }
        public int Stars { get; set; }
    }
}