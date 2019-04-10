import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MueblesPaquetePage } from './muebles-paquete';

@NgModule({
  declarations: [
    MueblesPaquetePage,
  ],
  imports: [
    IonicPageModule.forChild(MueblesPaquetePage),
  ],
})
export class MueblesPaquetePageModule {}
