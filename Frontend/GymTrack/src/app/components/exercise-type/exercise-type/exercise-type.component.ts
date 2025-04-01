import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ExerciseTypeService } from 'src/app/services/services/exercise-type.service';
import { ExerciseType } from 'src/app/models/exercise-type';

@Component({
  selector: 'app-exercise-type',
  templateUrl: './exercise-type.component.html',
  styleUrls: ['./exercise-type.component.scss']
})
export class ExerciseTypeComponent implements AfterViewInit, OnInit  {
  constructor(public exerciseTypeService: ExerciseTypeService) {
  }
  
  exerciseTypes: ExerciseType[] = [];


  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<ExerciseType>(this.exerciseTypes);
  selected: boolean = false;
  
  selectedExerciseType: ExerciseType | null = null;

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
    this.exerciseTypeService.getAll().subscribe((value) =>{
      this.exerciseTypes = value;
      this.dataSource = new MatTableDataSource(this.exerciseTypes);
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

  deleteRow(exerciseType: ExerciseType){
    this.exerciseTypeService.delete(exerciseType.id).subscribe((value) => {
      this.getAll();
    }, (error) => {
      console.log(error);
    });
    this.dataSource._updateChangeSubscription();
    this.dataSource._updatePaginator;
    this.dataSource.sort = this.sort;
  }
}
