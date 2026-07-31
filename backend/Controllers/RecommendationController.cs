using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/recommendations")]
    public class RecommendationController : ControllerBase
    {
        private readonly IAiRecommendationService _recommendationService;

        public RecommendationController(IAiRecommendationService recommendationService)
        {
            _recommendationService = recommendationService;
        }

        /// <summary>
        /// Get personalized dish recommendations for a specific user predicted by AI model
        /// </summary>
        [HttpGet("user/{userId:int}")]
        public async Task<IActionResult> GetPersonalizedRecommendations(int userId, [FromQuery] int count = 5)
        {
            var recommendations = await _recommendationService.GetPersonalizedRecommendationsAsync(userId, count);
            return Ok(recommendations);
        }

        /// <summary>
        /// Get predicted popular/most liked dishes across all users
        /// </summary>
        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularDishes([FromQuery] int count = 5)
        {
            var popularDishes = await _recommendationService.GetPopularDishesPredictionAsync(count);
            return Ok(popularDishes);
        }

        /// <summary>
        /// Train or retrain the AI model using dataset from backend database
        /// </summary>
        [HttpPost("train")]
        public async Task<IActionResult> TrainModel()
        {
            var result = await _recommendationService.TrainModelAsync();
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        /// <summary>
        /// Record a user interaction or dish rating for AI model learning
        /// </summary>
        [HttpPost("interaction")]
        public async Task<IActionResult> RecordInteraction([FromBody] UserInteractionCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _recommendationService.RecordUserInteractionAsync(dto);
            return Ok(new { IsSuccess = success, Message = "Interaction recorded successfully." });
        }
    }
}
