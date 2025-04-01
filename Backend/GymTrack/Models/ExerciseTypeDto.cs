using System;

namespace GymTrack.Models;

public class ExerciseTypeDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    // public int WorkoutIntensity { get; set; }
    public string? Description { get; set; }
}
