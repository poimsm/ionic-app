import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuardadoPage } from './guardado';

@NgModule({
  declarations: [
    GuardadoPage,
  ],
  imports: [
    IonicPageModule.forChild(GuardadoPage),
  ],
})
export class GuardadoPageModule {}
