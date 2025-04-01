import { ExerciseType } from "./exercise-type";

export interface Training {
    id: number;
    userId: number;
    exerciseTypeId: number;
    trainingDate: Date;
    duration: number;
    caloriesBurned: number;
    workoutIntensity: number;
    fatigue: number;
    notes?: string | null | undefined;
    exerciseType?: ExerciseType;
}
