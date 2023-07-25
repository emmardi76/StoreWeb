using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static StoreWebApp.Models.Product;

namespace StoreWebApp.Models.Dtos
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        [Required(ErrorMessage = "The product name is obligatory")]
        public string ProductName { get; set; }
        public string RouteImage { get; set; }
        public string Description { get; set; }       
        public SizeType Size { get; set; }
        public decimal Price { get; set; }
        public DateTime CreationDate { get; set; }
        public int Stars { get; set; }


        public int categoryId { get; set; }
        public Category Category { get; set; }
    }
}
