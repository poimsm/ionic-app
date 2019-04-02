import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikeRiderPage } from './bike-rider';

@NgModule({
  declarations: [
    BikeRiderPage,
  ],
  imports: [
    IonicPageModule.forChild(BikeRiderPage),
  ],
})
export class BikeRiderPageModule {}
