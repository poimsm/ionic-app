import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacksPage } from './packs';

@NgModule({
  declarations: [
    PacksPage,
  ],
  imports: [
    IonicPageModule.forChild(PacksPage),
  ],
})
export class PacksPageModule {}
