import { Injectable } from '@angular/core';
import { GenericCRUDService } from '../genericCRUD/generic-crud.service';
import { ExerciseType } from 'src/app/models/exercise-type';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ServerPropertiesService } from 'src/app/constants/serverProperties/server-properties.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseTypeService extends GenericCRUDService<ExerciseType, number> {

  constructor(public _http: HttpClient, public _cookieService: CookieService) {
    super(_http, `${ServerPropertiesService.ADDRESS}/ExerciseType`, _cookieService);
   }
}
