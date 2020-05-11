import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { hubmqtt } from '../Models/hub.mqtt';

@Injectable({
  providedIn: 'root'
})
export class HubMqttService {

  public Api:string=environment.apiUrl+"api/hub";
  
  constructor(private http: HttpClient) {
   }
  GetHubMqtt():Observable<hubmqtt[]>{
    return this.http.get<hubmqtt[]>(this.Api);
  }
  DeleteHubMqtt(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddHubMqtt(hubmqtt:any[]):Observable<any[]>{
    
    return this.http.post<any[]>(this.Api,hubmqtt);
  }
  UpdateHubMqtt(hubmqtt:hubmqtt):Observable<hubmqtt>
  {
    return this.http.put<hubmqtt>(this.Api,hubmqtt);
  }
}
