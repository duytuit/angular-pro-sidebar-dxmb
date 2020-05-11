import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { devicemqtt } from '../Models/device.mqtt';

@Injectable({
  providedIn: 'root'
})
export class DeviceMqttService {

  public Api:string=environment.apiUrl+"api/device";
  
  constructor(private http: HttpClient) {
   }
  GetDeviceMqtt():Observable<devicemqtt[]>{
    return this.http.get<devicemqtt[]>(this.Api);
  }
  DeleteDeviceMqtt(id:string):Observable<any>{
    const url=`${this.Api}/${id}`;
    return this.http.delete(url);
  }
  AddDeviceMqtt(devicemqtt:any[]):Observable<any[]>{
    debugger
    return this.http.post<any[]>(this.Api,devicemqtt);
  }
  UpdateDeviceMqtt(devicemqtt:devicemqtt):Observable<devicemqtt>
  {
    return this.http.put<devicemqtt>(this.Api,devicemqtt);
  }
}
