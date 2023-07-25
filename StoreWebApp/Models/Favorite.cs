using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace StoreWebApp.Models
{
    [PrimaryKey(nameof(UserId), nameof(ProductId))]
    public class Favorite
    {        
        public int UserId { get; set; }        
        public int ProductId { get; set; }
        public User? User { get; set; }
        public Product? Product { get; set; }
    }
}
