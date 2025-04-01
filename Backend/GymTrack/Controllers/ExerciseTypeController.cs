using GymTrack.Models;
using GymTrack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseTypeController(IExerciseTypeService exerciseTypeService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<ExerciseTypeDto>>> GetAllExerciseTypes()
        {
            return Ok(await exerciseTypeService.GetAllExerciseTypes());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExerciseTypeDto>> GetOneExerciseType(int id)
        {
            var exerciseType = await exerciseTypeService.GetOneExerciseType(id);
            if(exerciseType is null)
            {
                return BadRequest("Not Found.");
            }
            return Ok(exerciseType);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<ExerciseTypeDto?>> AddExerciseType(ExerciseTypeDto newExerciseType) 
        {
            var exerciseType = await exerciseTypeService.AddExerciseType(newExerciseType);
            if(exerciseType is null)
            {
                return BadRequest("Bad Request.");
            }
            if(exerciseType == false)
            {
                return BadRequest("Already exists.");
            }
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ExerciseTypeDto?>> UpdateExerciseType(int id, ExerciseTypeDto updatedExerciseType)
        {
            var exerciseType = await exerciseTypeService.UpdateExerciseType(id, updatedExerciseType);
            if(exerciseType is null)
            {
                return BadRequest("Bad Request.");
            }
            if(exerciseType == false)
            {
                return NotFound("Not Found.");
            }
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExerciseTypeDto?>> DeleteExerciseType(int id)
        {
            var exerciseType = await exerciseTypeService.DeleteExerciseType(id);
            if(exerciseType is null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
