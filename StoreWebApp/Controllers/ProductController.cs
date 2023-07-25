using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreWebApp.Data;
using StoreWebApp.Models;
using StoreWebApp.Models.Dtos;
using StoreWebApp.Repository;
using StoreWebApp.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApp.Controllers
{
    [Authorize]
    [Route("api/Products")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class ProductsController : Controller
    {
        private readonly IProductRepository _productRepository;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IMapper _mapper;        

        public ProductsController(IProductRepository productRepository, IWebHostEnvironment hostingEnvironment, IMapper mapper)
        {
            _productRepository = productRepository;
            _hostingEnvironment = hostingEnvironment;
            _mapper = mapper;           
        }

        /// <summary>
        /// Get all Products
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet(Name = "GetProducts")]
        [ProducesResponseType(200, Type = typeof(List<ProductDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetProducts()
        {
            var ListProducts = _productRepository.GetProduct();

            var ListProductsDto = new List<ProductDto>();

            foreach (var List in ListProducts)
            {
                ListProductsDto.Add(_mapper.Map<ProductDto>(List));
            }
            return Ok(ListProductsDto);
        }

        [AllowAnonymous]
        [HttpGet("{ProductId:int}", Name = "GetProduct")]
        [ProducesResponseType(200, Type = typeof(ProductDto))]
        [ProducesResponseType(404)]
        [ProducesDefaultResponseType]
        public IActionResult GetProduct(int ProductId)
        {
            var itemProduct = _productRepository.GetProduct(ProductId);

            if (itemProduct == null)
            {
                return NotFound();
            }

            var itemProductDto = _mapper.Map<ProductDto>(itemProduct);

            return Ok(itemProduct);
        }

        [AllowAnonymous]
        [HttpGet("Featured", Name = "GetFeatured")]
        [ProducesResponseType(200, Type = typeof(List<ProductDto>))]
        [ProducesResponseType(404)]       
        public IActionResult GetFeatured()
        {
            var ListProducts = _productRepository.GetFeatured();

            var ListProductsDto = new List<ProductDto>();

            foreach (var List in ListProducts)
            {
                ListProductsDto.Add(_mapper.Map<ProductDto>(List));
            }
            return Ok(ListProductsDto);
        }

        /// <summary>
        /// Get product in category
        /// </summary>
        /// <param name="categoryId">This is the categoryId</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("GetProductInCategory/{categoryId:int}")]
        [ProducesResponseType(200, Type = typeof(ProductDto))]
        [ProducesResponseType(404)]
        [ProducesDefaultResponseType]
        public IActionResult GetProductInCategory(int categoryId)
        {
            var ProductList = _productRepository.GetProductInCategory(categoryId);

            if (ProductList == null)
            {
                return NotFound();
            }

            var itemProduct = new List<ProductDto>();

            foreach (var item in ProductList)
            {
                itemProduct.Add(_mapper.Map<ProductDto>(item));
            }

            return Ok(itemProduct);
        }

        /// <summary>
        /// Search a product
        /// </summary>
        /// <param name="Name">This is the Name of the product</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("SearchProduct/{name}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult SearchProduct(string? name)
        {
            try
            {
                var result = _productRepository.SearchProduct(name);
                if (result.Any())
                {
                    return Ok(result);
                }

                return NotFound();
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving application data");
            }
        }

        /// <summary>
        /// Create new product
        /// </summary>
        /// <param name="ProductDto"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ProductDto))]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult CreateProduct([FromForm] ProductCreateDto ProductDto)
        {
            if (ProductDto == null)
            {
                return BadRequest(ModelState);
            }

            if (_productRepository.ExistProduct(ProductDto.ProductName))
            {
                ModelState.AddModelError("", "The product exist yet");
                return StatusCode(404, ModelState);
            }

            /* Push files */
            var file = ProductDto.Photo;
            string mainRoute = _hostingEnvironment.WebRootPath;
            var files = HttpContext.Request.Form.Files;

            if (file.Length > 0)
            {
                //New image
                var PhotoName = Guid.NewGuid().ToString();
                var pushes = Path.Combine(mainRoute, @"photos");
                var extension = Path.GetExtension(files[0].FileName);

                using (var fileStreams = new FileStream(Path.Combine(pushes, PhotoName + extension), FileMode.Create))
                {
                    files[0].CopyTo(fileStreams);
                }
                ProductDto.RouteImage = @"\photos\" + PhotoName + extension;

            }
            /*****************************************************/

            var product = _mapper.Map<Product>(ProductDto);

            if (!_productRepository.CreateProduct(product))
            {
                ModelState.AddModelError("", $"Anything is brong saving the record{product.ProductName}");
                return StatusCode(500, ModelState);
            }

            return CreatedAtRoute("GetProduct", new { ProductId = product.ProductId }, product);
        }

        /// <summary>
        /// Update an existing product 
        /// </summary>
        /// <param name="ProductId"></param>
        /// <param name="ProductDto"></param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult UpdateProduct(int ProductId, [FromBody] ProductDto productDto)
        {
            if (productDto == null || ProductId != productDto.ProductId)
            {
                return BadRequest(ModelState);
            }

            var product = _mapper.Map<Product>(productDto);

            if (!_productRepository.UpdateProduct(product))
            {
                ModelState.AddModelError("", $"Anything is brong updating the record{product.ProductName}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        /// <summary>
        /// Delete an existing product
        /// </summary>
        /// <param name="ProductId"></param>
        /// <returns></returns>
        [HttpDelete("{ProductId:int}", Name = "DeleteProduct")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteProduct(int ProductId)
        {
            if (!_productRepository.ExistProduct(ProductId))
            {
                return NotFound();
            }

            var product = _productRepository.GetProduct(ProductId);
            
            if (!_productRepository.DeleteProduct(product))
            {
                ModelState.AddModelError("", $"Anything is brong deleting the record{product.ProductName}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}