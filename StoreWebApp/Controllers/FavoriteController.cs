using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreWebApp.Data;
using StoreWebApp.Models;
using StoreWebApp.Models.Dtos;
using StoreWebApp.Repository.IRepository;

namespace StoreWebApp.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavoriteController : Controller
    {
        private readonly StoreDbContext context;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public FavoriteController(StoreDbContext context, IMapper mapper, IProductRepository productRepository)
        {
            this.context = context;
            _mapper = mapper;
            _productRepository= productRepository;
        }

        [Route("Get/{userId}")]
        [HttpGet]
        public ActionResult Get(int userId)
        {
            try
            {
                return Ok(context.Favorite.Where(f => f.UserId == userId).Select(p => p.Product).ToList());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpPost]
        public ActionResult Add([FromBody] FavoriteDto favoriteDto)
        {
            try
            {
                var favorite = _mapper.Map<Favorite>(favoriteDto);
                context.Favorite.Add(favorite);
                context.SaveChanges();
                return Ok(favorite);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpPost]
        public ActionResult Delete([FromBody] FavoriteDto favoriteDto)
        {
            try
            {
                var favorite = _mapper.Map<Favorite>(favoriteDto);
                context.Favorite.Remove(favorite);
                context.SaveChanges();
                return Ok(favorite);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }    
}
