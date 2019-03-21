import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperContentPage } from './super-content';

@NgModule({
  declarations: [
    SuperContentPage,
  ],
  imports: [
    IonicPageModule.forChild(SuperContentPage),
  ],
})
export class SuperContentPageModule {}
