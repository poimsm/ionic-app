import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComprasContentPage } from './compras-content';

@NgModule({
  declarations: [
    ComprasContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ComprasContentPage),
  ],
})
export class ComprasContentPageModule {}
