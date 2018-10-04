import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescuentosPage } from './descuentos';

@NgModule({
  declarations: [
    DescuentosPage,
  ],
  imports: [
    IonicPageModule.forChild(DescuentosPage),
  ],
})
export class DescuentosPageModule {}
