using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WeekMenuSA.Data;
using WeekMenuSA.Dtos;
using WeekMenuSA.Models;

namespace WeekMenuSA.Services
{
    public class JwtService
    {
        private readonly string _refreshSecret;
        private readonly string _secret;
        private readonly string _expDate;

        public JwtService(IConfiguration config, IUserRepository userRepository)
        {
            _refreshSecret = config.GetSection("JwtConfig").GetSection("secret").Value;
            _secret = config.GetSection("JwtConfig").GetSection("secret").Value;
            _expDate = config.GetSection("JwtConfig").GetSection("expirationInSeconds").Value;

        }

        public UserDto CreateToken(ApplicationUser user)
        {
            var key = Encoding.ASCII.GetBytes(_secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddSeconds(double.Parse(_expDate)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(descriptor);
            var refreshToken = GenerateRefreshToken();

            var userDto = new UserDto()
            {
                Id = user.Id,
                Username = user.Username,
                Token = tokenHandler.WriteToken(token),
                RefreshToken = refreshToken
            };

            return userDto;
        }

        public string ExtractName(string token)
        {
            var key = Encoding.ASCII.GetBytes(_secret);

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken validatedToken;
            var pricipal = tokenHandler.ValidateToken(token,
                new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
                }, out validatedToken);

            var jwtToken = validatedToken as JwtSecurityToken;
            if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token passed!");
            }

            return pricipal.Identity.Name;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var randomNumberGenerator = RandomNumberGenerator.Create())
            {
                randomNumberGenerator.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}