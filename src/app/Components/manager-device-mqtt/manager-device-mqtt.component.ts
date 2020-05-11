import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HubMqttService } from 'src/app/Shareds/Services/hub-mqtt.service';
import { hubmqtt } from 'src/app/Shareds/Models/hub.mqtt';
import { ToasterService } from 'src/app/Shareds/Services/toaster.service';
import { DeviceMqttService } from 'src/app/Shareds/Services/device-mqtt.service';
import { MqttSocketService } from 'src/app/Shareds/Services/mqtt-socket.service';
import { devicemqtt } from 'src/app/Shareds/Models/device.mqtt';

@Component({
  selector: 'app-manager-device-mqtt',
  templateUrl: './manager-device-mqtt.component.html',
  styleUrls: ['./manager-device-mqtt.component.css']
})
export class ManagerDeviceMqttComponent implements OnInit {
  @Input() zIndex: number = 1;
  gethub: hubmqtt[];
  getdevice: devicemqtt[];
  @ViewChild('buttonRefresh', {static: false}) buttonRefresh: ElementRef;
  selecthub= new hubmqtt()
  selectdevice= new devicemqtt()
  subcribe;
  hub_code
  addHub = new FormGroup(
    {
     // Id :new FormControl(),
     code_hub :new FormControl(),
     roomid :new FormControl('1a3b944e-3632-467b-a53a-206305310bae'),
     room_name :new FormControl(),
     note :new FormControl(),
     status:new FormControl(),
     userid:new FormControl('1a3b944e-3632-467b-a53a-206305310bae'),
     created_by:new FormControl('Nguyễn Duy Tú')
    }
  );
  addDevice = new FormGroup(
    {
     // Id :new FormControl(),
      name_device :new FormControl(),
      code_device :new FormControl(),
      device_type :new FormControl(),
      number_switch :new FormControl(),
      hubid :new FormControl(),
      hub_code:new FormControl(),
      icon:new FormControl(),
      note:new FormControl(),
      status :new FormControl(true),
      userid :new FormControl('1a3b944e-3632-467b-a53a-206305310bae'),
      created_by :new FormControl('Nguyễn Duy Tú'),
      status_device:new FormControl(),
    }
  );
  constructor(
    private serviceHub: HubMqttService, 
    private toaster: ToasterService,
    private deviceMqttService:DeviceMqttService,
    private mqttSocketService:MqttSocketService
    ) { 
      this.mqttSocketService.subcribe$.subscribe(sq => {
        this.subcribe=sq;
      });
  }

