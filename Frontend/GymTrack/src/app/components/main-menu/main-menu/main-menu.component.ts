import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {

  }
  
  ngOnInit(): void {

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.validateRole(["Admin"]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

}
