import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewOutfitPage } from './new-outfit';

@NgModule({
  declarations: [
    NewOutfitPage,
  ],
  imports: [
    IonicPageModule.forChild(NewOutfitPage),
  ],
})
export class NewOutfitPageModule {}
