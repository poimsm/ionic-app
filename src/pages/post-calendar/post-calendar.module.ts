import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostCalendarPage } from './post-calendar';

@NgModule({
  declarations: [
    PostCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(PostCalendarPage),
  ],
})
export class PostCalendarPageModule {}
