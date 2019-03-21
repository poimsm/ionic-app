import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LavadoPage } from './lavado';

@NgModule({
  declarations: [
    LavadoPage,
  ],
  imports: [
    IonicPageModule.forChild(LavadoPage),
  ],
})
export class LavadoPageModule {}
