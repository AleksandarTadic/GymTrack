using System;
using GymTrack.Data;
using GymTrack.Entities;
using GymTrack.Models;
using Microsoft.EntityFrameworkCore;

namespace GymTrack.Services;

public class TrainingService(GymTrackDbContext context) : ITrainingService
{
    public async Task<List<TrainingDto>> GetAllTrainings()
    {
        List<Training> trainings = await context.Trainings.Include(e => e.ExerciseType).ToListAsync();

        List<TrainingDto> trainingDtos = trainings.Select(training => ToTrainingDto(training)).ToList();

        return trainingDtos;
    }

    public async Task<TrainingDto?> GetOneTraining(int id)
    {
        var training = await context.Trainings.Include(e => e.ExerciseType).FirstOrDefaultAsync(t => t.Id == id);
        if (training is null)
        {
            return null;
        }

        TrainingDto trainingDto = ToTrainingDto(training);
        return trainingDto;
    }

    public async Task<bool?> AddTraining(TrainingDto newTraining)
    {
        if (newTraining is null)
        {
            return null;
        }
        Training training = new Training {
            Id = newTraining.Id,
            UserId = newTraining.UserId,
            ExerciseTypeId = newTraining.ExerciseTypeId,
            TrainingDate = newTraining.TrainingDate,
            Duration = newTraining.Duration,
            CaloriesBurned = newTraining.CaloriesBurned,
            WorkoutIntensity = newTraining.WorkoutIntensity,
            Fatigue = newTraining.Fatigue,
            Notes = newTraining.Notes
        };

        context.Trainings.Add(training);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool?> UpdateTraining(int id, TrainingDto updatedTraining)
    {
        if (updatedTraining is null) 
        {
            return false;
        }
        var training = await context.Trainings.FindAsync(id);
        if (training is null) 
        {
            return null;
        }
        training.UserId = updatedTraining.UserId;
        training.ExerciseTypeId = updatedTraining.ExerciseTypeId;
        training.TrainingDate = updatedTraining.TrainingDate;
        training.Duration = updatedTraining.Duration;
        training.CaloriesBurned = updatedTraining.CaloriesBurned;
        training.WorkoutIntensity = updatedTraining.WorkoutIntensity;
        training.Fatigue = updatedTraining.Fatigue;
        training.Notes = updatedTraining.Notes;

        context.Trainings.Update(training);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<bool?> DeleteTraining(int id)
    {
        var training = await context.Trainings.FindAsync(id);
        if (training is null) 
        {
            return null;
        }

        context.Trainings.Remove(training);

        await context.SaveChangesAsync();
        
        return true;
    }

    public async Task<List<TrainingDto?>> GetAllUserTrainings(int userId)
    {
        // Order by dates
        List<Training> trainings = await context.Trainings.Where(t => t.UserId == userId).OrderBy(t => t.TrainingDate).Include(e => e.ExerciseType).ToListAsync();

        List<TrainingDto> trainingDtos = trainings.Select(training => ToTrainingDto(training)).ToList();

        return trainingDtos!;
    }

    public async Task<TrainingDto?> GetOneUserTraining(int id, int userId)
    {
        var training = await context.Trainings.Include(e => e.ExerciseType).FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        if (training is null)
        {
            return null;
        }

        TrainingDto trainingDto = ToTrainingDto(training);
        return trainingDto;
    }

    public async Task<bool?> AddUserTraining(TrainingDto newTraining, int userId)
    {
        
        if (newTraining is null)
        {
            return null;
        }

        // Check if current users training already exists between date and time of other trainings
        List<Training> overlappingEvents = await context.Trainings
            .Where(e => e.UserId == userId)
            .Where(e => e.TrainingDate >= newTraining.TrainingDate && e.TrainingDate.AddMinutes(e.Duration) <= newTraining.TrainingDate.AddMinutes(e.Duration))
            .ToListAsync();
        if( overlappingEvents.Count() > 0)
        {
            return null;
        }

        newTraining.UserId = userId;
        return await AddTraining(newTraining);
    }

    public async Task<bool?> UpdateUserTraining(int id, TrainingDto updatedTraining, int userId)
    {
        if (updatedTraining is null) 
        {
            return false;
        }
        // Check if current users training already exists between date and time of other trainings
        List<Training> overlappingEvents = await context.Trainings
            .Where(e => e.Id != id)
            .Where(e => e.UserId == userId)
            .Where(e => e.TrainingDate >= updatedTraining.TrainingDate && e.TrainingDate.AddMinutes(e.Duration) <= updatedTraining.TrainingDate.AddMinutes(e.Duration))
            .ToListAsync();
        if( overlappingEvents.Count() > 0)
        {
            return null;
        }

        updatedTraining.UserId = userId;
        return await UpdateTraining(id, updatedTraining);
    }

    public async Task<bool?> DeleteUserTraining(int id, int userId)
    {

        var training = await context.Trainings.FindAsync(id);
        if (training is null) 
        {
            return null;
        }
        if (training.UserId != userId)
        {
            return false;
        }

        context.Trainings.Remove(training);

        await context.SaveChangesAsync();
        
        return true;
    }

    private TrainingDto ToTrainingDto(Training training) {
        return new TrainingDto 
        {
            Id = training.Id,
            UserId = training.UserId,
            ExerciseTypeId = training.ExerciseTypeId,
            TrainingDate = training.TrainingDate,
            Duration = training.Duration,
            CaloriesBurned = training.CaloriesBurned,
            WorkoutIntensity = training.WorkoutIntensity,
            Fatigue = training.Fatigue,
            Notes = training.Notes,   
            ExerciseType = new ExerciseTypeDto {
                Id = training.ExerciseType!.Id,
                Name = training.ExerciseType!.Name,
                Description = training.ExerciseType.Description
            }
        };
    }
}
