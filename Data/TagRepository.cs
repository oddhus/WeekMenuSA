using System;
using System.Collections.Generic;
using System.Linq;
using WeekMenuSA.Models;

namespace WeekMenuSA.Data
{
    public class TagRepository : ITagRepository
    {
        private readonly ApplicationDbContext _db;

        public TagRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public void CreateTag(Tag tag)
        {
            if (tag == null)
            {
                throw new ArgumentNullException(nameof(tag));
            }
            _db.Tags.Add(tag);
        }

        public Tag GetTagById(int id)
        {
            return _db.Tags.Find(id);
        }

        public Tag GetTagByName(string name)
        {
            return _db.Tags.Where(t => t.Name == name).First();
        }

        public IEnumerable<Tag> GetAllTags()
        {
            return _db.Tags.OrderBy(t => t.Name).ToList();
        }

        public bool SaveChanges()
        {
            return _db.SaveChanges() >= 0;
        }

        public IEnumerable<Tag> SearchTags(string searchString)
        {
            if (string.IsNullOrEmpty(searchString))
            {
                throw new ArgumentNullException(nameof(searchString));
            }
            return _db.Tags.Where(t => t.Name.Contains(searchString));
        }
    }
}