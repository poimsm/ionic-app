import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplorarOrderPage } from './explorar-order';

@NgModule({
  declarations: [
    ExplorarOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ExplorarOrderPage),
  ],
})
export class ExplorarOrderPageModule {}
