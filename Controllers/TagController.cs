using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WeekMenuSA.Data;
using WeekMenuSA.Models;
using WeekMenuSA.Services;

namespace WeekMenuSA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TagController : ControllerBase
    {
        private readonly ILogger<TagController> _logger;

        private readonly TagService _tagService;

        public TagController(ILogger<TagController> logger, TagService tagService)
        {
            _logger = logger;
            _tagService = tagService;
        }

        [HttpGet]
        public IEnumerable<Tag> GetAllTags([FromQuery] string searchString)
        {
            if (string.IsNullOrEmpty(searchString))
            {
                return _tagService.GetAllTags();
            }
            else
            {
                return _tagService.SearchTags(searchString);
            }
        }

        [HttpGet("{id}", Name = "GetTagById")]
        public Tag GetTagById(int id)
        {
            return _tagService.GetTagById(id);
        }

        [HttpPost]
        public ActionResult CreateRecipe([FromBody] Tag tag)
        {
            _tagService.CreateTag(tag);
            return Created(nameof(GetTagById), tag);
        }
    }
}