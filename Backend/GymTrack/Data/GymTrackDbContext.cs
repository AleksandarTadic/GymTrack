using System;
using Microsoft.EntityFrameworkCore;
using GymTrack.Entities;
using GymTrack.Models;

namespace GymTrack.Data;

public class GymTrackDbContext(DbContextOptions<GymTrackDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<ExerciseType> ExerciseTypes => Set<ExerciseType>();
    public DbSet<Training> Trainings => Set<Training>();
}
