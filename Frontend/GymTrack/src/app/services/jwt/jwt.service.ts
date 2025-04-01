import { Injectable } from '@angular/core';

import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeJwt(jwt: string): string | null {
    try {
      return jwtDecode(jwt)
    } catch (Error) {
      console.log(Error);
      return null;
    }
  }

  getRole(jwt: string): string | null {
    let decoded = this.decodeJwt(jwt)
    if(decoded != null) {
      return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role" as any];
    }
    return null;
  }

  hasRole(role: string, jwt:string): boolean {
    // let roles = this.getRole(jwt); 
    // if(roles != null) {
    //   for(let i = 0; i < roles.length; i++) {

    //     if (roles[i]["authority" as any] == role) {
    //       return true;
    //     }
    //   }
    // }
    let thisRole = this.getRole(jwt);
    if(thisRole != null) {
      if(thisRole == role) {
        return true;
      }
    }
    return false;
  }

  isTokenExpired(jwt: any): boolean {
    const expiryTime: number = jwt.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
