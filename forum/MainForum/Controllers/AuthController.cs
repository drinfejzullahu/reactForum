using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MainForum.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace MainForum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly ForumContext _context;
        public AuthController(ForumContext context)
        {
            _context = context;
        }

        [HttpPost("token")]
        public async Task<ActionResult> GetTokenAsync(User usr)
        //public async Task<ActionResult> GetTokenAsync([FromQuery]string Username, [FromQuery]string Password) 
        {
            var email = await _context.Users.FirstOrDefaultAsync(s => s.Email == usr.Email);
            var pass = await _context.Users.FirstOrDefaultAsync(s => s.Password == usr.Password);

            //if (email == null && pass == null)
            //{
            //    return NotFound();

            //}


            if (!_context.Users.Any(u => u.Email == usr.Email) || !_context.Users.Any(u => u.Password == usr.Password))
            {
                return NotFound();
            }
            else
            {

                string SecurityKey = "This_is_our_supper_long_security_key";

                var SymmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecurityKey));

                var SignIngCredentials = new SigningCredentials(SymmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

                var claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.Role, "Administrator"));
                claims.Add(new Claim(ClaimTypes.Role, "User"));

                var token = new JwtSecurityToken(
                        issuer: "smsk.in",
                        audience: "readers",
                        expires: DateTime.Now.AddDays(10),
                        signingCredentials: SignIngCredentials,
                        claims: claims
                    );

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));

            }
            
        }
    }
}