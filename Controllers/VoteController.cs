using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WeekMenuSA.Data;
using WeekMenuSA.Dtos;
using WeekMenuSA.Models;
using WeekMenuSA.Services;

namespace WeekMenuSA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VoteController : ControllerBase
    {
        private readonly ILogger<VoteController> _logger;

        private readonly VoteService _voteService;

        public VoteController(ILogger<VoteController> logger, VoteService voteService)
        {
            _logger = logger;
            _voteService = voteService;
        }

        [Authorize]
        [HttpPost("{recipeId}")]
        public ActionResult<bool> VoteRecipe(int recipeId, [FromBody] VoteDto voteDto)
        {
            return Ok(_voteService.VoteRecipe(voteDto.Vote, recipeId, GetUserId()));
        }

        private string GetUserId()
        {
            return HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}