import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerPropertiesService {
  public static ADDRESS:string = "http://localhost:5134/api";
}
