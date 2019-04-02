import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikeProgramarPage } from './bike-programar';

@NgModule({
  declarations: [
    BikeProgramarPage,
  ],
  imports: [
    IonicPageModule.forChild(BikeProgramarPage),
  ],
})
export class BikeProgramarPageModule {}
