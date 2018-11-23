import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceCalendarPage } from './service-calendar';

@NgModule({
  declarations: [
    ServiceCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceCalendarPage),
  ],
})
export class ServiceCalendarPageModule {}
