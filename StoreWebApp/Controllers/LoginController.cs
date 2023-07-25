using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StoreWebApp.Data;
using StoreWebApp.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StoreWebApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class LoginController: Controller
    {
        private readonly StoreDbContext context;
        private readonly string keyValue;
        private readonly string issuer;
        private readonly int expirationTime;

        public LoginController(StoreDbContext context, IConfiguration config)
        {
            keyValue = config.GetSection("JWT_KEY").GetSection("key").Value.ToString();
            issuer = config.GetSection("JWT_KEY").GetSection("issuer").Value.ToString();
            expirationTime = Int32.Parse(config.GetSection("JWT_KEY").GetSection("ExpirationTime").Value);
            this.context = context;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login([FromBody] User user)
        {
            User validUser = context.User.Where(u => u.Email == user.Email && u.PasswordHash == user.PasswordHash).FirstOrDefault();
            if (validUser != null)
            {
                validUser.Token = GetJWT(validUser.Email);
            }

            return Ok(validUser);
        }

        private string GetJWT(string email)
        {
            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
            var secureId = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new  Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub, email),
                new  Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var tokenBody = new JwtSecurityToken(
                issuer: issuer,
                audience: issuer,
                claims,
                expires: DateTime.Now.AddMinutes(expirationTime),
                signingCredentials: secureId);

            var token = new JwtSecurityTokenHandler().WriteToken(tokenBody);

            return token;
        }
    }
}
