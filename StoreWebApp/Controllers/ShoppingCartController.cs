using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreWebApp.Data;
using StoreWebApp.Models;
using StoreWebApp.Models.Dtos;

namespace StoreWebApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class ShoppingCartController: Controller
    {
        private readonly StoreDbContext  context ;

        public ShoppingCartController(StoreDbContext context)
        {
            this.context = context;
        }

        [HttpPost("buy", Name = "Buy")]
        [ProducesResponseType(200, Type = typeof(List<ShoppingCart>))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Buy([FromBody] List<ShoppingCart> shoppingcart)        
        {
            try
            {
                foreach (var item in shoppingcart)
                {
                    context.ShoppingCart.Add(item);                    
                }
                context.SaveChanges();
                return Ok(shoppingcart);
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null) 
                {
                    if (ex.InnerException.Message.Contains("PRIMARY KEY 'PK_ShoppingCart'")) 
                    { 
                        return BadRequest("You cannot buy twice the same product.");
                    }
                }
                return BadRequest(ex.Message);
            }
        }
    }
}
