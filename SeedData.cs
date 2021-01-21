using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Data;
using WeekMenuSA.Models;

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
            }
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
                    UserId = "910b5046-f410-473d-b3d2-dca0cfa75725",
                    UserName = "test@test.com",
                    ImgUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg"
                },
                new Recipe()
                {
                    Title = "Pizza Blanca",
                    ShortDescription = "Simple and tastefull",
                    Description = "First add flour and water. Then let the dough rise... ",
                    Ingredients = new Ingredient[]
                    {
                        new Ingredient()
                        {
                            Name = "Creme Fraiche",
                            Amount = 2,
                            Suffix = "dL"
                        },
                        new Ingredient()
                        {
                            Name = "Flour",
                            Amount = 2,
                            Suffix = "dL"
                        },
                        new Ingredient()
                        {
                            Name = "Water",
                            Amount = 0.2,
                            Suffix = "L"
                        }
                    },
                    UserId = "910b5046-f410-473d-b3d2-dca0cfa75725",
                    UserName = "test@test.com",
                    ImgUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg"
                }
            };

            db.Tags.AddRange(tags);
            db.Recipes.AddRange(recipes);
            db.SaveChanges();
        }
    }
}