using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Models;

namespace WeekMenuSA.Data
{
    public interface ITagRepository
    {
        bool SaveChanges();

        void CreateTag(Tag tag);

        Tag GetTagById(int id);

        Tag GetTagByName(string name);

        IEnumerable<Tag> GetAllTags();

        IEnumerable<Tag> SearchTags(string searchString);
    }
}