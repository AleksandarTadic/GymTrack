import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { JwtService } from '../jwt/jwt.service';
import { CookieService } from 'ngx-cookie-service';
import { ServerPropertiesService } from 'src/app/constants/serverProperties/server-properties.service';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token:any|null = null;
  private _user:any|null =null;
  
  constructor(private httpClient:HttpClient, private jwtService: JwtService, private cookieService: CookieService) { 
    this._token = this.cookieService.get("jwt");
    if(this._token) {
      this._user = JSON.parse(atob(this._token.split(".")[1]));
    }
  }

  get token() {
    if(this._token == null) {
      this._token = this.cookieService.get("jwt");
    }
    return this._token;
  }

  get user() {
    if(this._token && this._user == null) {
      this._user = JSON.parse(atob(this.token.split(".")[1]));
    }
    return this._user;
  }


  login(user: any) {
    return this.httpClient.post<any>(ServerPropertiesService.ADDRESS + "/Auth/login", user).pipe(
      tap(r => {
        // console.log(r["accessToken"]);
        this._token = r["accessToken"];
        // console.log(this._token);
        this._user = JSON.parse(atob(r["accessToken"].split(".")[1]));
        // console.log(this._user)
        this.cookieService.set("jwt", "Bearer " + this._token);
      })
    );
  }

  hasRole(role: string) {
    let token = this.cookieService.get("jwt");
    if(token) {
      return this.jwtService.hasRole(role, token);
    }
    return false;
  }

  // register(user: any) {
  //   return this.httpClient.post<any>(ServerPropertiesService.ADDRESS + "/register", user).subscribe({
  //   next: (value) => {
  //     this.login(user)
  //   }, 
  //   error: (error: any) => {
  //     console.log(error);
  //   }})
  // }
  register(user: User) {
    return this.httpClient.post(ServerPropertiesService.ADDRESS + "/Auth/register", user);
  }

  validateRole(roles: any){
    // if(this.user) {
    //   if(this.hasRole(this.user)){
    //     return true;
    //   }
    // }
    // return false;
    if(this._user){
      for(let r of roles){
        // console.log(r)
        if(this.hasRole(r)){
          return true;
        }
      }
    }
    return false;
  }

  isLoggedIn() {
    let check = this.cookieService.get("jwt") ? true : false;
    return check;
  }

  logout() {
    // this.httpClient.get(ServerPropertiesService.ADDRESS + "/Auth/logout", {headers: {"Authorization": this.cookieService.get("jwt")}}).subscribe({
    //   next: (value) => {
    //     // console.log(value)
    //   }, 
    //   error: (error: any) => {
    //     console.log(error);
    //   }});
    this._user = null;
    this._token = null;
    this.cookieService.delete("jwt");
  }
}
