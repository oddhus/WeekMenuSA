using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WeekMenuSA.Dtos;
using WeekMenuSA.Services;

namespace WeekMenuSA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(JwtService jwtService, UserService userService)
        {
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

            return Ok(user);
        }

        [HttpPost("register")]
        public ActionResult<UserDto> Register([FromBody] CreateUserDto createUserDto)
        {
            var user = _userService.CreateUser(createUserDto);
            if (user == null)
            {
                return BadRequest();
            };

            return Ok(user);
        }

        [HttpPost("refresh")]
        public ActionResult<UserDto> RefreshToken([FromBody] RefreshUserDto refreshUserDto)
        {
            var user = _userService.RefreshUserToken(refreshUserDto);
            if (user == null)
            {
                return Unauthorized();
            };

            return Ok(user);
        }



        [Authorize]
        [HttpDelete]
        public ActionResult DeleteAccount()
        {
            _userService.DeleteUser(GetUserId());
            return Ok();
        }

        private string GetUserId()
        {
            return HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}