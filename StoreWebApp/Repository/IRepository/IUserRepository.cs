using StoreWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Repository.IRepository
{
    public interface IUserRepository
    {
        ICollection<User> GetUser();
        User GetUser(int UserId);
        bool ExistUser(string User);
        User RegisterUser(User user, string password);
        //User LoginUser(User user, string password);
        bool Save();
        User LoginUser(string userName, string password);
    }
}
