using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeekMenuSA.Models
{
    public class PaginatedRecipeList
    {
        public int CurrentPage { get; private set; }
        public int TotalPages { get; private set; }
        public int PageSize { get; private set; }
        public int TotalCount { get; private set; }
        public bool HasPrevious => CurrentPage > 1;
        public bool HasNext => CurrentPage < TotalPages;

        public IEnumerable<Recipe> recipes;

        public PaginatedRecipeList()
        {
        }

        public PaginatedRecipeList(List<Recipe> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            recipes = items;
        }

        public static PaginatedRecipeList ToPagedList(IQueryable<Recipe> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new PaginatedRecipeList(items, count, pageNumber, pageSize);
        }
    }
}