using System.Security.Claims;
using GymTrack.Models;
using GymTrack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace GymTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingController(ITrainingService trainingService) : ControllerBase
    {
        // [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<TrainingDto?>>> GetAllTrainings()
        {
            return Ok(await trainingService.GetAllTrainings());
        }

        // [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<TrainingDto>> GetOneTraining(int id)
        {
            var training = await trainingService.GetOneTraining(id);
            if(training is null)
            {
                return BadRequest("Not Found.");
            }
            return Ok(training);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<TrainingDto?>> AddTraining(TrainingDto newTraining)
        {
            if (newTraining.Duration <= 0) {
                return BadRequest("Training duration cannot be less than 1.");
            }
            if ((newTraining.WorkoutIntensity < 1) || (newTraining.WorkoutIntensity > 10))
            {
                return BadRequest("Workout intensity out of range 1 - 10.");
            }
            if ((newTraining.Fatigue < 1) || (newTraining.Fatigue > 10))
            {
                return BadRequest("Fatigue out of range 1 - 10.");
            }

            var training = await trainingService.AddTraining(newTraining);
            if(training is null)
            {
                return BadRequest("Bad Request.");
            }
            if(training == false)
            {
                return BadRequest("Already exists.");
            }
            return Ok();
        }

        // [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<TrainingDto>> UpdateTraining(int id, TrainingDto updatedTraining)
        {
            if (updatedTraining.Duration <= 0) {
                return BadRequest("Training duration cannot be less than 1.");
            }
            if ((updatedTraining.WorkoutIntensity < 1) || (updatedTraining.WorkoutIntensity > 10))
            {
                return BadRequest("Workout intensity out of range 1 - 10.");
            }
            if ((updatedTraining.Fatigue < 1) || (updatedTraining.Fatigue > 10))
            {
                return BadRequest("Fatigue out of range 1 - 10.");
            }

            var training = await trainingService.UpdateTraining(id, updatedTraining);
            if(training is null)
            {
                return BadRequest("Bad Request.");
            }
            if(training == false)
            {
                return NotFound("Not Found.");
            }
            return Ok();
        }

        // [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<TrainingDto>> DeleteTraining(int id)
        {
            var training = await trainingService.DeleteTraining(id);
            if(training is null)
            {
                return NotFound();
            }
            return Ok();
        }



        [Authorize]
        [HttpGet("CurrentUser")]
        public async Task<ActionResult<List<TrainingDto?>>> GetAllUserTrainings()
        {
            var userID = GetClaimUserId();
            if (userID is null) {
                return Unauthorized();
            }

            return Ok(await trainingService.GetAllUserTrainings(int.Parse(userID)));
        }
        // Dodati funkcije i ubaciti userid u umesto da se prave posebne u service ostaviti samo getAllUserTrainings i getOneUserTraining
        [Authorize]
        [HttpGet("CurrentUser/{id}")]
        public async Task<ActionResult<List<TrainingDto?>>> GetOneUserTraining(int id)
        {
            var userID = GetClaimUserId();
            if (userID is null) {
                return Unauthorized();
            }
            return Ok(await trainingService.GetOneUserTraining(id, int.Parse(userID)));
        }

        [Authorize]
        [HttpPost("CurrentUser")]
        public async Task<ActionResult<TrainingDto?>> AddUserTraining(TrainingDto newTraining)
        {
            var userID = GetClaimUserId();
            if (userID is null) {
                return Unauthorized();
            }

            if (newTraining.Duration <= 0) {
                return BadRequest("Training duration cannot be less than 1.");
            }
            if ((newTraining.WorkoutIntensity < 1) || (newTraining.WorkoutIntensity > 10))
            {
                return BadRequest("Workout intensity out of range 1 - 10.");
            }
            if ((newTraining.Fatigue < 1) || (newTraining.Fatigue > 10))
            {
                return BadRequest("Fatigue out of range 1 - 10.");
            }

            var training = await trainingService.AddUserTraining(newTraining, int.Parse(userID));
            if(training is null)
            {
                return BadRequest("Bad Request.");
            }
            if(training == false)
            {
                return BadRequest("Already exists.");
            }
            return Ok();
        }

        [Authorize]
        [HttpPut("CurrentUser/{id}")]
        public async Task<ActionResult<TrainingDto>> UpdateUserTraining(int id, TrainingDto updatedTraining)
        {
            var userID = GetClaimUserId();
            if (userID is null) {
                return Unauthorized();
            }

            if (updatedTraining.Duration <= 0) {
                return BadRequest("Training duration cannot be less than 1.");
            }
            if ((updatedTraining.WorkoutIntensity < 1) || (updatedTraining.WorkoutIntensity > 10))
            {
                return BadRequest("Workout intensity out of range 1 - 10.");
            }
            if ((updatedTraining.Fatigue < 1) || (updatedTraining.Fatigue > 10))
            {
                return BadRequest("Fatigue out of range 1 - 10.");
            }

            var training = await trainingService.UpdateUserTraining(id, updatedTraining, int.Parse(userID));
            if(training is null)
            {
                return BadRequest("Bad Request.");
            }
            if(training == false)
            {
                return NotFound("Not Found.");
            }
            return Ok();
        }

        [Authorize]
        [HttpDelete("CurrentUser/{id}")]
        public async Task<ActionResult<TrainingDto>> DeleteUserTraining(int id)
        {
            var userID = GetClaimUserId();
            if (userID is null) {
                return Unauthorized();
            }

            var training = await trainingService.DeleteUserTraining(id, int.Parse(userID));
            if(training is null)
            {
                return NotFound();
            }
            if(training == false)
            {
                return BadRequest("Incorrect ownership.");
            }
            return Ok();
        }

        private string GetClaimUserId() 
        {
            var nameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (nameIdentifierClaim == null)
            {
                nameIdentifierClaim = User.FindFirst("sub");
            }
            if (nameIdentifierClaim == null)
            {
                return null!;
            }
            return nameIdentifierClaim.Value;
        }

    }
}
