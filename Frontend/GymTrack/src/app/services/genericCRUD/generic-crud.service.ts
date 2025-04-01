import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericCRUDService<T, ID> {

  constructor(
    protected http: HttpClient,
    protected baseURL: string, 
    protected cookieService: CookieService,
  ) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseURL, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }

  getOne(id: ID): Observable<T> {
    return this.http.get<T>(this.baseURL + "/" + id, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }

  create(t: T): Observable<T> {
    return this.http.post<T>(this.baseURL, t, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }

  update(id: ID, t: T): Observable<T> {
    return this.http.put<T>(this.baseURL + "/" + id, t, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }

  delete(id: ID): Observable<any> {
    return this.http.delete<T>(this.baseURL + '/' + id, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }
}
