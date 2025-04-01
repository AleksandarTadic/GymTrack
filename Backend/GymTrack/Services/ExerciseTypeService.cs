using System;
using GymTrack.Data;
using GymTrack.Entities;
using GymTrack.Models;
using Microsoft.EntityFrameworkCore;

namespace GymTrack.Services;

public class ExerciseTypeService(GymTrackDbContext context) : IExerciseTypeService
{
    public async Task<List<ExerciseTypeDto>> GetAllExerciseTypes()
    {
        List<ExerciseType> exerciseTypes = await context.ExerciseTypes.ToListAsync();

        List<ExerciseTypeDto> exerciseTypesDto = exerciseTypes.Select(exerciseType => new ExerciseTypeDto {
            Id = exerciseType.Id,
            Name = exerciseType.Name,
            Description = exerciseType.Description
        }).ToList();

        return exerciseTypesDto;
    }
    public async Task<ExerciseTypeDto?> GetOneExerciseType(int id)
    {
        var exerciseType = await context.ExerciseTypes.FindAsync(id);
        if (exerciseType is null)
        {
            return null;
        }
        ExerciseTypeDto exerciseTypeDto = new ExerciseTypeDto {
                Id = exerciseType.Id,
                Name = exerciseType.Name,
                Description = exerciseType.Description
        };
        return exerciseTypeDto;
    }
    public async Task<bool?> AddExerciseType(ExerciseTypeDto newExerciseTypeDto)
    {
        if (newExerciseTypeDto is null)
        {
            return null;
        }
        var exerciseTypes = await context.ExerciseTypes.FirstOrDefaultAsync(u => u.Name == newExerciseTypeDto.Name);
        if (exerciseTypes is not null)
        {
            return false;
        }
        ExerciseType newExerciseType = new ExerciseType {
            Name = newExerciseTypeDto.Name,
            Description = newExerciseTypeDto.Description
        };

        context.ExerciseTypes.Add(newExerciseType);
        await context.SaveChangesAsync();
        return true;
    }
    public async Task<bool?> UpdateExerciseType(int id, ExerciseTypeDto updatedExerciseType)
    {
        if (updatedExerciseType is null) 
        {
            return false;
        }
        var exerciseType = await context.ExerciseTypes.FindAsync(id);
        if (exerciseType is null) 
        {
            return null;
        }
        exerciseType.Name = updatedExerciseType.Name;
        exerciseType.Description = updatedExerciseType.Description;
        
        context.ExerciseTypes.Update(exerciseType);
        await context.SaveChangesAsync();

        return true;
    }
    public async Task<bool?> DeleteExerciseType(int id)
    {
        var exerciseType = await context.ExerciseTypes.FindAsync(id);
        if (exerciseType is null) 
        {
            return null;
        }

        context.ExerciseTypes.Remove(exerciseType);

        await context.SaveChangesAsync();
        
        return true;
    }

}
