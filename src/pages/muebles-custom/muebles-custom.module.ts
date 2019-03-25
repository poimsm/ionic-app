import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MueblesCustomPage } from './muebles-custom';

@NgModule({
  declarations: [
    MueblesCustomPage,
  ],
  imports: [
    IonicPageModule.forChild(MueblesCustomPage),
  ],
})
export class MueblesCustomPageModule {}
