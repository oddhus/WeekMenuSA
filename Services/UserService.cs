using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Data;
using WeekMenuSA.Dtos;
using WeekMenuSA.Models;
using BC = BCrypt.Net.BCrypt;

namespace WeekMenuSA.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper, JwtService jwtService)
        {
            _jwtService = jwtService;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public UserDto CreateUser(CreateUserDto createUserDto)
        {
            var foundUser = _userRepository.GetUserByUsername(createUserDto.Username.ToLower());
            if (foundUser != null)
            {
                return null;
            }

            var user = _mapper.Map<ApplicationUser>(createUserDto);

            _userRepository.CreateUser(user);
            user.Role = "Creator";
            user.Username = createUserDto.Username.ToLower();

            var userDto = _jwtService.CreateToken(user);
            user.RefreshToken = userDto.RefreshToken;

            _userRepository.SaveChanges();

            return userDto;
        }

        public UserDto AuthenticateUser(LoginDto loginDto)
        {
            var user = _userRepository.GetUserByUsername(loginDto.Username);
            if (user == null || !BC.Verify(loginDto.Password, user.HashedPassword))
            {
                return null;
            }
            else
            {
                var userDto = _jwtService.CreateToken(user);
                user.RefreshToken = userDto.RefreshToken;
                _userRepository.SaveChanges();

                return userDto;
            }
        }

        public UserDto RefreshUserToken(RefreshUserDto refreshUserDto)
        {
            var name = _jwtService.ExtractName(refreshUserDto.Token);
            var user = _userRepository.GetUserByUsername(name);
            if (user == null || user.RefreshToken != refreshUserDto.RefreshToken)
            {
                return null;
            }
            else
            {
                //Update refresh token
                var userDto = _jwtService.CreateToken(user);
                user.RefreshToken = userDto.RefreshToken;
                _userRepository.SaveChanges();

                return userDto;
            }
        }

        public void DeleteUser(string userId)
        {
            if (userId != null)
            {
                _userRepository.DeleteUser(new ApplicationUser() { Id = userId });
                _userRepository.SaveChanges();
            }
        }
    }
}