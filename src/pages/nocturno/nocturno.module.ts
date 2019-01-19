import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NocturnoPage } from './nocturno';

@NgModule({
  declarations: [
    NocturnoPage,
  ],
  imports: [
    IonicPageModule.forChild(NocturnoPage),
  ],
})
export class NocturnoPageModule {}
