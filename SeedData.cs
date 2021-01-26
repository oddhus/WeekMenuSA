using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Data;
using WeekMenuSA.Models;
using BC = BCrypt.Net.BCrypt;

namespace WeekMenuSA
{
    public class SeedData
    {
        public static void Initialize(ApplicationDbContext db)
        {
            var tags = new Tag[]
            {
            new Tag()
            {
                Name = "Italian"
            },
            new Tag()
            {
                Name = "Modern"
            },
            new Tag()
            {
                Name = "Spicy"
            },
            new Tag()
            {
                Name = "Sweet"
            },
            new Tag()
            {
                Name = "Sour"
            },
            new Tag()
            {
                Name = "Exotic"
            },
            new Tag()
            {
                Name = "Traditional"
            },
            new Tag()
            {
                Name = "Asian"
            },
            new Tag()
            {
                Name = "Mexican"
            },
            new Tag()
            {
                Name = "Healthy"
            }
            };

            var user = new ApplicationUser[]
            {
                new ApplicationUser{
                Username = "test@test.com",
                HashedPassword = BC.HashPassword("12341234"),
                Role = "Creator"
                },
                new ApplicationUser{
                Username = "test1@test.com",
                HashedPassword = BC.HashPassword("12341234"),
                Role = "Creator"
                },
            };


            var recipes = new Recipe[]
            {
                new Recipe()
                {
                    Title = "Pizza Margarita",
                    ShortDescription = "Simple and tastefull",
                    Description = "First add flour and water. Then let the dough rise... ",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Tomato",
                            Amount = 2,
                            Suffix = "pcs"
                        },
                        new Ingredient()
                        {
                            Name = "Flour",
                            Amount = 2,
                            Suffix = "dL"
                        }
                    },
                    UserId = user[0].Id,
                    UserName = "test@test.com",
                    ImgUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
                    Tags = new List<Tag> {tags[0], tags[1]}
                },
                new Recipe()
                {
                    Title = "Pizza Pepperoni",
                    ShortDescription = "Pepperoni with olives",
                    Description = "First add flour and water. Then let the dough rise... ",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Cheese",
                            Amount = 200,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Flour",
                            Amount = 2,
                            Suffix = "dL"
                        },
                        new Ingredient()
                        {
                            Name = "Olives",
                            Amount = 100,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Pepperoni",
                            Amount = 50,
                            Suffix = "g"
                        }
                    },
                    UserId = user[1].Id,
                    UserName = "test@test.com",
                    ImgUrl = "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
                    Tags = new List<Tag> {tags[0], tags[1], tags[2]}
                },
                new Recipe()
                {
                    Title = "Sandwich with boiled egg",
                    ShortDescription = "Simple and tastefull",
                    Description = "First add flour and water. Then let the dough rise... ",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Egg",
                            Amount = 2,
                            Suffix = "pcs"
                        },
                        new Ingredient()
                        {
                            Name = "Bread",
                            Amount = 1,
                            Suffix = "pcs"
                        },
                        new Ingredient()
                        {
                            Name = "Avocado",
                            Amount = 1,
                            Suffix = "pcs"
                        },
                        new Ingredient()
                        {
                            Name = "Butter",
                            Amount = 5,
                            Suffix = "g"
                        }

                    },
                    UserId = user[1].Id,
                    UserName = user[1].Username,
                    ImgUrl = "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=706&q=80",
                    Tags = new List<Tag> {tags[6], tags[2]}
                },
                new Recipe()
                {
                    Title = "Pesto Pasta",
                    ShortDescription = "Pesto Pasta served with sliced tomatoes",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Pasta",
                            Amount = 500,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Tomato",
                            Amount = 3,
                            Suffix = "pcs"
                        },
                        new Ingredient()
                        {
                            Name = "Basilica Plant",
                            Amount = 1,
                            Suffix = "pcs"
                        },
                        new Ingredient()
                        {
                            Name = "Parmesan",
                            Amount = 50,
                            Suffix = "g"
                        }

                    },
                    UserId = user[1].Id,
                    UserName = user[1].Username,
                    ImgUrl = "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
                    Tags = new List<Tag> {tags[1]}
                },
                new Recipe()
                {
                    Title = "Tomato soup",
                    ShortDescription = "Perfect for cold winter days",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Tomato",
                            Amount = 2,
                            Suffix = "pcs"
                        },
                        new Ingredient()
                        {
                            Name = "bouillon",
                            Amount = 1,
                            Suffix = "pcs"
                        },
                        new Ingredient()
                        {
                            Name = "Chopped tomatoes",
                            Amount = 0.6,
                            Suffix = "kg"
                        },
                        new Ingredient()
                        {
                            Name = "Pepper",
                            Amount = 2,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Salt",
                            Amount = 2,
                            Suffix = "g"
                        }

                    },
                    UserId = user[0].Id,
                    UserName = user[0].Username,
                    ImgUrl = "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80",
                    Tags = new List<Tag> {tags[1], tags[6]}
                },
                new Recipe()
                {
                    Title = "Noodles",
                    ShortDescription = "Simple and tasteful",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Noodles",
                            Amount = 400,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Carrot",
                            Amount = 100,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "bouillon",
                            Amount = 1,
                            Suffix = "pcs"
                        },
                        new Ingredient()
                        {
                            Name = "Pepper",
                            Amount = 2,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Salt",
                            Amount = 2,
                            Suffix = "g"
                        }

                    },
                    UserId = user[0].Id,
                    UserName = user[0].Username,
                    ImgUrl = "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80",
                    Tags = new List<Tag> {tags[7], tags[2]}
                },
                new Recipe()
                {
                    Title = "Salmon Sashimi",
                    ShortDescription = "Simple and tasteful",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Salmon",
                            Amount = 300,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Salad",
                            Amount = 100,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Soy sauce",
                            Amount = 100,
                            Suffix = "g"
                        },

                    },
                    UserId = user[0].Id,
                    UserName = user[0].Username,
                    ImgUrl = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
                    Tags = new List<Tag> {tags[7], tags[2], tags[9]}
                },
                 new Recipe()
                {
                    Title = "Shrimp with dip",
                    ShortDescription = "Healty and tasty",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Shrimps",
                            Amount = 200,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Aioli",
                            Amount = 0.2,
                            Suffix = "kg"
                        },
                        new Ingredient()
                        {
                            Name = "Salad",
                            Amount = 200,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Loaf",
                            Amount = 1,
                            Suffix = "pcs"
                        }

                    },
                    UserId = user[0].Id,
                    UserName = user[0].Username,
                    ImgUrl = "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
                    Tags = new List<Tag> {tags[9], tags[1]}
                },
                new Recipe()
                {
                    Title = "Salmon with soy",
                    ShortDescription = "Healty and tasty",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Salmon",
                            Amount = 300,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Potatos",
                            Amount = 0.5,
                            Suffix = "kg"
                        },
                        new Ingredient()
                        {
                            Name = "Carrot",
                            Amount = 200,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "soy sauce",
                            Amount = 0.1,
                            Suffix = "dL"
                        }

                    },
                    UserId = user[0].Id,
                    UserName = user[0].Username,
                    ImgUrl = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80",
                    Tags = new List<Tag> {tags[9], tags[1]}
                },
                new Recipe()
                {
                    Title = "Chickpea mix",
                    ShortDescription = "Healty and tasty",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Chickpea",
                            Amount = 200,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Olives",
                            Amount = 100,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Yougurt",
                            Amount = 200,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Bell pepper",
                            Amount = 1,
                            Suffix = "pcs"
                        }

                    },
                    UserId = user[0].Id,
                    UserName = user[0].Username,
                    ImgUrl = "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
                    Tags = new List<Tag> {tags[9], tags[1]}
                },
                new Recipe()
                {
                    Title = "Mexican meatballs",
                    ShortDescription = "Healty and tasty",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Meat",
                            Amount = 400,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Flour",
                            Amount = 100,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Pepper",
                            Amount = 10,
                            Suffix = "g"
                        },
                        new Ingredient()
                        {
                            Name = "Onion",
                            Amount = 1,
                            Suffix = "pcs"
                        }

                    },
                    UserId = user[0].Id,
                    UserName = user[0].Username,
                    ImgUrl = "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=666&q=80",
                    Tags = new List<Tag> {tags[8], tags[1], tags[2]}
                },
            };

            db.Tags.AddRange(tags);
            db.Users.AddRange(user);
            db.Recipes.AddRange(recipes);
            db.SaveChanges();
        }
    }
}