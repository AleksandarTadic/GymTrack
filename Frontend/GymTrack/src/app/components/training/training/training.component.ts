import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, Injectable, inject, ChangeDetectionStrategy, isStandalone } from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Training } from 'src/app/models/training';
import { TrainingService } from 'src/app/services/services/training.service';

import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {DateRange,MAT_DATE_RANGE_SELECTION_STRATEGY, MatDateRangeSelectionStrategy, MatDatepickerModule} from '@angular/material/datepicker';
import { NativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { SevenDayRangeSelectionStrategyComponent } from '../../date-picker/seven-day-range-selection-strategy/seven-day-range-selection-strategy.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})

export class TrainingComponent implements AfterViewInit{
  constructor(public trainingService: TrainingService) {
  }
  
  trainings: Training[] = [];

  
  displayedColumns: string[] = ['id', 'exerciseType', 'trainingDate', 'duration', 'caloriesBurned', 'workoutIntensity', 'fatigue', 'notes', 'actions'];
  dataSource = new MatTableDataSource<Training>(this.trainings);
  selected: boolean = false;
  
  selectedTraining: Training | null = null;

  @ViewChild(MatSort) sort : MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  ngOnInit(): void {
    this.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  getAll(){
    this.trainingService.GetAllUserTrainings().subscribe((value) =>{
      this.trainings = value;
      this.dataSource = new MatTableDataSource(this.trainings);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    }, (error) => {
      console.log(error);
    });
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    deleteRow(training: Training){
      this.trainingService.delete(training.id).subscribe((value) => {
        this.getAll();
      }, (error) => {
        console.log(error);
      });
      this.dataSource._updateChangeSubscription();
      this.dataSource._updatePaginator;
      this.dataSource.sort = this.sort;
    }
}



