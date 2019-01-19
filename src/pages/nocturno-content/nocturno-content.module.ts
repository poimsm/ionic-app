import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NocturnoContentPage } from './nocturno-content';

@NgModule({
  declarations: [
    NocturnoContentPage,
  ],
  imports: [
    IonicPageModule.forChild(NocturnoContentPage),
  ],
})
export class NocturnoContentPageModule {}
