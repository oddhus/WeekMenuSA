﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeekMenuSA.Models
{
    public class RecipeParameters
    {
        private const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        public List<string> Tags { get; set; }

        private string _searchText;

        public string SearchText
        {
            get
            {
                return _searchText;
            }
            set
            {
                _searchText = string.IsNullOrEmpty(value) ? value : value.ToUpper();
            }
        }

        private int _pageSize = 10;

        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}