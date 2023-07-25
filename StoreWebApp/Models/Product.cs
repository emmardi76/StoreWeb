using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        public string ProductName { get; set; }
        public string RouteImage { get; set; }
        public string Description { get; set; }
        public enum SizeType { S, M, L }
        public SizeType Size { get; set; }        
        public decimal Price { get; set; }
        public DateTime CreationDate { get; set; }
        public int Stars { get; set; }

        //create a relationship with the category table
        public int categoryId { get; set; }
        [ForeignKey("categoryId")]
        public Category Category { get; set; }

        public List<ShoppingCart> ShoppingCart { get; set; }
        public List<Favorite> Favorite { get; set; }
    }
}
