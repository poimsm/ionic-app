import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikeMapaPage } from './bike-mapa';

@NgModule({
  declarations: [
    BikeMapaPage,
  ],
  imports: [
    IonicPageModule.forChild(BikeMapaPage),
  ],
})
export class BikeMapaPageModule {}
