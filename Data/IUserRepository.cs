using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Models;
using WeekMenuSA.Dtos;

namespace WeekMenuSA.Data
{
    public interface IUserRepository
    {
        bool SaveChanges();

        void CreateUser(ApplicationUser user);

        void DeleteUser(ApplicationUser user);

        ApplicationUser GetUserByUsername(string username);
    }
}