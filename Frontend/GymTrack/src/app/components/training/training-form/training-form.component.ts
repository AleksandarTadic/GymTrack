import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseType } from 'src/app/models/exercise-type';
import { Training } from 'src/app/models/training';
import { ExerciseTypeService } from 'src/app/services/services/exercise-type.service';
import { TrainingService } from 'src/app/services/services/training.service';



@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private trainingService: TrainingService, private exerciseTypeService: ExerciseTypeService) {
  
  }

  @Input()
  set data(v: any) {
    this.forma.patchValue(v);
  }   

  exerciseType: ExerciseType = {
    id: 0,
    name: '',
    description: null
  }

  currentId: number | null = null;
  training: Training = {
    id: 0,
    userId: 0,
    exerciseTypeId: 0,
    trainingDate: new Date(),
    duration: 0,
    caloriesBurned: 0,
    workoutIntensity: 0,
    fatigue: 0,
    notes: undefined
  }

  exerciseTypes: ExerciseType[] = []

  forma = new FormGroup({
    id: new FormControl(0),
    userId: new FormControl(0),
    exerciseTypeId: new FormControl(0, Validators.min(1)),
    trainingDate: new FormControl(new Date(), Validators.required),
    duration: new FormControl(0, Validators.min(1)),
    caloriesBurned: new FormControl(0, Validators.min(1)),
    workoutIntensity: new FormControl(1, [Validators.min(1), Validators.max(10)]),
    fatigue: new FormControl(1, [Validators.min(1), Validators.max(10)]),
    notes: new FormControl(),

  }, (control: AbstractControl) => {
    if(control.get("exerciseTypeId")?.valid && control.get("trainingDate")?.valid && control.get("duration")?.valid && control.get("caloriesBurned")?.valid && control.get("workoutIntensity")?.valid && control.get("fatigue")?.valid) {
      return null;
    }
    return {"msg": "Some fields are not filled!"};
  });

  ngOnInit(): void {
    this.getAllExerciseTypes();

    this.route.paramMap.subscribe(x => {
      let id: any = x.get("id");

      if(id != null) {
        this.trainingService.getOne(id).subscribe(y => {
          this.currentId = y.id;
          this.training = y;

          this.forma.setValue({
            id: this.training.id, 
            userId: this.training.userId, 
            exerciseTypeId: this.training.exerciseTypeId, 
            trainingDate: this.training.trainingDate, 
            duration: this.training.duration, 
            caloriesBurned: this.training.caloriesBurned, 
            workoutIntensity: this.training.workoutIntensity,
            fatigue: this.training.fatigue,
            notes: this.training.notes
          });
        }) 
      } else {
        this.currentId = null;
      }
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes["training"].currentValue != null){
      this.forma.setValue({
        id: this.training.id, 
        userId: this.training.userId, 
        exerciseTypeId: this.training.exerciseTypeId, 
        trainingDate: this.training.trainingDate, 
        duration: this.training.duration, 
        caloriesBurned: this.training.caloriesBurned, 
        workoutIntensity: this.training.workoutIntensity,
        fatigue: this.training.fatigue,
        notes: this.training.notes
      });
    }
  }


  submit() {
    if(this.forma.valid) {
      console.log(this.exerciseType)
      if(this.training != null) {
        var exerciseTypeId: number | null | undefined = Number(this.forma.value["exerciseTypeId"])


        this.training!.id = this.forma.value["id"]!;
        this.training!.userId = this.forma.value["userId"]!;
        // this.training!.exerciseTypeId = exerciseTypeId!;
        this.training!.exerciseTypeId = exerciseTypeId!;

        this.training!.trainingDate = this.forma.value["trainingDate"]!;
        this.training!.duration = this.forma.value["duration"]!;
        this.training!.caloriesBurned = this.forma.value["caloriesBurned"]!;
        this.training!.workoutIntensity = this.forma.value["workoutIntensity"]!;
        this.training!.fatigue = this.forma.value["fatigue"]!;
        this.training!.notes = this.forma.value["notes"]!;
      
        if(this.currentId != null) {
          this.trainingService.UpdateUserTraining(this.training!.id, this.training!).subscribe(x => {
            this.router.navigate(["/my-trainings"]);
          }, error => {
            if(error.status == 400) {
              alert("Training already exists in this time period!");
            }
            if(error.status == 409) {
              alert("Key Error!");
            }
          });
        } else {
          this.trainingService.AddUserTraining(this.training).subscribe(x => {
            this.router.navigate(["/my-trainings"]);
          }, error => {
            console.log("ADD")
            if(error.status == 409) {
              alert("Key Error!");
            }
          })
        }
      }
    }
  }

  reset() {
    if(this.currentId != null) {
      this.forma.reset({
        id: this.training.id, 
        userId: this.training.userId, 
        exerciseTypeId: this.training.exerciseTypeId, 
        trainingDate: this.training.trainingDate, 
        duration: this.training.duration, 
        caloriesBurned: this.training.caloriesBurned, 
        workoutIntensity: this.training.workoutIntensity,
        fatigue: this.training.fatigue,
        notes: this.training.notes
      });
    } else {
      this.forma.setValue({
        id: this.training?.id, 
        userId: null, 
        exerciseTypeId: null, 
        trainingDate: new Date(), 
        duration: 1, 
        caloriesBurned: 0, 
        workoutIntensity: 1,
        fatigue: 1,
        notes: null
      });
      if(this.exerciseTypes.length > 0) {
        this.forma.get("exerciseTypeId")?.setValue(this.exerciseTypes[0].id);
      }
    }
  }

  getAllExerciseTypes(){
    this.exerciseTypeService.getAll().subscribe((value) =>{
      this.exerciseTypes = value;
      if(this.currentId == null && this.exerciseTypes.length > 0) {
        this.forma.get("exerciseTypeId")?.setValue(this.exerciseTypes[0].id);
      }
    }, (error) => {
      console.log(error);
    });
  }

  isSelectedExerciseType(value: any): boolean {
    if(value === this.training.exerciseTypeId) {
      return true;
    }
    return false;
  }

}

