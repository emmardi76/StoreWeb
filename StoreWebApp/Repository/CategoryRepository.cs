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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly StoreDbContext _database;

        public CategoryRepository(StoreDbContext database)
        {
            _database = database;
        }

        public bool CreateCategory(Category Category)
        {
            _database.Category.Add(Category);
            return Save();
        }

        public bool DeleteCategory(Category Category)
        {
            _database.Category.Remove(Category);
            return Save();
        }

        public bool ExistCategory(string CategoryName)
        {
            bool value = _database.Category.Any(c => c.CategoryName.ToLower().Trim() == CategoryName.ToLower().Trim());
            return value;
        }

        public bool ExistCategory(int CategoryId)
        {
            _database.Category.Any( c => c.CategoryId == CategoryId);
            return Save();
        }

        public Category GetCategory(int CategoryId)
        {
           return  _database.Category.FirstOrDefault(c => c.CategoryId == CategoryId);
        }

        public async Task<ICollection<Category>> GetCategoryAsync()
        {
            return await _database.Category.OrderBy(c => c.CategoryName).ToListAsync();
        }

        public bool Save()
        {
            return _database.SaveChanges() >= 0 ? true : false;
        }

        public bool UpdateCategory(Category Category)
        {
            _database.Category.Update(Category);
            return Save();
        }
    }
}
