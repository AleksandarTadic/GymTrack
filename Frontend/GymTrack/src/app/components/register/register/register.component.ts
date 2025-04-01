import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
    let form = document.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', (submitEvent: SubmitEvent) => {
      if (!this.form.valid || !form.checkValidity()) {
        submitEvent.preventDefault();
        submitEvent.stopPropagation();
      }

      form.classList.add('was-validated');
    });
  }

  error: string  = "";
  form = new FormGroup({
    "username": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required)
  }, (control: AbstractControl) => {
    if(control.get("username")?.valid && control.get("password")?.valid) {
      this.error = "";
      return null;
    }
    this.error = "All fields must be filled!";
    return {"msg": "All fields must be filled!"};
  });

  user: User = {
    id: 0,
    username: "",
    password: ""
  }
  

  register() {
    if(this.form.valid) {
      if(this.user != null) {
        this.user!.username = this.form.value["username"]!;
        this.user!.password = this.form.value["password"]!;


        this.authService.register(this.user).subscribe( response => {
          this.authService.login(this.user).subscribe( response => {
            this.router.navigate(["/"]);
          }, error => {
            
          })
        }, error => {
          if(error.status == 400) {
            this.error = "User Already exists!";
          }
        })
        
      }
    }
  }

}