  ngOnInit() {
    this.toaster.subject.next(null)
    this.getAllhub();
    this.getAllDevice()
    this.mqttSocketService.startSocket();
  }
  getAllhub() {
    this.serviceHub.GetHubMqtt().subscribe(data => {
      this.gethub = data;
    });
  }
  onSubmitHub(){
     if (this.selecthub.edittable==true) 
     {
      this.selecthub.code_hub=this.addHub.controls['code_hub'].value;
      this.selecthub.roomid=this.addHub.controls['roomid'].value;
      this.selecthub.room_name=this.addHub.controls['room_name'].value;
      this.selecthub.note=this.addHub.controls['note'].value;
      this.selecthub.status=this.addHub.controls['status'].value;
      this.selecthub.userid=this.addHub.controls['userid'].value;
      this.selecthub.created_by=this.addHub.controls['created_by'].value;
      this.serviceHub.UpdateHubMqtt(this.selecthub).subscribe(data=>{
        this.addHub.reset();
        this.close();
        this.getAllhub()
      }); 
     }
     else
     {
      this.serviceHub.AddHubMqtt(this.addHub.value).subscribe(data=>{
        this.addHub.reset();
        this.close();
        this.getAllhub()
        this.toaster.show('success', 'Thành công!',);
      }); 
     }
  
  }
  openmodaladdHub(){
    this.buttonRefresh.nativeElement.disabled =false
    this.selecthub=new hubmqtt()
   // this.addHub.reset();
    let element: HTMLElement = document.getElementById('modalRootShow') as HTMLElement;
    element.click();
  }
  onEventHubCode(hubid:string){
    
    if(hubid=='null')
    {
         this.addDevice.controls['hubid'].reset();
         this.addDevice.controls['hub_code'].reset();
         this.hub_code=null
    }else
    {
       this.addDevice.controls['hubid'].reset(hubid.split('#')[0].trim());
       this.addDevice.controls['hub_code'].reset(hubid.split('#')[1].trim());
       this.AdDeviceWithServerMqtt(this.addDevice.controls['hub_code'].value)
       this.hub_code=hubid.split('#')[1].trim()
    }
  }
  onMouseEnter(item: hubmqtt) {
    for (let i = 0; i < this.gethub.length; i++) {
      if (this.gethub[i].edittable == true) {
        this.gethub[i].edittable = false
      }
    }
    item.edittable = true;
    this.selecthub=item
  }
  onMouseEnterDevice(item: devicemqtt) {
    for (let i = 0; i < this.getdevice.length; i++) {
      if (this.getdevice[i].edittable == true) {
        this.getdevice[i].edittable = false
      }
    }
    item.edittable = true;
    this.selectdevice=item
  }
  onMouseEnterClose() {
      this.selecthub.edittable = false;
      this.selectdevice.edittable = false;
  }
  close(){
    let element: HTMLElement = document.getElementById('modalRootClose') as HTMLElement;
    element.click();
}
  refresh(){
    this.addHub.reset();
  }
  openEdit(item: hubmqtt)
  {
    
   this.addHub.controls['code_hub'].reset(item.code_hub);
   this.addHub.controls['roomid'].reset(item.roomid);
   this.addHub.controls['room_name'].reset(item.room_name);
   this.addHub.controls['note'].reset(item.note);
   this.addHub.controls['status'].reset(item.status);
   this.addHub.controls['userid'].reset(item.userid);
   this.addHub.controls['created_by'].reset(item.created_by);
   this.buttonRefresh.nativeElement.disabled =true
    let element: HTMLElement = document.getElementById('modalRootShow') as HTMLElement;
    element.click();
  }
  openDelete(item){
    this.selecthub=item;
    let element: HTMLElement = document.getElementById('modalDelete') as HTMLElement;
    element.click();
  }
  onDeleteHub(id:string){
    if(id)
    {
      this.serviceHub.DeleteHubMqtt(id).subscribe(data=>{
        this.getAllhub()
        let element: HTMLElement = document.getElementById('modalDeleteHide') as HTMLElement;
        element.click();
      }); 
       
    }
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
     this.mqttSocketService.sendMqttRequest(req);
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
      this.mqttSocketService.sendMqttRequest(req);
     }
   }
  // @HostListener('document:mouseup', ['$event'])
  // onMouseUp(event) {
  //   for (let i = 0; i < this.gethub.length; i++) {
  //     if (this.gethub[i].edittable == true) {
  //       this.gethub[i].edittable = false
  //     }
  //   }
  // }
  AdDeviceWithServerMqtt(Hub:string)
  {
       this.subcribe=null
       let Mode_Topic=Hub+'/mode';
       let Mode_Topic_find=Hub+'/find_device';
       let Mode_Topic_comfirm=Hub+'/comfirm';
       let Mode_Mess_1=1;//chế độ chạy bình thường
       let Mode_Mess_2=2;//chế độ cài đặt
       this.Publisher(Mode_Topic,Mode_Mess_2);
       this.Subcriber('mode_sv')
       this.mqttSocketService.subcribe$.subscribe(sq => {
        this.subcribe=sq;
      });
      let json_mode: any[] = JSON.parse(this.subcribe);
      //  if(json_mode['Payload'].split('/')[1].trim()==2)
      //  {
         this.toaster.show('success', 'Chế Độ Thêm Thêm Thiết Bị!','Thành Công');
         this.Publisher(Mode_Topic_find,Mode_Mess_1);
        // this.Publisher(Mode_Topic_comfirm,Mode_Mess_1);
         this.Subcriber('new_device')
         this.mqttSocketService.subcribe$.subscribe(sq => {
          this.subcribe=sq;
        });
        let json_new_device: any[] = JSON.parse(this.subcribe);
        this.addDevice.controls['code_device'].reset(json_new_device['Payload'].split('/')[1].trim());
        this.addDevice.controls['device_type'].reset(json_new_device['Payload'].split('/')[2].trim());
        //console.log(this.subcribe)
       //}
      //  console.log(json['Payload'])
      //  this.subcribe.p
  }
  refreshDevice(){
    this.AdDeviceWithServerMqtt(this.hub_code)
  }
  onSubmitDevice(){
    this.deviceMqttService.AddDeviceMqtt(this.addDevice.value).subscribe(data=>{
      this.addDevice.reset();
      this.getAllDevice()
      this.toaster.show('success', 'Thêm Thiết Bị!','Thành Công');
    }); 
  }
  getAllDevice()
  {
    this.deviceMqttService.GetDeviceMqtt().subscribe(data=>{
        this.getdevice=data
    })
  }
}
