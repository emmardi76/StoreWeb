using AutoMapper;
using StoreWebApp.Models;
using StoreWebApp.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.StoreMapper
{
    public class StoreMapper: Profile
    {
        public StoreMapper()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Product, ProductCreateDto>().ReverseMap();
            CreateMap<Product, ProductUpdateDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserAuthDto>().ReverseMap();
            CreateMap<Favorite, FavoriteDto>().ReverseMap();
            CreateMap<ShoppingCart, ShoppingCartDto>().ReverseMap();
        }        
    }
}
