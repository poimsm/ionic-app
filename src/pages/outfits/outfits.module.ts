import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutfitsPage } from './outfits';

@NgModule({
  declarations: [
    OutfitsPage,
  ],
  imports: [
    IonicPageModule.forChild(OutfitsPage),
  ],
})
export class OutfitsPageModule {}
