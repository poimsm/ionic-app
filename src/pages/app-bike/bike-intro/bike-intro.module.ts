import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikeIntroPage } from './bike-intro';

@NgModule({
  declarations: [
    BikeIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(BikeIntroPage),
  ],
})
export class BikeIntroPageModule {}
