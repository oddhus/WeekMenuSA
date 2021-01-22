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

        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public ApplicationUser CreateUser(CreateUserDto userDto)
        {
            var foundUser = _userRepository.GetUserByUsername(userDto.Username);
            if (foundUser != null)
            {
                return null;
            }

            var user = _mapper.Map<ApplicationUser>(userDto);
            user.Role = "Creator";
            _userRepository.CreateUser(user);
            _userRepository.SaveChanges();
            return user;
        }

        public ApplicationUser AuthenticateUser(LoginDto loginDto)
        {
            var user = _userRepository.GetUserByUsername(loginDto.Username);
            if (user == null || !BC.Verify(loginDto.Password, user.HashedPassword))
            {
                return null;
            }
            else
            {
                return user;
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