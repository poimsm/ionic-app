import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplorarCalendarPage } from './explorar-calendar';

@NgModule({
  declarations: [
    ExplorarCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(ExplorarCalendarPage),
  ],
})
export class ExplorarCalendarPageModule {}
