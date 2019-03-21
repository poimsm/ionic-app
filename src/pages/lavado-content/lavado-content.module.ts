import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LavadoContentPage } from './lavado-content';

@NgModule({
  declarations: [
    LavadoContentPage,
  ],
  imports: [
    IonicPageModule.forChild(LavadoContentPage),
  ],
})
export class LavadoContentPageModule {}
