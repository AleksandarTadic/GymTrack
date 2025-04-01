using System;

namespace GymTrack.Entities;

public class ExerciseType
{
    public int Id { get; set; }
    public required string Name { get; set; }
    // public int WorkoutIntensity { get; set; }
    public string? Description { get; set; }
}
