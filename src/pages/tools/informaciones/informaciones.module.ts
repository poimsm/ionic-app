import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformacionesPage } from './informaciones';

@NgModule({
  declarations: [
    InformacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(InformacionesPage),
  ],
})
export class InformacionesPageModule {}
