using StoreWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Repository.IRepository
{
    public interface IProductRepository
    {
        ICollection<Product> GetProduct();
        ICollection<Product> GetProductInCategory(int CategoryId);
        Product GetProduct(int ProductId);
        ICollection<Product> GetFeatured();
        bool ExistProduct(string ProductName);
        IEnumerable<Product> SearchProduct( string? ProductName);
        bool ExistProduct(int ProductId);
        bool CreateProduct(Product Product);
        bool UpdateProduct(Product Product);
        bool DeleteProduct(Product Product);
        bool Save();
    }
}
