using System;
using GymTrack.Models;

namespace GymTrack.Services;

public interface IExerciseTypeService
{
    Task<List<ExerciseTypeDto>> GetAllExerciseTypes();
    Task<ExerciseTypeDto?> GetOneExerciseType(int id);
    Task<bool?> AddExerciseType(ExerciseTypeDto newExerciseType);
    Task<bool?> UpdateExerciseType(int id, ExerciseTypeDto updatedExerciseType);
    Task<bool?> DeleteExerciseType(int id);
}
