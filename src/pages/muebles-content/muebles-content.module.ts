import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MueblesContentPage } from './muebles-content';

@NgModule({
  declarations: [
    MueblesContentPage,
  ],
  imports: [
    IonicPageModule.forChild(MueblesContentPage),
  ],
})
export class MueblesContentPageModule {}
