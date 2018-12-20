import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeportePage } from './deporte';

@NgModule({
  declarations: [
    DeportePage,
  ],
  imports: [
    IonicPageModule.forChild(DeportePage),
  ],
})
export class DeportePageModule {}
