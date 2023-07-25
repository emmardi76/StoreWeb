﻿using StoreWebApp.Data;
using StoreWebApp.Models;
using StoreWebApp.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly StoreDbContext _database;
       
        public UserRepository(StoreDbContext database)
        {
            _database = database;
        }

        public bool ExistUser(string User)
        {
            if (_database.User.Any(u => u.UserName == User))
            {
                return true;
            }

            return false;
        }

        public ICollection<User> GetUser()
        {
            return _database.User.OrderBy(u => u.UserName).ToList();
        }

        public User GetUser(int UserId)
        {
            return _database.User.FirstOrDefault(u => u.UserId == UserId);
        }

        public User LoginUser(string Email, string password)
        {
            var user = _database.User.FirstOrDefault(u => u.Email.Equals(Email));

            if (user == null)
            {
                return null;
            }

            if (!CheckPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return user;

        }

        public User RegisterUser(User User, string password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            User.PasswordHash = passwordHash;
            User.PasswordSalt = passwordSalt;

            _database.User.Add(User);
            Save();
            return User;
        }

        public bool Save()
        {
            return _database.SaveChanges() >= 0 ? true : false;
        }

        //this method no pertany to repository , is an auxiliar method we need
        private bool CheckPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var hashComputer = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < hashComputer.Length; i++)
                {
                    if (hashComputer[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
