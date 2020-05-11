import { Component } from '@angular/core';
import { MqttSocketService } from '../Shareds/Services/mqtt-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  announcementSub;
  messages: string[] = [];
  subcribe: any[] = [];
  name: string = "";
  constructor(private _mqttSocketService: MqttSocketService) {
    this._mqttSocketService.announcement$.subscribe(announcement => {
      if (announcement) {
        this.messages.unshift(announcement);
      }
    });
    this._mqttSocketService.subcribe$.subscribe(sq => {
      this.subcribe.push(sq);
    });
    this._mqttSocketService.name$.subscribe(n => {
      this.name = n;
    });
  }

  ngOnInit() {
    this._mqttSocketService.startSocket();

  }
  Publisher(TopicPublished,MessagerTopicPublished){
  
   if(TopicPublished&&MessagerTopicPublished)
   {
    let req = [
      {
        "Name":'Publisher',
        "Topic": TopicPublished,
        "Messager": MessagerTopicPublished
      }
    ];
    this._mqttSocketService.sendMqttRequest(req);
   }
  }
  Subcriber(TopicSubcribed){
    if(TopicSubcribed)
    {
     let req = [
       {
         "Name":'Subcriber',
         "Topic": TopicSubcribed,
         "Messager": null
       }
     ];
     this._mqttSocketService.sendMqttRequest(req);
    }
  }
  squareClick(event, square) {
    // if (square.Color === this.currentColor)
    //   return;
    // let req = [
    //   {
    //     "Id": square.Id,
    //     "Color": this.currentColor
    //   }
    // ];
    // var req
    //  = new SquareChangeRequest();
    // req.Id = square.Id;
    // req.Color = this.currentColor;
   // this._mqttSocketService.sendMqttRequest(req);

  }
}
