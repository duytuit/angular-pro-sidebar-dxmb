import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MqttSocketService } from './Shareds/Services/mqtt-socket.service';
import { ManagerDeviceMqttComponent } from './Components/manager-device-mqtt/manager-device-mqtt.component';
import { ModalModule } from 'src/lib/modal';
import { ToasterComponent } from './Shareds/toaster/toaster.component';
import { ToasterContainerComponent } from './Shareds/toaster-container/toaster-container.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ManagerDeviceMqttComponent,
    ToasterComponent,
    ToasterContainerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    FormsModule,
    ModalModule,
    MalihuScrollbarModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'manager-device', component: ManagerDeviceMqttComponent },
    ])
  ],
  providers: [
    MqttSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
