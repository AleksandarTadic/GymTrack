import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseType } from 'src/app/models/exercise-type';
import { ExerciseTypeService } from 'src/app/services/services/exercise-type.service';

@Component({
  selector: 'app-exercise-type-form',
  templateUrl: './exercise-type-form.component.html',
  styleUrls: ['./exercise-type-form.component.scss']
})
export class ExerciseTypeFormComponent implements OnInit {
  @Input()
  set data(v: any) {
    this.form.patchValue(v);
  }

  currentId: number | null = null;

  exerciseType: ExerciseType = {id: 0, name: "", description: ""};


  form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl("", Validators.required),
    description: new FormControl()

  }, (control: AbstractControl) => {
    if(control.get("name")?.valid) {
      return null;
    }
    return {"msg": "Name field cannot be empty!"};
  });




  constructor(private route: ActivatedRoute, private router: Router, private exerciseTypeService: ExerciseTypeService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {
      let id: any = x.get("id");

      if(id != null) {
        this.exerciseTypeService.getOne(id).subscribe(y => {
          this.currentId = y.id;
          this.exerciseType = y;
          this.form.patchValue(y);
        }) 
      } else {
        this.currentId = null;
        console.log("Id not found.")
      }
    })
  }

  submit() {
    if(this.form.valid) {
      if(this.exerciseType != null) {
        this.exerciseType!.id = this.form.value["id"]!;
        this.exerciseType!.name = this.form.value["name"]!;
        this.exerciseType!.description = this.form.value["description"]!;
        console.log(this.exerciseType)

        if(this.currentId != null) {
          this.exerciseTypeService.update(this.exerciseType!.id, this.exerciseType!).subscribe(x => {
            // redirection
            this.router.navigate(["/exercise-types"]);
          }, error => {
            if(error.status == 400) {
              alert("Exercise name already exists!");
            }
          });
        } else {
          this.exerciseTypeService.create(this.exerciseType).subscribe(x => {
            this.router.navigate(["/exercise-types"]);
          }, error => {
            if(error.status == 400) {
              alert("Exercise name already exists!");
            }
          })
        }
      }
    }
  }

  reset() {
    if(this.currentId != null) {
      this.form.reset({"id": this.exerciseType?.id, "name": this.exerciseType?.name, "description": this.exerciseType?.description});
    } else {
      this.form.reset();
    }
  }

}
