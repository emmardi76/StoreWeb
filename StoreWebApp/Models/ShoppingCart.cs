using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace StoreWebApp.Models
{
    [PrimaryKey(nameof(UserId), nameof(ProductId))]
    public class ShoppingCart
    {                   
        public int  UserId { get; set; }      
        public int ProductId { get; set; }
        public User? User { get; set; }
        public Product? Product { get; set; }          
    }
}
