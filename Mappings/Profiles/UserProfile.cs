using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Dtos;
using WeekMenuSA.Models;
using BC = BCrypt.Net.BCrypt;

namespace WeekMenuSA.Mappings.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<CreateUserDto, ApplicationUser>()
                .ForMember(u => u.HashedPassword, opt =>
                {
                    opt.MapFrom(dto => BC.HashPassword(dto.Password));
                });
        }
    }
}