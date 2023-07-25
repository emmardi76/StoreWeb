using StoreWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Repository.IRepository
{
    public interface ICategoryRepository
    {
        Task<ICollection<Category>> GetCategoryAsync();
        Category GetCategory(int CategoryId);
        bool ExistCategory(string CategoryName);
        bool ExistCategory(int CategoryId);
        bool CreateCategory(Category Category);
        bool UpdateCategory(Category Category);
        bool DeleteCategory(Category Category);
        bool Save();
    }
}
