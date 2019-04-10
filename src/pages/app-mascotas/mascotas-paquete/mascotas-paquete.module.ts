import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MascotasPaquetePage } from './mascotas-paquete';

@NgModule({
  declarations: [
    MascotasPaquetePage,
  ],
  imports: [
    IonicPageModule.forChild(MascotasPaquetePage),
  ],
})
export class MascotasPaquetePageModule {}
