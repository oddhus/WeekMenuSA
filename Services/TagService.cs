using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeekMenuSA.Data;
using WeekMenuSA.Models;

namespace WeekMenuSA.Services
{
    public class TagService
    {
        private readonly ITagRepository _tagRepository;

        private readonly IMapper _mapper;

        public TagService(ITagRepository tagRepository, IMapper mapper)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
        }

        internal void CreateTag(Tag tag)
        {
            _tagRepository.CreateTag(tag);
            _tagRepository.SaveChanges();
        }

        internal Tag GetTagById(int id)
        {
            return _tagRepository.GetTagById(id);
        }

        internal IEnumerable<Tag> GetAllTags()
        {
            return _tagRepository.GetAllTags();
        }

        internal IEnumerable<Tag> SearchTags(string searhString)
        {
            return _tagRepository.SearchTags(searhString);
        }
    }
}