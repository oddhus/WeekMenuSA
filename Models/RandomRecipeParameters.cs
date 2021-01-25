using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeekMenuSA.Models
{
    public class RandomRecipeParameters
    {
        private const int maxWeekLength = 7;

        public List<string> Tags { get; set; }

        private int _weekLength = 5;

        public int WeekLength
        {
            get
            {
                return _weekLength;
            }
            set
            {
                _weekLength = (value > maxWeekLength) ? maxWeekLength : value;
            }
        }
    }
}