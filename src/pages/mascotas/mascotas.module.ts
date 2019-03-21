import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MascotasPage } from './mascotas';

@NgModule({
  declarations: [
    MascotasPage,
  ],
  imports: [
    IonicPageModule.forChild(MascotasPage),
  ],
})
export class MascotasPageModule {}
