import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BandejaPage } from './bandeja';

@NgModule({
  declarations: [
    BandejaPage,
  ],
  imports: [
    IonicPageModule.forChild(BandejaPage),
  ],
})
export class BandejaPageModule {}
