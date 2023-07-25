using Microsoft.EntityFrameworkCore;
using StoreWebApp.Data;
using StoreWebApp.Models;
using StoreWebApp.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreDbContext _database;

        public ProductRepository(StoreDbContext database)
        {
            _database = database;
        }

        public bool CreateProduct(Product Product)
        {
            _database.Product.Add(Product);
            return Save();
        }

        public bool DeleteProduct(Product Product)
        {
            _database.Product.Remove(Product);
            return Save();
        }

        public bool ExistProduct(string ProductName)
        {
            bool value = _database.Product.Any(p => p.ProductName.ToLower().Trim() == ProductName.ToLower().Trim());

            return value;
        }

        public bool ExistProduct(int ProductId)
        {
            return _database.Product.Any(p => p.ProductId == ProductId);
        }

        public ICollection<Product> GetProduct()
        {
            return _database.Product.OrderBy(p => p.ProductName).ToList();
        }

        public Product GetProduct(int ProductId)
        {
            return _database.Product.FirstOrDefault(p => p.ProductId == ProductId);
        }

        public ICollection<Product> GetFeatured()
        {
            return _database.Product.Where(p => p.Stars > 0).ToList();
        }

        public ICollection<Product> GetProductInCategory(int CategoryId)
        {
            return _database.Product.Include(ca => ca.Category).Where(ca => ca.categoryId == CategoryId).ToList();
        }

        public bool Save()
        {
            return _database.SaveChanges() >= 0 ?
                true : false;
        }

        public IEnumerable<Product> SearchProduct(string? ProductName)
        {
            IQueryable<Product> query = _database.Product;

            if (!string.IsNullOrEmpty(ProductName))
            {
                query = query.Where(p => p.ProductName.Contains(ProductName) || p.Description.Contains(ProductName));
            }

            return query.ToList();            
        }

        public bool UpdateProduct(Product Product)
        {
            _database.Product.Update(Product);
            return Save();
        }
    }
}
