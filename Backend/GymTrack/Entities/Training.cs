using System;

namespace GymTrack.Entities;

public class Training
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ExerciseTypeId { get; set; }
    public DateTime TrainingDate { get; set; }
    public int Duration { get; set; }
    public int CaloriesBurned { get; set; }
    public int WorkoutIntensity { get; set; }
    public int Fatigue { get; set; }
    public String? Notes { get; set; }

    public ExerciseType? ExerciseType { get; set; }
}
