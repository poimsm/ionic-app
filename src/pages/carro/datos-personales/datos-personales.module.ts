import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosPersonalesPage } from './datos-personales';

@NgModule({
  declarations: [
    DatosPersonalesPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosPersonalesPage),
  ],
})
export class DatosPersonalesPageModule {}
