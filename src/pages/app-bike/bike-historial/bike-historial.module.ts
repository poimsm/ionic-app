import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikeHistorialPage } from './bike-historial';

@NgModule({
  declarations: [
    BikeHistorialPage,
  ],
  imports: [
    IonicPageModule.forChild(BikeHistorialPage),
  ],
})
export class BikeHistorialPageModule {}
