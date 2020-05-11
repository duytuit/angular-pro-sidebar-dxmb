import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttSocketService {
  private socket: WebSocket;
  subcribe$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  announcement$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  name$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private name: string;
  constructor() { }
  startSocket() {
    this.socket = new WebSocket('wss://localhost:5001/ws');
    this.socket.addEventListener("open", (ev => {
     // console.log('opened')
    }));
    this.socket.addEventListener("message", (ev => {
      if (ev.data) {
        var messageBox = JSON.parse(ev.data);
      }
      //console.log('message object', messageBox);
      switch (messageBox.MessageType) {
        case "name":
          this.name = messageBox.Payload;
          this.name$.next(this.name);
          break;
        case "announce":
          this.announcement$.next(messageBox.Payload);
          break;
        case "subcribe":
          this.subcribe$.next(messageBox.Payload);
          break;
        default:
          break;
      }
    }));
  }

  sendMqttRequest(req) {
    //req.Name = this.name;
    var requestAsJson = JSON.stringify(req);
  
    this.socket.send(requestAsJson);
  }
}
