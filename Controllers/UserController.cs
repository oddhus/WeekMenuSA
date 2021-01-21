using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Dtos;
using WeekMenuSA.Services;

namespace WeekMenuSA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly UserService _userService;

        public UserController(JwtService jwtService, UserService userService)
        {
            _jwtService = jwtService;
            _userService = userService;
        }

        [HttpPost("login")]
        public ActionResult<UserDto> Login([FromBody] LoginDto loginDto)
        {
            var user = _userService.AuthenticateUser(loginDto);
            if (user == null)
            {
                return Forbid();
            };

            return Ok(_jwtService.CreateToken(user));
        }

        [HttpPost("register")]
        public ActionResult<UserDto> Register([FromBody] CreateUserDto createUserDto)
        {
            var user = _userService.CreateUser(createUserDto);
            if (user == null)
            {
                return BadRequest();
            };

            return Ok(_jwtService.CreateToken(user));
        }
    }
}