import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikePage } from './bike';

@NgModule({
  declarations: [
    BikePage,
  ],
  imports: [
    IonicPageModule.forChild(BikePage),
  ],
})
export class BikePageModule {}
