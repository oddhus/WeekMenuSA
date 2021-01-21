using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Models;
using WeekMenuSA.Data;
using WeekMenuSA.Dtos;

namespace WeekMenuSA.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public void CreateUser(ApplicationUser user)
        {
            _db.Users.Add(user);
        }

        public ApplicationUser GetUserByUsername(string username)
        {
            return _db.Users.Where(u => u.Username == username).FirstOrDefault();
        }

        public bool SaveChanges()
        {
            return _db.SaveChanges() >= 0;
        }
    }
}