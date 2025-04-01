import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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

  login() {
    this.authService.login(this.form.value).subscribe( response => {
      this.router.navigate(["/"]);
    }, error => {
      if(error.status == 401) {
        this.error = "The username or password is incorrect!";
      }
    })
  }
}
