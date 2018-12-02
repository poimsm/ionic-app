import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacksContentPage } from './packs-content';

@NgModule({
  declarations: [
    PacksContentPage,
  ],
  imports: [
    IonicPageModule.forChild(PacksContentPage),
  ],
})
export class PacksContentPageModule {}
