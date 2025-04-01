using System;
using GymTrack.Models;

namespace GymTrack.Services;

public interface ITrainingService
{
    Task<List<TrainingDto>> GetAllTrainings();
    Task<TrainingDto?> GetOneTraining(int id);
    Task<bool?> AddTraining(TrainingDto newTraining);
    Task<bool?> UpdateTraining(int id, TrainingDto updatedTraining);
    Task<bool?> DeleteTraining(int id);
    Task<List<TrainingDto?>> GetAllUserTrainings(int userId);
    Task<TrainingDto?> GetOneUserTraining(int id, int userId);
    Task<bool?> AddUserTraining(TrainingDto newTraining, int userId);
    Task<bool?> UpdateUserTraining(int id, TrainingDto updatedTraining, int userId);
    Task<bool?> DeleteUserTraining(int id, int userId);
}
