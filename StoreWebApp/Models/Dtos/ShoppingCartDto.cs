using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Models.Dtos
{
    public class ShoppingCartDto
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public User? User { get; set; }
        public Product? Product { get; set; }
    }
}
