import { Injectable } from '@angular/core';
import { GenericCRUDService } from '../genericCRUD/generic-crud.service';
import { Training } from 'src/app/models/training';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ServerPropertiesService } from 'src/app/constants/serverProperties/server-properties.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService extends GenericCRUDService<Training, number> {

  constructor(public _http: HttpClient, public _cookieService: CookieService) { 
    super(_http, `${ServerPropertiesService.ADDRESS}/Training`, _cookieService);
  }

  GetAllUserTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${ServerPropertiesService.ADDRESS}/Training/CurrentUser`, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }

  GetOneUserTraining(id: number): Observable<Training> {
    return this.http.get<Training>(`${ServerPropertiesService.ADDRESS}/Training/CurrentUser/${id}`, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }

  AddUserTraining(newTraining: Training): Observable<Training> {
    return this.http.post<Training>(`${ServerPropertiesService.ADDRESS}/Training/CurrentUser`, newTraining, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }

  UpdateUserTraining(id: number, updateTraining: Training): Observable<Training> {
    return this.http.put<Training>(`${ServerPropertiesService.ADDRESS}/Training/CurrentUser/${id}`, updateTraining, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }

  DeleteUserTraining(id: number): Observable<Training> {
    return this.http.delete<Training>(`${ServerPropertiesService.ADDRESS}/Training/CurrentUser/${id}`, {headers: {"Authorization": this.cookieService.get("jwt")}});
  }
}
