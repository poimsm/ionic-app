import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BandejaContentPage } from './bandeja-content';

@NgModule({
  declarations: [
    BandejaContentPage,
  ],
  imports: [
    IonicPageModule.forChild(BandejaContentPage),
  ],
})
export class BandejaContentPageModule {}
