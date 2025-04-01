import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import {MatExpansionModule} from '@angular/material/expansion';

// import * as _moment from 'moment';
import { Training } from 'src/app/models/training';
import { TrainingService } from 'src/app/services/services/training.service';

export interface Stats {
  week: string,
  weeklyCaloriesBurned: number,
  weeklyDuration: number,
  weeklyTrainingNumber: number,
  weeklyworkoutIntensity: number,
  weeklyworkoutFatigue: number
}

@Component({
  selector: 'app-training-stats',
  templateUrl: './training-stats.component.html',
  styleUrls: ['./training-stats.component.scss']
})
export class TrainingStatsComponent implements OnInit {
  constructor(public trainingService: TrainingService) {
  }

  trainings: Training[] = [];

  organizedItemsWeeks: { [key: string]: { [key: string]: Training[] } } = {}; // Grouped by year-month and week within the month
  selectedYearMonth: string = "";
  displayData: any | null = null;
  selectedData: any | null = null

  weeks: any = []


  ngOnInit(): void {
    this.getAll();
    this.organizeByYearMonthAndWeekInMonth();
    this.displayData = this.convertDataToStatsByWeek();
  }

  onChange(event: Event): void {
    this.weeks = [];

    if (this.displayData && this.displayData[this.selectedYearMonth]) {
      this.weeks = Object.values(this.displayData[this.selectedYearMonth]); // Get all weeks for selectedYearMonth
    }
  }

  getAll() {
    this.trainingService.GetAllUserTrainings().subscribe({
      next: (value) => {
        this.trainings = value;
        this.organizeByYearMonthAndWeekInMonth();
        this.displayData = this.convertDataToStatsByWeek();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  organizeByYearMonthAndWeekInMonth() {
    this.organizedItemsWeeks = this.trainings.reduce((acc: { [key: string]: { [key: string]: Training[] } }, item) => {
      const date = new Date(item.trainingDate); // Assuming 'trainingDate' is a valid Date or string
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const year = date.getFullYear();
      // const month = date.getMonth(); // 0 for January, 11 for December
      const month = monthNames[date.getMonth()]
      const yearMonthKey = `${month} - ${year}`; // Format as "MMMM - YYYY"
      // Calculate the first day of the month
      // const firstDayOfMonth = new Date(year, month, 1);
      // Calculate the difference in days between the training date and the first day of the month
      const dayOfMonth = date.getDate();
      const weekNumberInMonth = Math.ceil(dayOfMonth / 7); // Week within the month (1-based index)
      // Check if year-month already exists in the accumulator
      if (!acc[yearMonthKey]) {
        acc[yearMonthKey] = {}; // Initialize the year-month object if it doesn't exist
      }
      // Check if week already exists under the given year-month
      if (!acc[yearMonthKey][weekNumberInMonth]) {
        acc[yearMonthKey][weekNumberInMonth] = []; // Initialize the array for the week if it doesn't exist
      }
      // Push the current item into the appropriate year-month-week group
      acc[yearMonthKey][weekNumberInMonth].push(item);

      return acc;
    }, {});
  }

  convertDataToStatsByWeek() {
    const result: any = {};
    // Iterate through each year-month
    for (const yearMonth in this.organizedItemsWeeks) {
      // Create the result object for this year-month if it doesn't exist
      if (!result[yearMonth]) {
        result[yearMonth] = [];
      }
      // Iterate through each week in the current year-month
      for (const week in this.organizedItemsWeeks[yearMonth]) {
        // Sum for the current week
        const weeklyCaloriesBurned = this.organizedItemsWeeks[yearMonth][week].reduce((sum, item) => sum + item.caloriesBurned, 0);
        const weeklyDuration = this.organizedItemsWeeks[yearMonth][week].reduce((sum, item) => sum + item.duration, 0);
        const weeklyTrainingNumber = this.organizedItemsWeeks[yearMonth][week].reduce((sum, item) => sum + 1, 0);
        const weeklyworkoutIntensity = this.organizedItemsWeeks[yearMonth][week].reduce((sum, item) => sum + item.workoutIntensity, 0) / weeklyTrainingNumber;
        const weeklyworkoutFatigue = this.organizedItemsWeeks[yearMonth][week].reduce((sum, item) => sum + item.fatigue, 0) / weeklyTrainingNumber;
  
        // Add the sum to the result object for this year-month and week
        result[yearMonth][week] = {
          week: week,
          weeklyCaloriesBurned: weeklyCaloriesBurned,
          weeklyDuration: weeklyDuration,
          weeklyTrainingNumber: weeklyTrainingNumber,
          weeklyworkoutIntensity: weeklyworkoutIntensity,
          weeklyworkoutFatigue: weeklyworkoutFatigue
        };
      }
    }
    return result;
  }


}





